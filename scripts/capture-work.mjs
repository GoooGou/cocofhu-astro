import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  for (const [route, name] of [['/?lang=zh', 'cocofhu-replica'], ['/blog/', 'island-journal']]) {
    await page.goto('http://127.0.0.1:4322' + route, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: `public/images/work/${name}.png` });
  }
} finally { await browser.close(); }
