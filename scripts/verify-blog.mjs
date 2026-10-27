import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
const base = process.env.TEST_URL || 'http://127.0.0.1:4321/';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [], errors = [], editorErrors = [];
const check = (name, pass, detail) => { results.push({ name, pass: !!pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`); if (!pass) throw new Error(name + (detail ? ': ' + detail : '')); };
const wait = ms => new Promise(r => setTimeout(r, ms));
const slug = `qa-editor-${Date.now()}`;
const file = path.resolve(`src/content/posts/${slug}.mdoc`);
const assets = path.resolve(`public/images/blog/${slug}`);
const visibleCount = page => page.$$eval('[data-post]', es => es.filter(e => !e.hidden).length);
const waitForStatus = async (url, status) => {
  for (let i = 0; i < 30; i++) { if ((await fetch(url)).status === status) return; await wait(250); }
  throw new Error(`URL did not settle at ${status}: ${url}`);
};
const clickText = async (page, text) => {
  await page.bringToFront();
  const handle = await page.evaluateHandle(value => [...document.querySelectorAll('button')].find(e => e.textContent.trim() === value), text);
  const element = handle.asElement();
  if (!element) throw new Error(`Missing button: ${text}`);
  await element.click();
  await handle.dispose();
};
try {
  const page = await browser.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base + 'blog/', { waitUntil: 'networkidle0' });
  check('Published examples render', await visibleCount(page) === 3);
  check('Animal Island reset button renders', await page.$$eval('.filter-button[class*="animal-btn"]', es => es.length === 1));
  await page.click('.tag-navigation a[href="/blog/tags/%E5%BC%80%E5%8F%91/"]');
  await page.waitForSelector('[data-post]');
  check('Category opens independent route', page.url().includes('/tags/') && await visibleCount(page) === 1);
  await page.type('#blogSearch', 'does-not-exist');
  check('Search empty state', await page.$eval('#noResults', e => !e.hidden) && await visibleCount(page) === 0);
  await page.click('#clearFilters');
  check('Reset search preserves category and focus', await visibleCount(page) === 1 && await page.evaluate(() => document.activeElement.id === 'blogSearch'));
  await page.type('#blogSearch', 'KEYSTATIC');
  check('Case insensitive tag search', await visibleCount(page) === 1);
  for (const route of ['blog/', 'blog/hello-island/', 'blog/astro-and-keystatic/']) {
    await page.goto(base + route, { waitUntil: 'networkidle0' });
    check(`Single heading: ${route}`, await page.$$eval('h1', es => es.length === 1));
    for (const width of [320, 375, 768, 1280, 1920]) {
      await page.setViewport({ width, height: 900 });
      check(`No overflow ${route} ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.body.scrollWidth <= innerWidth));
    }
  }
  const rss = await (await fetch(base + 'blog/rss.xml')).text();
  check('RSS includes all published articles', (rss.match(/<item>/g) || []).length === 3 && rss.includes('hello-island'));
  const nojs = await browser.newPage();
  await nojs.setJavaScriptEnabled(false);
  await nojs.goto(base + 'blog/');
  check('No-JS articles remain readable', await visibleCount(nojs) === 3);
  check('No-JS inactive filters hidden', await nojs.$eval('#blogTools', e => e.hidden));
  await nojs.close();

  // Exercise Keystatic through its rendered form, including a real file upload.
  const admin = await browser.newPage();
  admin.on('pageerror', e => editorErrors.push(e.message));
  admin.on('dialog', d => d.accept());
  await admin.setViewport({ width: 1440, height: 1000 });
  await admin.goto(base + 'keystatic/collection/posts/create', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await admin.waitForSelector('[contenteditable="true"]', { timeout: 60000 });
  const textInputs = await admin.$$('input[type="text"]');
  await textInputs[0].type('编辑器流程测试');
  await textInputs[1].click({ clickCount: 3 }); await textInputs[1].type(slug);
  await admin.type('textarea', '仅用于自动验证的临时文章，测试结束后删除。');
  await admin.type('[contenteditable="true"]', 'Keystatic 实际保存的正文。');
  check('New entries default to draft', await admin.$eval('input[type="checkbox"]', e => e.checked));
  const [chooser] = await Promise.all([admin.waitForFileChooser(), clickText(admin, 'Choose file')]);
  await chooser.accept([path.resolve('public/assets/favicon.svg')]);
  await textInputs[2].type('测试封面：幽灵猫');
  await admin.click('button[type="submit"]');
  await admin.waitForFunction(() => location.pathname.includes('/item/'), { timeout: 20000 });
  check('Keystatic creates a real Markdoc file', fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes('Keystatic 实际保存的正文'));
  const saved = fs.readFileSync(file, 'utf8');
  const cover = saved.match(/^cover: (.+)$/m)?.[1];
  check('Cover upload saved with article', cover && fs.existsSync(path.resolve('public' + cover)));
  await page.goto(base + 'blog/', { waitUntil: 'networkidle0' });
  check('Draft excluded from listing', !(await page.content()).includes(slug));
  check('Draft route returns 404', (await page.goto(base + `blog/${slug}/`)).status() === 404);
  check('Draft excluded from RSS', !(await (await fetch(base + 'blog/rss.xml')).text()).includes(slug));
  await admin.click('input[type="checkbox"]');
  await clickText(admin, 'Save');
  for (let i = 0; i < 40 && !fs.readFileSync(file, 'utf8').includes('draft: false'); i++) await wait(100);
  check('Editor saves publish change', fs.readFileSync(file, 'utf8').includes('draft: false'));
  await wait(600);
  await page.goto(base + `blog/${slug}/`, { waitUntil: 'networkidle0' });
  check('Published article renders saved rich text', (await page.content()).includes('Keystatic 实际保存的正文'));
  check('Published cover loads', await page.$eval('.article-cover img', e => e.complete && e.naturalWidth > 0 && e.alt === '测试封面：幽灵猫'));
  await admin.reload({ waitUntil: 'domcontentloaded' });
  await admin.waitForSelector('[contenteditable="true"]');
  check('Editor reload preserves values', await admin.$eval('textarea', e => e.value.includes('临时文章')));
  await page.goto(base + 'blog/', { waitUntil: 'networkidle0' });
  await admin.close();
  const deletionContext = await browser.createBrowserContext();
  const deletionPage = await deletionContext.newPage();
  deletionPage.on('pageerror', e => editorErrors.push(e.message));
  await deletionPage.setViewport({ width: 1440, height: 1000 });
  await deletionPage.goto(base + `keystatic/collection/posts/item/${slug}`, { waitUntil: 'domcontentloaded' });
  await deletionPage.waitForSelector('[contenteditable="true"]');
  await clickText(deletionPage, 'Delete entry…');
  await deletionPage.waitForFunction(() => [...document.querySelectorAll('button')].some(e => e.textContent.trim() === 'Yes, delete'));
  await clickText(deletionPage, 'Yes, delete');
  for (let i = 0; i < 40 && fs.existsSync(file); i++) await wait(100);
  check('Editor deletes the article file', !fs.existsSync(file));
  await deletionPage.waitForFunction(() => location.pathname.endsWith('/collection/posts'));
  await deletionPage.waitForFunction(() => document.body.textContent.includes('博客文章'));
  check('Editor returns to collection after deletion', deletionPage.url().endsWith('/collection/posts'));
  await deletionContext.close();
  await waitForStatus(base + `blog/${slug}/`, 404);
  check('Deleted article returns 404', (await page.goto(base + `blog/${slug}/`)).status() === 404);
  fs.writeFileSync(file, saved.replace(/^draft: true/m, 'draft: false').replace(/^publishedAt:.*$/m, "publishedAt: '2999-01-01'"));
  await waitForStatus(base + 'blog/', 200);
  await waitForStatus(base + `blog/${slug}/`, 404);
  await page.goto(base + 'blog/', { waitUntil: 'networkidle0' });
  check('Future article excluded from listing', !(await page.content()).includes(slug));
  check('Future article route returns 404', (await page.goto(base + `blog/${slug}/`)).status() === 404);
  check('Future article excluded from RSS', !(await (await fetch(base + 'blog/rss.xml')).text()).includes(slug));
  check('No browser runtime errors', errors.length === 0, errors.join('; '));
  check('No unrecovered editor errors', editorErrors.every(e => e.includes('React was able to recover')), editorErrors.join('; '));
} catch (e) {
  console.error('Browser errors:', errors);
  results.push({ name: 'Complete verification flow', pass: false, detail: e.message });
  console.error(e);
  process.exitCode = 1;
} finally {
  await browser.close();
  // These exact paths are generated above, are unique to this run and stay in the project.
  const root = path.resolve('.') + path.sep;
  if (!file.startsWith(root) || !assets.startsWith(root)) throw new Error('Unsafe fixture path');
  fs.rmSync(file, { force: true });
  fs.rmSync(assets, { recursive: true, force: true });
  fs.writeFileSync('qa/blog-results.json', JSON.stringify({ date: new Date().toISOString(), results, editorRecoveryMessages: editorErrors, passed: results.filter(r=>r.pass).length, failed: results.filter(r=>!r.pass).length, completed: !process.exitCode }, null, 2));
}
