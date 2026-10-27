import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('ERROR', e.message));
  await page.setViewport({ width: 1440, height: 1000 });
  for (const [path, name] of [['blog/', 'blog-desktop'], ['blog/hello-island/', 'blog-article'], ['keystatic', 'keystatic']]) {
    await page.goto('http://127.0.0.1:4321/' + path, { waitUntil: 'networkidle0', timeout: 120000 });
    await page.screenshot({ path: `qa/${name}.png`, fullPage: true });
    console.log(path, (await page.locator('body').waitHandle()).id, await page.evaluate(() => document.body.innerText.slice(0, 4000)));
    if (path === 'keystatic') console.log(await page.$$eval('a,input,button', es => es.map(e => ({ tag: e.tagName, text: e.textContent, href: e.getAttribute('href'), id: e.id, name: e.getAttribute('name') }))));
  }
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://127.0.0.1:4321/blog/');
  await page.screenshot({ path: 'qa/blog-mobile.png', fullPage: true });
} finally { await browser.close(); }
