import fs from 'node:fs';
const read = p => fs.readFileSync(p, 'utf8');
const write = (p, s) => fs.writeFileSync(p, s);
const html = read('reference/index.html');
let js = read('reference/main.js');
const factoryStart = js.indexOf('  var BODY_POINTY');
const factoryEnd = js.indexOf('  Array.prototype.forEach.call(document.querySelectorAll(\'[data-cat]\')');
const cats = `// Original cocofhu vector artwork; shared by Astro SSR and client animation.\nconst INK = '#3b2f4a';\n${js.slice(factoryStart, factoryEnd)}\nexport { catSVG, INK };\n`;
write('src/scripts/cats.js', cats);
js = js.slice(0, factoryStart) + js.slice(factoryEnd);
js = `import { catSVG } from './cats.js';\n` + js;
js = js.replace("  var doc = document.documentElement;", "  var doc = document.documentElement;\n  doc.classList.replace('no-js', 'js');");
js = js.replace("if (!eyes) return;", "if (!eyes || reduce) return;");
// Keep the current language and animation behavior while honoring preference changes.
js = js.replace('  /* ---------- ghost-cat SVG factory (6 variants) ---------- */', `
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', (event) => {
    reduce = event.matches;
    doc.classList.toggle('rm', reduce);
    if (reduce) {
      doc.classList.add('ready', 'intro-done');
      doc.classList.remove('intro-on');
      document.getElementById('intro')?.remove();
      document.getElementById('wipe')?.classList.remove('in', 'out');
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      document.querySelectorAll('.c-eyes, .c-squash').forEach(el => el.style.transform = '');
    }
  });
  document.querySelector('.top')?.addEventListener('focusin', () => document.querySelector('.top')?.classList.remove('hide'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('.mark.open').forEach(el => el.classList.remove('open'));
  });
`);
write('src/scripts/page.js', js);

function component(name, markup) {
  markup = markup.replace(/<span([^>]*data-cat="([^"]+)"[^>]*)><\/span>/g, (_, attrs, cat) => `<span${attrs}><Fragment set:html={catSVG('${cat}', ${attrs.includes('data-mini')})} /></span>`);
  // Use the real Animal Island button for the language, character, thief,
  // back-to-top and modal controls. Native links retain their link semantics.
  markup = markup.replace(/<button([^>]*\bid="(?:langBtn|heroCat|thief|buddy)"[^>]*)>([\s\S]*?)<\/button>/g, (_, attrs, inside) => `<IslandButton${attrs.replace('type="button"', '').replace('class=', 'className=')}>${inside}</IslandButton>`);
  markup = markup.replace(/<button([^>]*class="cc-x"[^>]*)>([\s\S]*?)<\/button>/g, (_, attrs, inside) => `<IslandButton${attrs.replace('type="button"', '').replace('class=', 'className=')}>${inside}</IslandButton>`);
  markup = markup.replace(/<span class="chip" data-i18n="([^"]+)">([^<]+)<\/span>/g, (_, key, label) => `<IslandTag i18n="${key}" label="${label}" />`);
  const imports = [markup.includes('catSVG') ? "import { catSVG } from '../scripts/cats.js';" : '', markup.includes('IslandButton') ? "import IslandButton from './IslandButton.astro';" : '', markup.includes('IslandTag') ? "import IslandTag from './IslandTag.astro';" : ''].filter(Boolean).join('\n');
  write(`src/components/${name}.astro`, (imports ? `---\n${imports}\n---\n` : '') + markup.trim() + '\n');
}
const section = (start, end) => html.slice(html.indexOf(start), html.indexOf(end));
component('Intro', section('  <!-- ============ intro', '  <header'));
component('Header', section('  <header', '  <main'));
component('Hero', section('    <section class="hero"', '    <div class="tapes"'));
component('Tapes', section('    <div class="tapes"', '    <!-- ============ recent'));
component('Recent', section('    <section class="band band--recent"', '    <!-- ============ about'));
component('About', section('    <section class="band band--about"', '  </main>'));
component('Footer', section('  <footer', '  <!-- scroll buddy -->'));
component('Overlays', section('  <!-- scroll buddy -->', '  <script src='));

let css = read('reference/style.css').replace('url("fredoka.woff2?v=aba35163")','url("/assets/fredoka.woff2")');
css = css.replaceAll('.hero-cat>[data-cat]', '.hero-cat [data-cat]');
css = css.replaceAll('.lang span', '.lang [data-l]');
css = css.replaceAll('100vh', '100svh').replaceAll('overflow-x:hidden','overflow-x:clip');
css = css.replaceAll('grid-template-columns:1.05fr .95fr', 'grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)').replaceAll('grid-template-columns:1fr', 'grid-template-columns:minmax(0,1fr)');
const stamp = `/* Hallmark · checked: 2026-10-27 · genre: playful (reference) · built: the project · redesign: polish · copy: verbatim · v2.0.0 */\n/* Hallmark · pre-emit critique: P4 H4 E3 S5 R3 V4 · weakest: E, reference lacks no-script illustration and live reduced-motion handling; added SSR and preference synchronization. */\n/* User-locked design: exact cocofhu.com reproduction. Conflicting house-style findings are reported in qa/HALLMARK.md, never represented as a clean pass. */\n`;
write('src/styles/reference.css', stamp + css);
