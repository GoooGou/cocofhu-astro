import fs from 'node:fs';
import postcss from 'postcss';
const file = 'src/styles/reference.css';
let css = fs.readFileSync(file, 'utf8');
const ast = postcss.parse(css);
const root = ast.nodes.find(n => n.type === 'rule' && n.selector === ':root');
const values = new Map(root.nodes.filter(n => n.type === 'decl').map(n => [n.value.toLowerCase(), n.prop]));
let n = 0;
ast.walkDecls(d => {
  if (d.parent === root || (d.parent.type === 'atrule' && d.parent.name === 'font-face')) return;
  if (d.prop === 'font-family' && !d.value.includes('var(')) {
    const token = `--font-collage-${++n}`;
    root.append({ prop: token, value: d.value }); d.value = `var(${token})`; return;
  }
  d.value = d.value.replace(/#[\da-fA-F]{3,8}\b|rgba?\([^()]+\)/g, color => {
    const key = color.toLowerCase();
    if (!values.has(key)) {
      const token = `--color-art-${++n}`;
      values.set(key, token); root.append({ prop: token, value: color });
    }
    return `var(${values.get(key)})`;
  });
});
// Move the original paths using transforms and container-relative units.
// The trajectories and timing remain identical to the source.
ast.walkAtRules('keyframes', k => {
  if (!['rc-drive', 'pencil'].includes(k.params)) return;
  const pencil = k.params === 'pencil';
  k.walkRules(r => {
    const x = r.nodes.find(d => d.prop === 'left');
    const y = r.nodes.find(d => d.prop === 'top');
    if (!x || !y) return;
    const translate = `translate(${x.value.replace('%', 'cqw')}, ${y.value.replace('%', 'cqh')})`;
    const transform = r.nodes.find(d => d.prop === 'transform');
    if (transform) transform.value = `${translate} ${transform.value}`;
    else r.append({ prop: 'transform', value: `${translate} rotate(${pencil ? '28deg' : '0deg'})` });
    x.remove(); y.remove();
  });
});
fs.writeFileSync(file, ast.toString());
