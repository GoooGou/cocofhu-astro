import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const out = {};
try {
  for (const [name,url] of [['original','https://cocofhu.com/?lang=zh'],['replica','http://127.0.0.1:4321/?lang=zh']]) {
    const p = await b.newPage(); await p.setViewport({width:1440,height:900});
    await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await p.goto(url,{waitUntil:'networkidle0'});
    if (name === 'original' && process.argv.includes('--capture')) {
      const initial = await p.evaluate(() => ({ tapes: [...document.querySelectorAll('.tape-track')].map(e=>e.innerHTML), raster: document.querySelector('.raster').innerHTML }));
      fs.mkdirSync('src/data', {recursive:true});
      const source = fs.readFileSync('reference/index.html','utf8');
      initial.intro = source.match(/<p class="intro-p[^>]*>([\s\S]*?)<\/p>/)[1];
      fs.writeFileSync('src/data/initial.json', JSON.stringify(initial, null, 2));
    }
    await p.screenshot({path:`qa/compare-${name}.png`});
    out[name] = await p.evaluate(() => Object.fromEntries(['.hero','.hero-copy','.title','.intro-p','.stage-card','.hero-cat','.chip','.nav','.logo'].map(s => {const e=document.querySelector(s),r=e.getBoundingClientRect(),c=getComputedStyle(e);return [s,{x:r.x,y:r.y,width:r.width,height:r.height,font:c.font,fontFamily:c.fontFamily,letterSpacing:c.letterSpacing}]})));
    await p.close();
  }
  fs.writeFileSync('qa/comparison.json',JSON.stringify(out,null,2)); console.log(JSON.stringify(out,null,2));
} finally {await b.close()}
