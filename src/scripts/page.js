import { catSVG } from './cats.js';
/* cocofhu home — tiny vanilla JS, no deps */
(function () {
  'use strict';
  var INK = '#3b2f4a';
  var doc = document.documentElement;
  doc.classList.replace('no-js', 'js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) doc.classList.add('rm');


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

  Array.prototype.forEach.call(document.querySelectorAll('[data-cat]'), function (el) {
    el.innerHTML = catSVG(el.getAttribute('data-cat'), el.hasAttribute('data-mini'));
  });

  /* ---------- i18n (zh / en) ---------- */
  function mk(label, tip) {
    return '<button type="button" class="mark">' + label + '<span class="bubble" role="tooltip">' + tip + '</span></button>';
  }
  var EN = {
    title: 'cocofhu — my little corner of the web',
    desc: "cocofhu's homepage. Born in '99, INTP, backend engineer. Genius programmer by day, Phantom Thieves of Hearts by night.",
    skip: 'Skip to content',
    logoAria: 'cocofhu home',
    navAria: 'Page navigation',
    navRecent: 'Lately',
    navAbout: 'About',
    kicker: '<span class="spark">✦</span> HELLO · WELCOME TO MY CORNER',
    intro: "Hey there, I'm cocofhu.<br>" +
      "<strong>Born in '99</strong>, <strong>INTP</strong>, <strong>backend engineer</strong>. These days I'm building " +
      mk('SkillHub', 'An AI Skills community for users in China') +
      ', and I&rsquo;m also tinkering with ' +
      mk('AI Harness', 'Workflows that help people and agents work together better') +
      ' — I want to make fun, actually useful things that help people, and keep getting better along the way.',
    catAria: 'Poke the little ghost cat',
    hint: 'TAP ME · GIVE IT A POKE',
    slogan: 'Genius programmer by day, Phantom Thieves of Hearts by night',
    sloganDay: 'Genius programmer by day,',
    tag1: 'DISTRIBUTED SYSTEMS',
    tag2: 'STORAGE',
    tag3: 'INFRA',
    tags: 'DISTRIBUTED SYSTEMS · STORAGE · INFRA',
    footSmall: '© 2026 cocofhu · DISTRIBUTED SYSTEMS · STORAGE · INFRA',
    sloganNight: 'Phantom Thieves of Hearts by night',
    sloganBig: 'Phantom Thieves',
    thiefAria: 'Phantom thief cat: tap for a calling card',
    thiefKicker: 'CALLING CARD',
    thiefMsg: 'The Phantom Gamer was here',
    thiefSign: '— Phantom Cat',
    thiefHint: 'open →',
    ccClose: 'Close',
    cc: { title: 'CALLING CARD', lines: ["To whoever's reading:", 'Genius programmer by day, Phantom Thieves of Hearts by night.', ["Tonight, I'll ", ['steal'], ' a little of your ', ['time'], '.']], sign: '— Phantom Cat, cocofhu' },
    scrollAria: 'Scroll down',
    chRecent: 'Lately',
    chAbout: 'About',
    ledeRecent: "Here's what I've been up to",
    ledeAbout: 'Made it down here? Say hi',
    c1t: 'Learning computer graphics',
    c1p: "Picking up some " + mk('graphics', "Working through GAMES101 (Intro to Modern Computer Graphics) by Lingqi Yan") +
      ' and ' + mk('the basics', "Right now I can't even describe what I want. I'd like to at least understand the menus in modeling apps") +
      ', so I can get AI to help me with ' + mk('3D modeling', 'GPT-6 is supposedly amazing at 2D art. For real?') + '.',
    c2t: '<a href="https://cocofhu.com" target="_blank" rel="noopener">Designing a blog homepage</a>',
    c2p: "Yep, this one. " + mk('Pretty cool, right?', 'Took me a lot of time. The effects in the middle lean heavily on vision models') +
      " It's hosted on " + mk('GitHub', 'GitHub Pages, to be precise') + " for free. I've also built a " +
      mk('desktop app', "Works on Mac and Windows, but it's a bit chunky. Still figuring out how to slim it down") +
      ' so I can edit the site right from there.',
    welcome: 'Welcome!',
    c3t: 'AI hardware',
    c3p: "Lately it feels like I've kind of hit the ceiling with software, so I want to try building some AI hardware: a " + mk('robot arm', 'Might be too hard') + ' and a ' + mk('desk robot', 'Tells me walkthrough tips while I game') + ". Not sure if AI can spark some ideas for me in embedded.",
    c4t: 'Anime &amp; games',
    c4p: 'Just beat the ' + mk('Xenoblade Chronicles 2', "I'm a pro!") + ' remaster, and now I&rsquo;m waiting for the ' +
      mk('Xenoblade Chronicles 3', "Bought it at launch but never got into it. Finishing it this time for sure") +
      ' one. Also watching some ' + mk('anime', 'Mushoku Tensei, Though I Am an Inept Villainess') + '.',
    c5t: 'Writing something, as a human',
    c5p: mk('Write something', "I used to blog back in school. Haven't in ages") + ' and post it on a few blogging sites.',
    mystery: 'Just sitting there writing code? Sounds so boring.',
    kqTag: mk('125x leverage, all in', 'Go watch FX Fighter Kurumi-chan (FX戦士くるみちゃん)'),
    mysteryBy: '— Kurumi Cat',
    graspSub: 'A visual workflow for multiple coding agents · open source',
    buddyAria: 'Back to top',
    lines: ['Hi there~', "I'm cocofhu's little ghost", 'Heading out on a heist tonight~', 'Poke me again?', 'Working on SkillHub~', 'Whoosh—'],
    tf: ['Back to me~ Working on SkillHub!', 'coco, Phantom Thief!', 'All in! All in!', "Even if I burn my blood essence, I will survive. I won't die here!", 'Transform! Night-sky Cat', 'Transform! Sakura Cat', 'Transform! Soda Cat', 'Transform! Sleepy Cat'],
    sections: { recent: "What I'm up to~", about: 'Say hi!' },
    langAria: 'Switch language / 切换语言'
  };
  var ZH = {
    title: document.title,
    desc: (document.querySelector('meta[name="description"]') || {}).content || '',
    lines: ['你好呀~', '我是 cocofhu 的小幽灵', '今晚也要出动哦', '再戳一下？', '在做 SkillHub 哦', '咻——'],
    tf: ['变回来啦~ 在做 SkillHub 哦', 'coco 卡酷一', '梭哈 梭哈', '燃烧精血也要活下来，怎能命丧于此！', '变身！夜空猫', '变身！樱花猫', '变身！汽水猫', '变身！困困猫'],
    sections: { recent: '最近在做~', about: '打个招呼！' },
    langAria: '切换语言 / Switch language'
  };
  var i18nEls = document.querySelectorAll('[data-i18n]');
  var i18nAttrEls = document.querySelectorAll('[data-i18n-attr]');
  var chapters = document.querySelectorAll('[data-chapter]');
  Array.prototype.forEach.call(i18nEls, function (el) { ZH[el.getAttribute('data-i18n')] = el.innerHTML; });
  Array.prototype.forEach.call(i18nAttrEls, function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var kv = pair.split(':'); ZH[kv[1]] = el.getAttribute(kv[0]);
    });
  });
  Array.prototype.forEach.call(chapters, function (h) { ZH[h.getAttribute('data-chapter')] = h.textContent.trim(); });
  ZH.slogan = ZH.slogan || '白天是天才程序员 · 晚上是偷心怪盗团';
  ZH.sloganDay = '白天是天才程序员 ·';
  ZH.sloganNight = '晚上是偷心怪盗团';
  ZH.sloganBig = '偷心怪盗团';
  ZH.tags = '分布式系统 · 存储 · 基础设施';
  ZH.cc = { title: '预告信', lines: ['致来访的你：', '白天是天才程序员，晚上是偷心怪盗团。', ['今晚，我将', ['偷走'], '你的一点点', ['时间'], '。']], sign: '—— 怪盗猫 cocofhu' };

  function fillTape(el, text, n) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<span>' + text + '</span><em>✦</em>';
    el.innerHTML = '<div class="tape-run">' + s + '</div><div class="tape-run">' + s + '</div>';
  }
  // P5-style calling-card tape: calm "day" half + ransom-note "night" half
  function rnd(n) { var x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  // opt: { mono: calm cream/ink boxes, big: scale factor, calm: 0..1 jitter amount }
  function ransom(text, seed, opt) {
    opt = opt || {};
    var prev = -1, k = 0, calm = opt.calm == null ? 1 : opt.calm, big = opt.big || 1;
    return text.split('').map(function (ch) {
      if (ch === ' ') return '<i class="rn-sp"></i>';
      if (/[·,，.。]/.test(ch)) return '<i class="rn-p">' + ch + '</i>';
      var n = seed + (k++) * 7, v = Math.floor(rnd(n) * 7);
      if (v === prev) v = (v + 1 + Math.floor(rnd(n + 3) * 6)) % 7;
      prev = v;
      var cls = 'rn rn' + v + (opt.mono ? ' rn-m' + (rnd(n + 5) < 0.4 ? ' rn-mi' : '') : '') + (big > 1 ? ' rn-big' : '');
      return '<i class="' + cls + '" style="--r:' + ((rnd(n + 1) - 0.5) * 16 * calm).toFixed(1) + 'deg;--s:' + ((0.86 + rnd(n + 2) * 0.34 * calm) * big).toFixed(2) +
        ';--y:' + ((rnd(n + 4) - 0.5) * 7 * calm).toFixed(1) + 'px">' + ch + '</i>';
    }).join('');
  }
  function nightHTML(T, seed) {
    var t = T.sloganNight, b = T.sloganBig || '', at = b ? t.indexOf(b) : -1;
    if (at < 0) return ransom(t, seed);
    return ransom(t.slice(0, at), seed) + ransom(b, seed + 301, { big: 1.28 }) + ransom(t.slice(at + b.length), seed + 607);
  }
  function fillP5(el, T, n) {
    var s = '';
    for (var i = 0; i < n; i++) {
      s += '<span class="p5-day">' + ransom(T.sloganDay, 900 + i * 41, { mono: true, calm: 0.45 }) + '</span><span class="p5-night">' + nightHTML(T, i * 53) + '</span><em class="p5-star">★</em>';
    }
    el.innerHTML = '<div class="tape-run">' + s + '</div><div class="tape-run">' + s + '</div>';
  }
  var tracks = document.querySelectorAll('.tape-track');
  function renderTapes(T) {
    // repeat counts keep one run wider than the widest tape (~110% of a 2560px screen)
    if (tracks[0]) fillP5(tracks[0], T, lang === 'en' ? 3 : 6);
    if (tracks[1]) fillTape(tracks[1], T.tags, lang === 'en' ? 6 : 10);
  }
  function renderChapters(T) {
    Array.prototype.forEach.call(chapters, function (h) {
      var t = T[h.getAttribute('data-chapter')] || '';
      h.setAttribute('aria-label', t);
      h.innerHTML = t.split('').map(function (ch, i) {
        return '<span class="cbox" aria-hidden="true" style="--i:' + i + '"><span>' + ch + '</span></span>';
      }).join('');
      h.classList.add('reveal');
    });
  }

  var LS_KEY = 'cocofhu-lang';
  function pickLang() {
    var q = /[?&]lang=(en|zh)\b/i.exec(location.search);
    if (q) return q[1].toLowerCase();
    try { var s = localStorage.getItem(LS_KEY); if (s === 'en' || s === 'zh') return s; } catch (e) {}
    var nl = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^zh/i.test(nl) ? 'zh' : 'en';
  }
  var lang = pickLang();
  var langBtn = document.getElementById('langBtn');
  var onLangChange = [];
  function setLang(l) {
    lang = l;
    var T = l === 'en' ? EN : ZH;
    doc.lang = l === 'en' ? 'en' : 'zh-CN';
    doc.setAttribute('data-lang', l);
    document.title = T.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', T.desc);
    Array.prototype.forEach.call(i18nEls, function (el) {
      var v = T[el.getAttribute('data-i18n')]; if (v != null) el.innerHTML = v;
    });
    Array.prototype.forEach.call(i18nAttrEls, function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var kv = pair.split(':'); if (T[kv[1]] != null) el.setAttribute(kv[0], T[kv[1]]);
      });
    });
    renderChapters(T);
    renderTapes(T);
    if (langBtn) {
      langBtn.setAttribute('aria-label', T.langAria);
      Array.prototype.forEach.call(langBtn.querySelectorAll('[data-l]'), function (s) {
        s.classList.toggle('on', s.getAttribute('data-l') === l);
      });
    }
    onLangChange.forEach(function (fn) { fn(T); });
  }
  function tr() { return lang === 'en' ? EN : ZH; }
  setLang(lang);
  if (langBtn) langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var next = lang === 'en' ? 'zh' : 'en';
    try { localStorage.setItem(LS_KEY, next); } catch (er) {}
    setLang(next);
    // chapters are re-rendered; make them visible again if already scrolled past
    Array.prototype.forEach.call(chapters, function (h) {
      if (h.getBoundingClientRect().top < window.innerHeight) h.classList.add('in');
    });
  });

  /* ---------- raster grid (VISUAL card) ---------- */
  var raster = document.querySelector('.raster');
  if (raster) {
    var cells = '', N = 7;
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var inside = Math.abs(x - 3) <= y / 2 + 0.01; // little pixel triangle
      cells += '<i' + (inside ? ' class="on" style="--k:' + (y * N + x) + '"' : '') + '></i>';
    }
    raster.innerHTML = cells;
  }

  /* ---------- intro sequence ---------- */
  var intro = document.getElementById('intro');
  var word = document.getElementById('introWord');
  if (word) {
    word.innerHTML = 'cocofhu'.split('').map(function (c, i) {
      return '<span class="iw" style="--i:' + i + '"><span>' + c + '</span></span>';
    }).join('');
  }
  function startPage() {
    doc.classList.add('ready');
    observe();
  }
  if (reduce || !intro) {
    if (intro) intro.remove();
    doc.classList.add('ready', 'intro-done');
    observeStatic();
  } else {
    doc.classList.add('intro-on');
    var done = false;
    var finish = function () {
      if (done) return; done = true;
      doc.classList.add('intro-open');
      setTimeout(startPage, 380);
      setTimeout(function () { doc.classList.add('intro-done'); doc.classList.remove('intro-on'); intro.remove(); }, 1300);
    };
    var t = setTimeout(finish, 1750);
    intro.addEventListener('click', function () { clearTimeout(t); finish(); });
    window.addEventListener('keydown', function () { clearTimeout(t); finish(); }, { once: true });
  }

  /* ---------- reveal on scroll ---------- */
  function observe() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { observeStatic(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }
  function observeStatic() {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { el.classList.add('in'); });
  }

  /* ---------- annotation bubbles ---------- */
  var openMark = null;
  function place(m) {
    var b = m.querySelector('.bubble');
    if (!b) return;
    b.style.setProperty('--shift', '0px');
    var r = b.getBoundingClientRect(), pad = 10, vw = window.innerWidth, s = 0;
    if (r.left < pad) s = pad - r.left; else if (r.right > vw - pad) s = (vw - pad) - r.right;
    b.style.setProperty('--shift', s + 'px');
  }
  // delegated, so marks survive language re-renders
  document.addEventListener('mouseover', function (e) {
    var m = e.target.closest && e.target.closest('.mark');
    if (m && !m.contains(e.relatedTarget)) place(m);
  });
  document.addEventListener('focusin', function (e) {
    var m = e.target.closest && e.target.closest('.mark'); if (m) place(m);
  });
  document.addEventListener('click', function (e) {
    var m = e.target.closest && e.target.closest('.mark');
    if (!m) return;
    e.stopPropagation();
    if (openMark && openMark !== m) openMark.classList.remove('open');
    m.classList.toggle('open');
    openMark = m.classList.contains('open') ? m : null;
    place(m);
  }, true);
  onLangChange.push(function () { openMark = null; });
  document.addEventListener('click', function () { if (openMark) { openMark.classList.remove('open'); openMark = null; } });

  /* ---------- hero cat: eyes follow, click = squash jump + stars ---------- */
  var heroCat = document.getElementById('heroCat');
  var say = document.getElementById('heroSay');
  var li = 0;
  if (say) say.textContent = tr().lines[0];
  /* click = magical-girl transform: ghost cat cycles through forms and back */
  var FORMS = ['yume', 'kaito', 'kurumi', 'hanli', 'yozora', 'sakura', 'soda', 'nemu'];
  var fi = 0, sayKey = null;
  onLangChange.push(function (T) { if (say) { say.textContent = sayKey === null ? T.lines[li] : T.tf[sayKey]; say.classList.toggle('say--long', say.textContent.length > 14); } });
  if (heroCat) {
    var eyes = heroCat.querySelector('.c-eyes');
    if (!reduce) {
      window.addEventListener('pointermove', function (e) {
        if (!eyes || reduce) return;
        var r = heroCat.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.5);
        var d = Math.max(1, Math.hypot(dx, dy)), k = Math.min(1, d / 400);
        eyes.style.transform = 'translate(' + (dx / d * 6 * k).toFixed(2) + 'px,' + (dy / d * 5 * k).toFixed(2) + 'px)';
      }, { passive: true });
    }
    var slot = heroCat.querySelector('[data-cat]');
    var stage = heroCat.parentNode;
    var burnT = 0;
    function swap() {
      fi = (fi + 1) % FORMS.length;
      slot.setAttribute('data-cat', FORMS[fi]);
      slot.innerHTML = catSVG(FORMS[fi], false);
      var ne = slot.querySelector('.c-eyes');
      if (ne && eyes) ne.style.transform = eyes.style.transform;
      eyes = ne;
      sayKey = fi; say.textContent = tr().tf[fi];
      say.classList.toggle('say--long', say.textContent.length > 14);
      clearTimeout(burnT); heroCat.classList.remove('hanli-burn');
      if (FORMS[fi] === 'hanli' && !reduce) burnT = setTimeout(function () { heroCat.classList.add('hanli-burn'); burnT = setTimeout(function () { heroCat.classList.remove('hanli-burn'); }, 1200); }, 300);
      say.classList.remove('pop-say'); void say.offsetWidth; say.classList.add('pop-say');
    }
    /* jelly transform driven by a spring: press -> squash, swap at the bottom, spring back up (~350ms).
       A new press mid-flight retargets from the current state, no waiting. */
    var sx = 0, sv = 0, target = 0, swapArmed = false, catRaf = 0, last = 0;
    var K = 1100, C = 30;
    function squashEl() { return slot.querySelector('.c-squash'); }
    function paint() {
      var el = squashEl(); if (!el) return;
      if (sx === 0 && target === 0) { el.style.transform = ''; return; }
      var ty = sx < 0 ? sx * 28 : 0;
      el.style.transform = 'translateY(' + ty.toFixed(2) + '%) scale(' + (1 + 0.4 * sx).toFixed(4) + ',' + (1 - 0.62 * sx).toFixed(4) + ')';
    }
    function step(now) {
      var dt = Math.min(0.032, (now - last) / 1000 || 0.016); last = now;
      for (var i = 0; i < 4; i++) { var a = K * (target - sx) - C * sv; sv += a * dt / 4; sx += sv * dt / 4; }
      if (swapArmed && sx >= 0.78) { swapArmed = false; swap(); target = 0; }
      if (target === 0 && Math.abs(sx) < 0.003 && Math.abs(sv) < 0.08) { sx = 0; sv = 0; paint(); catRaf = 0; return; }
      paint(); catRaf = requestAnimationFrame(step);
    }
    function transform() {
      heroCat.classList.add('tf');
      if (reduce) { swap(); return; }
      clearTimeout(burnT); heroCat.classList.remove('hanli-burn');
      target = 1; swapArmed = true;
      if (!catRaf) { last = performance.now(); catRaf = requestAnimationFrame(step); }
    }
    heroCat.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse' && e.button !== 0) return; transform(); });
    heroCat.addEventListener('click', function (e) { if (e.detail === 0) transform(); }); // keyboard (Enter / Space)
    /* instant press feedback (mouse / touch / pen), independent of the transform */
    function release() { heroCat.classList.remove('pressed'); }
    heroCat.addEventListener('pointerdown', function (e) { if (e.button === 0 || e.pointerType !== 'mouse') heroCat.classList.add('pressed'); });
    ['pointerup', 'pointercancel', 'pointerleave', 'blur'].forEach(function (t) { heroCat.addEventListener(t, release); });
  }
  function burst(host, n) {
    var colors = ['#ffd36e', '#9fe3ff', '#ff9db5', '#b8f3e6', '#c9b8ff'];
    for (var i = 0; i < n; i++) {
      var s = document.createElement('i');
      s.className = 'spark-p';
      var a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
      var dist = 110 + Math.random() * 60;
      s.style.setProperty('--x', (Math.cos(a) * dist).toFixed(0) + 'px');
      s.style.setProperty('--y', (Math.sin(a) * dist * 0.8 - 30).toFixed(0) + 'px');
      s.style.setProperty('--r', (Math.random() * 360).toFixed(0) + 'deg');
      s.style.background = colors[i % colors.length];
      host.appendChild(s);
      setTimeout(function (el) { el.remove(); }.bind(null, s), 900);
    }
  }

  /* ---------- scroll buddy ---------- */
  var buddy = document.getElementById('buddy');
  var buddyBody = document.getElementById('buddyBody');
  var buddySay = document.getElementById('buddySay');
  var hero = document.getElementById('hero');
  var topBar = document.getElementById('top');
  var lastY = window.scrollY, tilt = 0, raf = 0, current = '';
  onLangChange.push(function (T) { if (current && T.sections[current]) buddySay.textContent = T.sections[current]; });
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var y = window.scrollY, v = y - lastY; lastY = y;
      var heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      buddy.classList.toggle('show', heroBottom < window.innerHeight * 0.35);
      if (topBar) {
        if (v > 6 && y > 240) topBar.classList.add('hide');
        else if (v < -6 || y < 120) topBar.classList.remove('hide');
      }
      if (!reduce) {
        tilt += (Math.max(-18, Math.min(18, v * 0.6)) - tilt) * 0.5;
        buddyBody.style.transform = 'rotate(' + tilt.toFixed(1) + 'deg) translateY(' + (Math.min(10, Math.abs(v) * 0.25)).toFixed(1) + 'px)';
        clearTimeout(onScroll.t);
        onScroll.t = setTimeout(function () { tilt = 0; buddyBody.style.transform = ''; }, 140);
      }
      // section line
      var sec = '';
      ['recent', 'about'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) sec = id;
      });
      if (sec !== current) {
        current = sec;
        var SL = tr().sections;
        if (sec && SL[sec]) {
          buddySay.textContent = SL[sec];
          buddySay.classList.remove('on'); void buddySay.offsetWidth; buddySay.classList.add('on');
        }
      }
      // about: peek cat
      var peek = document.getElementById('peek');
      if (peek) {
        var r = peek.parentNode.getBoundingClientRect();
        peek.classList.toggle('up', r.top < window.innerHeight * 0.7 && r.bottom > 0);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (buddy) buddy.addEventListener('click', function () { jump('#main'); });

  /* ---------- page-transition wipe for in-page jumps ---------- */
  var wipe = document.getElementById('wipe');
  function jump(hash, x, y) {
    var target = document.querySelector(hash);
    if (!target) return;
    if (reduce || !wipe) { target.scrollIntoView(); return; }
    wipe.style.setProperty('--wx', (x == null ? window.innerWidth / 2 : x) + 'px');
    wipe.style.setProperty('--wy', (y == null ? window.innerHeight / 2 : y) + 'px');
    wipe.classList.remove('out'); wipe.classList.add('in');
    setTimeout(function () {
      if (hash === '#main') window.scrollTo(0, 0); else target.scrollIntoView();
      wipe.classList.remove('in'); wipe.classList.add('out');
      setTimeout(function () { wipe.classList.remove('out'); }, 650);
    }, 520);
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-jump]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      jump(a.getAttribute('href'), e.clientX || null, e.clientY || null);
    });
  });

  /* ---------- title letters jiggle on hover ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.tbox'), function (b) {
    b.addEventListener('mouseenter', function () {
      b.classList.remove('jig'); void b.offsetWidth; b.classList.add('jig');
    });
  });

  /* ---------- phantom thief cat on the tape ---------- */
  var thief = document.getElementById('thief');
  var cc = document.getElementById('cc');
  var ccLast = null, ccTimer = 0;
  function ccPlain(T) {
    return [T.cc.title].concat(T.cc.lines.map(function (l) {
      return typeof l === 'string' ? l : l.map(function (x) { return typeof x === 'string' ? x : x[0]; }).join('');
    }), [T.cc.sign]).join(' ');
  }
  function renderCC(T) {
    if (!cc) return;
    var k = 0;
    var rk = function (txt, seed) { // ransom + stagger index
      return ransom(txt, seed).replace(/<i class="rn /g, function () { return '<i style="--k:' + (k++) + '" class="rn '; });
    };
    // ransom() already puts a style attr; merge --k into it
    var fix = function (h) { return h.replace(/<i style="--k:(\d+)" class="(rn[^"]*)" style="/g, '<i class="$2" style="--k:$1;'); };
    cc.querySelector('.cc-title-rn').innerHTML = T.cc.title.split(' ').map(function (w, wi) { return '<span class="rn-word">' + fix(rk(w, 7 + wi * 11)) + '</span>'; }).join('');
    document.getElementById('ccTitleText').textContent = T.cc.title;
    var body = T.cc.lines.map(function (l, li) {
      if (typeof l === 'string') return '<p>' + l + '</p>';
      return '<p>' + l.map(function (x, xi) {
        return typeof x === 'string' ? x : '<span class="rn-word">' + fix(rk(x[0], 100 + li * 17 + xi * 5)) + '</span>';
      }).join('') + '</p>';
    }).join('') + '<p class="cc-sign">' + T.cc.sign + '</p>';
    cc.querySelector('.cc-body').innerHTML = body;
    document.getElementById('ccText').textContent = ccPlain(T);
  }
  function openCC() {
    if (!cc || !cc.hidden) return;
    clearTimeout(ccTimer);
    ccLast = document.activeElement;
    renderCC(tr());
    cc.hidden = false;
    void cc.offsetWidth;
    cc.classList.add('open');
    doc.classList.add('cc-lock');
    var x = cc.querySelector('.cc-x'); if (x) x.focus({ preventScroll: true });
  }
  function closeCC() {
    if (!cc || cc.hidden) return;
    cc.classList.remove('open');
    doc.classList.remove('cc-lock');
    ccTimer = setTimeout(function () { cc.hidden = true; }, 260);
    if (ccLast && ccLast.focus) ccLast.focus({ preventScroll: true });
  }
  if (cc) {
    cc.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.closest('[data-cc-close]')) closeCC();
    });
    cc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeCC(); }
      else if (e.key === 'Tab') { e.preventDefault(); var x = cc.querySelector('.cc-x'); if (x) x.focus(); } // only one focusable control
    });
    onLangChange.push(function (T) { if (!cc.hidden) renderCC(T); });
  }
  if (thief) {
    var setThief = function (on) {
      thief.classList.toggle('open', on);
      thief.setAttribute('aria-expanded', on ? 'true' : 'false');
    };
    thief.addEventListener('click', function (e) {
      e.stopPropagation();
      // keyboard activation, or a click on the visible mini card -> full calling card
      if (e.detail === 0 || e.target.closest('.thief-card')) { setThief(false); openCC(); return; }
      setThief(!thief.classList.contains('open'));
      var b = thief.querySelector('.thief-body');
      b.classList.remove('flick'); void b.offsetWidth; b.classList.add('flick');
    });
    document.addEventListener('click', function () { setThief(false); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setThief(false); });
  }
})();

