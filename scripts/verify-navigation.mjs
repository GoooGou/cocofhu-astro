import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const results = [];
const check = (name, pass) => { results.push({name,pass:!!pass}); console.log(`${pass?'PASS':'FAIL'} ${name}`); };
try {
  const p=await browser.newPage(); const errors=[]; p.on('pageerror',e=>errors.push(e.message));
  await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const width of [320,375,768,1440,1920]) {
    await p.setViewport({width,height:900}); await p.goto(base+'/?lang=zh',{waitUntil:'networkidle0'});
    check(`Home Blog and portfolio navigation visible ${width}`,await p.$$eval('.nav-section',es=>es.length===2&&es.every(e=>e.getBoundingClientRect().width>0)));
    check(`Home header fits ${width}`,await p.$eval('.top',e=>[...e.querySelectorAll('a,button')].filter(e=>e.getBoundingClientRect().width).every(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth})));
  }
  const routes=['/blog/','/portfolio/','/portfolio/cocofhu-replica/','/portfolio/island-journal/'];
  for(const route of routes) {
    await p.goto(base+route,{waitUntil:'networkidle0'});
    check(`${route} responds with content`,await p.$eval('h1',e=>!!e.textContent.trim()));
    check(`${route} navigation links`,await p.$eval('.blog-header',e=>!!e.querySelector('a[href="/blog/"]')&&!!e.querySelector('a[href="/portfolio/"]')));
    const tagLinks=await p.$$eval('a[href*="/tags/"]',es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
    check(`${route} has clickable tags`,tagLinks.length>0);
    for(const link of tagLinks) { const r=await fetch(base+link); check(`Tag route ${link}`,r.status===200); }
    for(const width of [320,375,768,1440,1920]) {
      await p.setViewport({width,height:900});
      check(`No overflow ${route} ${width}`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.body.scrollWidth<=innerWidth));
    }
    if(route==='/portfolio/') {
      await p.setViewport({width:1440,height:1000}); await p.screenshot({path:'qa/portfolio-desktop.png',fullPage:true});
      await p.setViewport({width:375,height:812}); await p.screenshot({path:'qa/portfolio-mobile.png',fullPage:true});
      check('Portfolio screenshots load',await p.$$eval('.work-image img',es=>es.length===2&&es.every(e=>e.complete&&e.naturalWidth>0)));
    }
  }
  await p.goto(base+'/blog/tags/'+encodeURIComponent('开发')+'/',{waitUntil:'networkidle0'});
  check('Blog category excludes other categories',await p.$$eval('[data-post]',es=>es.length===1&&es.every(e=>e.dataset.category==='dev')));
  check('Active category indicated',await p.$eval('.tag-navigation [aria-current="page"]',e=>e.textContent.includes('开发')));
  await p.goto(base+'/portfolio/tags/'+encodeURIComponent('视觉复刻')+'/',{waitUntil:'networkidle0'});
  check('Portfolio tag contains matching work only',await p.$$eval('[data-work] h3',es=>es.length===1&&es[0].textContent.includes('首页复刻')));
  await p.setJavaScriptEnabled(false);
  await p.goto(base+'/portfolio/');
  await Promise.all([p.waitForNavigation(),p.click('.tag-navigation a[href="/portfolio/tags/Astro/"]')]);
  check('Tags work without JavaScript',await p.$$eval('[data-work]',es=>es.length===2));
  check('No public runtime errors',errors.length===0);
}finally{await browser.close();fs.writeFileSync('qa/navigation-results.json',JSON.stringify({results,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length},null,2));}
if(results.some(r=>!r.pass)) process.exitCode=1;
