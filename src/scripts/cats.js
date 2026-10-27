// Original cocofhu vector artwork; shared by Astro SSR and client animation.
const INK = '#3b2f4a';
  var BODY_POINTY = 'M58 160 L58 92 L66 58 L84 76 Q100 70 116 76 L134 58 L142 92 L142 160 Q131 150 121 162 Q110 150 100 162 Q90 150 79 162 Q69 150 58 160Z';
  var BODY_ROUND = 'M58 160 L58 92 Q54 74 62 62 Q72 50 82 74 Q100 68 118 74 Q128 50 138 62 Q146 74 142 92 L142 160 Q131 150 121 162 Q110 150 100 162 Q90 150 79 162 Q69 150 58 160Z';
  var BODY_WIDE = 'M54 162 Q50 120 58 92 L64 54 L86 74 Q100 70 114 74 L136 54 L142 92 Q150 120 146 162 Q132 146 118 164 Q100 146 82 164 Q68 146 54 162Z';
  var S = 'class="k" ';
  var star = function (x, y, c, cls) {
    return '<path class="c-star ' + (cls || '') + '" transform="translate(' + x + ',' + y + ')" d="M0 -9 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" fill="' + c + '" stroke="' + INK + '" stroke-width="3"/>';
  };
  var blush = '<g class="c-blush"><circle cx="74" cy="126" r="6" fill="#ff9db5" opacity=".85"/><circle cx="126" cy="126" r="6" fill="#ff9db5" opacity=".85"/></g>';
  var mouthW = '<path ' + S + 'd="M92 124 Q96 130 100 124 Q104 130 108 124" fill="none"/>';
  var mouthO = '<ellipse ' + S + 'cx="100" cy="128" rx="5" ry="6" fill="#ff7a93"/>';
  var eyesDot = '<g class="c-eyes"><g class="c-eye"><ellipse cx="84" cy="110" rx="6" ry="8" fill="' + INK + '"/></g><g class="c-eye"><ellipse cx="116" cy="110" rx="6" ry="8" fill="' + INK + '"/></g></g>';
  var eyesBig = '<g class="c-eyes"><g class="c-eye"><circle cx="84" cy="110" r="9" fill="' + INK + '"/><circle cx="87" cy="106" r="3" fill="#fff"/></g><g class="c-eye"><circle cx="116" cy="110" r="9" fill="' + INK + '"/><circle cx="119" cy="106" r="3" fill="#fff"/></g></g>';
  var tail = '<path class="k c-tail" d="M140 140 Q172 132 166 104" fill="none"/>';

  var V = {
    yume: { body: BODY_POINTY, fill: '#e9e3ff', face: eyesDot + mouthW, extra: '', fx: star(30, 50, '#ffd36e', 's1') + star(168, 42, '#9fe3ff', 's2') + star(172, 128, '#ff9db5', 's3') },
    yozora: { body: BODY_ROUND, fill: '#7c6bd6', face: '<g class="c-eyes"><path ' + S + 'd="M77 112 Q84 102 91 112 M109 112 Q116 102 123 112" fill="none"/></g>' + mouthW,
      extra: '<path class="k c-swing" d="M150 34 a16 16 0 1 0 12 26 a12 12 0 1 1 -12 -26z" fill="#ffe27a"/>', fx: star(35, 60, '#fff3a0', 's1') + star(170, 96, '#fff3a0', 's3') },
    sakura: { body: BODY_POINTY, fill: '#ffe3ec', face: eyesBig + mouthO,
      extra: '<g class="c-bow"><path class="k" d="M118 64 l-12 -10 0 20z M118 64 l12 -10 0 20z" fill="#ff5d7a"/><circle class="k" cx="118" cy="64" r="4" fill="#ff5d7a"/></g>',
      fx: '<ellipse class="c-petal p0" cx="40" cy="20" rx="6" ry="4" fill="#ff9db5" stroke="' + INK + '" stroke-width="2"/><ellipse class="c-petal p1" cx="150" cy="16" rx="6" ry="4" fill="#ff9db5" stroke="' + INK + '" stroke-width="2"/><ellipse class="c-petal p2" cx="176" cy="30" rx="6" ry="4" fill="#ff9db5" stroke="' + INK + '" stroke-width="2"/>' },
    nemu: { body: BODY_ROUND, fill: '#dff4ff', face: '<path ' + S + 'd="M77 110 Q84 116 91 110 M109 110 Q116 116 123 110" fill="none"/><ellipse cx="100" cy="128" rx="3" ry="4" fill="' + INK + '"/>',
      extra: '<path class="k" d="M62 80 Q90 30 132 70 Q100 58 62 80z" fill="#9fe3ff"/><circle class="k" cx="134" cy="72" r="7" fill="#fff"/>',
      fx: '<text class="c-zz z1" x="140" y="56" font-size="20" font-weight="700" fill="' + INK + '">Z</text><text class="c-zz z2" x="156" y="40" font-size="14" font-weight="700" fill="' + INK + '">z</text>', breathe: true },
    itazura: { body: BODY_WIDE, fill: '#fff1c9', face: eyesBig + mouthW + '<path d="M95 126 l2 6 2 -5z" fill="#fff" stroke="' + INK + '" stroke-width="2"/>',
      extra: '<g class="c-swing"><path class="k" d="M160 96 L160 112" fill="none"/><ellipse class="k" cx="160" cy="124" rx="14" ry="12" fill="#ff9a3c"/><path d="M154 122 l3 -3 3 3 M162 122 l3 -3 3 3 M154 128 q6 4 12 0" stroke="' + INK + '" stroke-width="2" fill="none"/></g>', fx: '' },
    soda: { body: BODY_POINTY, fill: '#b8f3e6', face: eyesDot + mouthO, extra: '',
      fx: '<circle class="c-bub b0" cx="70" cy="170" r="5" fill="#fff" stroke="' + INK + '" stroke-width="2.5"/><circle class="c-bub b1" cx="100" cy="170" r="7" fill="#fff" stroke="' + INK + '" stroke-width="2.5"/><circle class="c-bub b2" cx="130" cy="170" r="4" fill="#fff" stroke="' + INK + '" stroke-width="2.5"/>' },
    // FX Kurumi cat (original take): pink bob + fringe, pink eyes, coin hair clip, phone with a candle chart
    kurumi: { body: BODY_POINTY, fill: '#ffe3ec',
      face: '<g class="c-eyes"><g class="c-eye"><ellipse cx="84" cy="112" rx="7" ry="8.5" fill="' + INK + '"/><ellipse cx="84" cy="114" rx="4" ry="4.5" fill="#ff9db5"/><circle cx="86.5" cy="108" r="2.4" fill="#fff"/></g><g class="c-eye"><ellipse cx="116" cy="112" rx="7" ry="8.5" fill="' + INK + '"/><ellipse cx="116" cy="114" rx="4" ry="4.5" fill="#ff9db5"/><circle cx="118.5" cy="108" r="2.4" fill="#fff"/></g></g>' + mouthW,
      extra: '<path class="k" fill="#ff9db5" d="M56 122 Q48 86 70 72 Q100 60 130 72 Q152 86 144 122 Q137 110 136 96 Q124 102 112 92 Q102 104 92 94 Q80 102 72 92 Q66 104 56 122Z"/>' +
        '<g class="c-swing"><circle class="k" stroke-width="3" cx="130" cy="84" r="9" fill="#ffd36e"/><text x="130" y="88.5" text-anchor="middle" font-size="12" font-weight="800" fill="' + INK + '">¥</text></g>' +
        '<g class="c-card"><rect class="k" stroke-width="3" x="22" y="102" width="26" height="40" rx="5" fill="#3b2f4a"/><rect x="26" y="107" width="18" height="28" rx="2" fill="#fffdf9"/><path d="M30 126V117M35 122V112M40 116V110" stroke-width="4" stroke-linecap="round" stroke="#5fd3bc"/><path d="M35 122V126" stroke-width="4" stroke-linecap="round" stroke="#ff9db5"/></g>' +
        '<circle class="k" cx="50" cy="132" r="8" fill="#ffe3ec"/>',
      fx: star(30, 46, '#ffd36e', 's1') + star(172, 38, '#9fe3ff', 's2') + star(174, 124, '#ff9db5', 's3') },
    // phantom thief cat (original): domino mask, tailcoat, red bow + glove, tiny top hat, calling card
    kaito: { body: BODY_POINTY, fill: '#fffaf4',
      face: '<path class="k c-mask" fill-rule="evenodd" fill="#2e2440" d="M58 100 Q66 92 84 96 Q100 101 116 96 Q134 92 142 100 L153 91 Q151 113 136 119 Q118 124 100 116 Q82 124 64 119 Q49 113 47 91 Z M74 109 a10 8.5 0 1 0 20 0 a10 8.5 0 1 0 -20 0 Z M106 109 a10 8.5 0 1 0 20 0 a10 8.5 0 1 0 -20 0 Z"/>' +
        '<g class="c-eyes"><g class="c-eye"><ellipse cx="84" cy="110" rx="4.5" ry="6" fill="' + INK + '"/><circle cx="86" cy="107" r="1.7" fill="#fff"/></g><g class="c-eye"><ellipse cx="116" cy="110" rx="4.5" ry="6" fill="' + INK + '"/><circle cx="118" cy="107" r="1.7" fill="#fff"/></g></g>' +
        '<path ' + S + 'd="M93 129 Q101 135 109 127" fill="none"/>',
      extra: '<path class="k" fill="#2e2440" d="M59 136 Q78 142 91 140 L100 155 L109 140 Q122 142 141 136 L142 160 Q131 150 121 162 Q110 150 100 162 Q90 150 79 162 Q69 150 58 160 Z"/>' +
        '<path class="k" stroke-width="3" fill="#ff6f91" d="M100 142 l-10 -6 0 12z M100 142 l10 -6 0 12z"/><circle cx="100" cy="142" r="2.6" fill="#ff6f91" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<g class="c-hat"><rect class="k" x="86" y="45" width="28" height="25" rx="3" fill="#2e2440"/><rect x="88" y="59" width="24" height="5" fill="#ff6f91"/><rect class="k" x="76" y="67" width="48" height="7" rx="3.5" fill="#2e2440"/></g>' +
        '<g class="c-card"><rect class="k" stroke-width="3" x="22" y="100" width="24" height="32" rx="2" fill="#fff"/><path d="M27 108 h14 M27 114 h10 M27 120 h12" stroke="#ff6f91" stroke-width="2.5" stroke-linecap="round"/></g>' +
        '<circle class="k" cx="50" cy="132" r="8" fill="#ff6f91"/>',
      fx: star(30, 46, '#ff6f91', 's1') + star(172, 38, '#ffffff', 's2') + star(174, 124, '#ff6f91', 's3') }

  };

  // 猫跑跑 (Han Li cultivator cat, original drawing): hair bun + wooden pin, dark ink daoist robe with crossed collar, gourd, rides a flying sword
  V.hanli = { body: BODY_ROUND, fill: '#fffaf4',
    face: '<path d="M76 98 L91 102 M124 98 L109 102" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/>' + eyesDot + '<path ' + S + 'd="M94 126 Q100 123 106 126" fill="none"/>',
    extra: '<path class="k" d="M58 128 Q100 120 142 128 L142 160 Q131 150 121 162 Q110 150 100 162 Q90 150 79 162 Q69 150 58 160Z" fill="#2e3347"/>' +
      '<path class="k" stroke-width="3" d="M80 124 L100 150 L120 124" fill="#fffdf9"/><path d="M100 150 L100 160" stroke="' + INK + '" stroke-width="3"/>' +
      '<path class="k" stroke-width="3" d="M66 140 h68" fill="none" stroke="#6b7390" stroke-dasharray="0"/>' +
      '<circle class="k" cx="100" cy="58" r="13" fill="#3b2f4a"/><path class="k" stroke-width="3" d="M76 60 L126 50" stroke="#c9a56b" fill="none"/><circle cx="76" cy="60" r="3.5" fill="#c9a56b" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<path class="k" d="M68 84 Q100 62 132 84 Q118 74 100 76 Q82 74 68 84Z" fill="#3b2f4a"/>' +
      '<g class="c-sword"><path class="k" stroke-width="3" d="M62 170 L150 170 L166 175 L150 180 L62 180Z" fill="#dfe6ff"/><path d="M70 175 H148" stroke="#aab4d9" stroke-width="2" stroke-linecap="round"/><path class="k" stroke-width="3" d="M58 164 v22" fill="none"/><path d="M40 175 H56" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><path d="M38 175 l-8 -5 M38 175 l-8 5" stroke="#e0466b" stroke-width="3" stroke-linecap="round"/></g>' +
      '<g class="c-swing"><circle class="k" stroke-width="3" cx="44" cy="134" r="11" fill="#ffd36e"/><circle class="k" stroke-width="3" cx="44" cy="116" r="7" fill="#ffd36e"/><path d="M38 124 h12" stroke="#e0466b" stroke-width="3" stroke-linecap="round"/><path class="k" stroke-width="3" d="M44 109 v-4" fill="none"/></g>',
    fx: '' + star(30, 50, '#8d95b3', 's1') + star(172, 128, '#ffd1df', 's3') };

  function catSVG(name, mini) {
    var v = V[name] || V.yume;
    var shadow = mini ? '' : '<ellipse class="c-shadow" cx="100" cy="186" rx="40" ry="7" fill="' + INK + '" opacity=".18"/>';
    var vb = mini ? '48 46 132 124' : '0 0 200 200';
    return '<svg class="cat cat--' + name + (v.breathe ? ' cat--breathe' : '') + '" viewBox="' + vb + '" aria-hidden="true" focusable="false">' +
      shadow + (mini ? '' : v.fx) +
      '<g class="c-float"><g class="c-squash">' + tail +
      '<path class="k" d="' + v.body + '" fill="' + v.fill + '"/>' + v.face + blush + v.extra +
      '</g></g></svg>';
  }

export { catSVG, INK };
