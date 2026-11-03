/* What about coffee? Website: Animationen und Interaktionen.
   GSAP 3.13 (ScrollTrigger, SplitText) und Lenis liegen lokal in /vendor. */
(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mm = gsap.matchMedia();
  const DESK = '(min-width: 901px)';
  // Sprachen: Texte kommen aus js/i18n.js (Deutsch steht im HTML)
  const LANG = document.documentElement.lang || 'de';
  const t = (key, vars) => window.WAC_t ? window.WAC_t(key, vars) : key;
  const k = s => window.WAC_k ? window.WAC_k(s) : s;
  const cap = s => s && LANG !== 'ar' ? s.charAt(0).toLocaleUpperCase(LANG) + s.slice(1) : s;
  const MOB = '(max-width: 900px)';

  /* ───────── Inhalte ───────── */
  const CONFIG = {
    // PLATZHALTER: Öffnungszeiten vom Kunden bestätigen lassen (0 = Sonntag)
    hours: {
      1: ['08:00', '19:00'], 2: ['08:00', '19:00'], 3: ['08:00', '19:00'], 4: ['08:00', '19:00'],
      5: ['08:00', '19:00'], 6: ['09:00', '19:00'], 0: ['09:00', '19:00']
    },
    words: [
      { key: 'coffee', text: 'coffee?', color: '#D39A55', rgb: [0.83, 0.58, 0.32] },
      { key: 'croffles', text: 'croffles?', color: '#EDB25A', rgb: [0.93, 0.66, 0.28] },
      { key: 'croissants', text: 'croissants?', color: '#C3D46E', rgb: [0.62, 0.74, 0.32] },
      { key: 'acai', text: 'açaí?', color: '#EE7AA6', rgb: [0.62, 0.14, 0.42] },
      { key: 'matcha', text: 'matcha?', color: '#A9D86C', rgb: [0.42, 0.7, 0.28] }
    ],
    reels: [
      // Bildunterschriften bleiben im Original (Instagram des Kunden), das Datum formatiert Intl je Sprache
      ['DfC0RuNyG0I', 'Wer hat danach auch Krümel ÜBERALL? 😂', '2026-10-28'],
      ['De9uhuXh1Vk', 'Wer ist auch mit diesen Serien aufgewachsen? 🥹', '2026-10-26'],
      ['DeRyQ2kESVz', 'Der Twist einfach …', '2026-10-09'],
      ['DeMorAWiLbD', 'Und ich zeig dir dein Croissant!', '2026-10-07'],
      ['DeHfL01CXJF', 'Nr. 3 ist bodenlos', '2026-10-05'],
      ['DeCVsU1k6ye', 'Dann ist das hier DER SPOT dafür!', '2026-10-03'],
      ['Dd9L4GcDC55', 'Mit Genuss', '2026-10-01'],
      ['Dd4CYSEjV37', 'Was sind das für Karten 😂', '2026-09-29'],
      ['Ddy4rkXDJZ7', 'Nicht nur Berlin', '2026-09-27'],
      ['DdtvLuoCkup', 'Ausländerbehörde 😂', '2026-09-25'],
      ['Ddolk_wjGif', 'Bueno ist mein Liebling :P', '2026-09-23'],
      ['Ddjb_GvAPRJ', 'Schätz den Preis!', '2026-09-21']
    ]
  };

  const THEMES = {
    '.hero': 'dark', '.manifest': 'light', '.karte__head': 'dark', '.panel--coffee': 'dark',
    '.panel--croissant': 'light', '.panel--acai': 'dark', '.panel--croffle': 'light', '.panel--matcha': 'dark',
    '.board': 'light', '.quiz': 'light', '.story': 'dark', '.spot': 'light', '.reels': 'dark', '.visit': 'light', '.foot': 'dark'
  };
  Object.entries(THEMES).forEach(([s, t]) => $$(s).forEach(el => el.dataset.theme = t));

  /* ───────── Smooth Scroll ───────── */
  let lenis = null;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.095, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  function scrollToTarget(target) {
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) });
    else (typeof target === 'number' ? scrollTo({ top: target }) : target.scrollIntoView());
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id === '#') { e.preventDefault(); return; }
    const el = id === '#top' ? 0 : $(id);
    if (el === null) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(el);
  });

  /* ───────── Nav: Farbe je Abschnitt, beim Runterscrollen weg ───────── */
  const nav = $('.nav');
  let lastY = scrollY, menuOpen = false, ticking = false;
  function updateNav() {
    ticking = false;
    const y = scrollY;
    if (!menuOpen) {
      const els = document.elementsFromPoint(innerWidth / 2, nav.offsetHeight / 2);
      const host = els.map(el => el.closest('[data-theme]')).find(el => el && !nav.contains(el));
      nav.classList.toggle('is-light', !!host && host.dataset.theme === 'light');
      const down = y > lastY + 2, up = y < lastY - 2;
      if (down && y > innerHeight * 0.8) nav.classList.add('is-hidden');
      else if (up || y < innerHeight * 0.5) nav.classList.remove('is-hidden');
    }
    lastY = y;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateNav); } }, { passive: true });

  /* Menü (Handy) */
  const burger = $('.nav__burger'), menu = $('.menu');
  function openMenu() {
    menuOpen = true; menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', t('js.menuClose'));
    nav.classList.remove('is-light', 'is-hidden'); lenis && lenis.stop();
    gsap.fromTo($$('.menu__links a'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .8, stagger: .05, ease: 'expo.out', delay: .15 });
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false; menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', t('js.menuOpen'));
    lenis && lenis.start(); updateNav();
  }
  burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ───────── Öffnungszeiten, Status, Uhr ───────── */
  const DAYS = [0, 1, 2, 3, 4, 5, 6].map(d => t('js.day' + d));
  const toMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  function berlinNow() {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    const h = Number(get('hour')) % 24, m = Number(get('minute'));
    return { day, min: h * 60 + m, hh: String(h).padStart(2, '0'), mm: String(m).padStart(2, '0') };
  }
  function renderHours() {
    const now = berlinNow();
    const body = $('[data-hours]');
    body.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => {
      const h = CONFIG.hours[d];
      return `<tr class="${d === now.day ? 'is-today' : ''}"><td>${DAYS[d]}</td><td>${h ? t('js.range', { a: h[0], b: h[1] }) : t('js.restday')}</td></tr>`;
    }).join('');
    const today = CONFIG.hours[now.day];
    const open = today && now.min >= toMin(today[0]) && now.min < toMin(today[1]);
    let long, short;
    if (open) { long = t('js.openLong', { t: today[1] }); short = t('js.openShort', { t: today[1] }); }
    else if (today && now.min < toMin(today[0])) { long = t('js.laterLong', { t: today[0] }); short = t('js.laterShort', { t: today[0] }); }
    else {
      let d = (now.day + 1) % 7, n = 1;
      while (!CONFIG.hours[d] && n < 7) { d = (d + 1) % 7; n++; }
      const when = n === 1 ? t('js.tomorrow') : DAYS[d];
      long = t('js.closedLong', { when, t: CONFIG.hours[d][0] }); short = t('js.closedShort');
    }
    $$('[data-status-long]').forEach(el => el.textContent = long);
    $$('[data-status-short]').forEach(el => el.textContent = short);
    $$('[data-status-dot]').forEach(el => el.classList.toggle('is-closed', !open));
    $$('[data-clock]').forEach(el => el.textContent = `${now.hh}:${now.mm}`);
  }
  renderHours();
  setInterval(renderHours, 20000);

  /* ───────── Reels aufbauen ───────── */
  const reelDate = new Intl.DateTimeFormat(LANG, { day: 'numeric', month: 'short', year: 'numeric' });
  $('.reels__track').innerHTML = CONFIG.reels.map(([id, cap, date]) => `
    <a class="reel" href="https://www.instagram.com/whataboutcoffeeberlin/reel/${id}/" target="_blank" rel="noopener" draggable="false">
      <div class="reel__media">
        <img src="assets/reels/${id}.webp" alt="${t('js.reelAlt', { cap: cap.replace(/"/g, '') })}" loading="lazy" draggable="false" width="361" height="640">
        <span class="reel__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg></span>
      </div>
      <p class="reel__cap" lang="de">${cap}</p>
      <p class="reel__meta">Reel · ${reelDate.format(new Date(date + 'T12:00:00'))}</p>
    </a>`).join('');

  /* ───────── Story: Bildunterschriften fürs Handy ───────── */
  $$('.story__fig').forEach((fig, i) => {
    const step = $(`.step[data-step="${i}"]`);
    if (!step) return;
    const cap = document.createElement('figcaption');
    cap.className = 'story__cap';
    cap.innerHTML = step.innerHTML;
    fig.appendChild(cap);
  });

  /* ───────── Ganze Karte (Daten aus js/karte-daten.js) ───────── */
  const KARTE = window.WAC_KARTE;
  const euro = n => n.toFixed(2).replace('.', ',');
  const allItems = KARTE.bereiche.flatMap(b => b.gruppen.flatMap(g => g.items || []));
  const itemById = id => allItems.find(i => i.id === id);
  // Preise in den Highlight Panels
  $$('[data-preis]').forEach(el => { const it = itemById(el.dataset.preis); if (it) el.textContent = euro(it.preis); });
  $$('[data-preise]').forEach(el => {
    const it = itemById(el.dataset.preise);
    if (it) el.insertAdjacentHTML('afterbegin', it.preise.map(([g, p]) => `<li>${cap(k(g))} <b>${euro(p)}</b></li>`).join(''));
  });

  const board = $('.board'), boardTabs = $('.board__tabs'), boardPanels = $('.board__panels'), boardArt = $('.board__art'), boardWord = $('.board__word');
  const extrasHtml = (ex, title) => `<div class="bextras"><p class="bextras__title">${title}</p>${ex.map(e => `<p class="bextra"><span>${k(e.name)}</span><b dir="ltr">+${euro(e.preis)}</b></p>`).join('')}</div>`;
  const itemHtml = it => {
    const price = it.preise ? it.preise.map(([g, p]) => `<span><small>${k(g)}</small>${euro(p)}</span>`).join('') : (it.preis != null ? euro(it.preis) : '');
    return `<li class="bitem">
        <span class="bitem__name">${k(it.name)}</span>
        ${price ? `<span class="bitem__price">${price}</span>` : ''}
        ${it.zutaten ? `<span class="bitem__zut">${k(it.zutaten)}</span>` : ''}
        ${it.varianten ? `<ul class="bitem__var">${it.varianten.map(v => `<li>${k(v)}</li>`).join('')}</ul>` : ''}
        ${it.extras ? extrasHtml(it.extras, t('js.topping')) : ''}
      </li>`;
  };
  const groupHtml = g => {
    const chips = g.items && g.items.every(i => !i.zutaten && i.preis == null && !i.preise);
    return `<article class="bgroup">
        <header class="bgroup__head">
          <div><h3 class="bgroup__name">${k(g.name)}</h3>${g.info ? `<p class="bgroup__info">${k(g.info)}</p>` : ''}</div>
          ${g.preis != null ? `<span class="bgroup__price">${g.items ? `<small>${t('js.each')}</small>` : ''}${euro(g.preis)}</span>` : ''}
        </header>
        ${g.items ? (chips ? `<ul class="bchips">${g.items.map(i => `<li>${k(i.name)}</li>`).join('')}</ul>` : `<ul class="bgroup__items">${g.items.map(itemHtml).join('')}</ul>`) : ''}
        ${g.extras ? extrasHtml(g.extras, g.items ? t('js.extra') : t('js.toppings')) : ''}
      </article>`;
  };
  boardTabs.innerHTML = KARTE.bereiche.map((b, i) => `<button class="board__tab" role="tab" id="tab-${b.id}" aria-controls="board-${b.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-cursor="hover"><b lang="en">${b.id[0].toUpperCase() + b.id.slice(1)}</b><small>${k(b.titel)}</small></button>`).join('');
  boardPanels.innerHTML = KARTE.bereiche.map((b, i) => `<div class="board__panel" role="tabpanel" id="board-${b.id}" aria-labelledby="tab-${b.id}"${i ? ' hidden' : ''}>${b.gruppen.map(groupHtml).join('')}</div>`).join('');
  boardArt.innerHTML = KARTE.bereiche.map((b, i) => b.bilder.map((src, j) => `<img class="board__pic board__pic--${'ab'[j]}${i ? '' : ' is-on'}" data-board="${b.id}" src="assets/img/${src}_m.webp" srcset="assets/img/${src}_m.webp 600w, assets/img/${src}.webp 1000w" sizes="(max-width: 900px) 56vw, 30vw" alt="" loading="lazy">`).join('')).join('');
  $('.board__notes').innerHTML = KARTE.hinweise.map(h => `<li>${k(h)}</li>`).join('');
  board.style.setProperty('--bacc', KARTE.bereiche[0].farbe);

  let boardIdx = 0;
  function boardShow(i, focus) {
    if (i === boardIdx) return;
    const b = KARTE.bereiche[i], tabs = $$('.board__tab', boardTabs), panels = $$('.board__panel', boardPanels);
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === i); t.tabIndex = j === i ? 0 : -1; });
    if (focus) tabs[i].focus();
    panels.forEach((p, j) => { p.hidden = j !== i; });
    $$('.board__pic', boardArt).forEach(img => img.classList.toggle('is-on', img.dataset.board === b.id));
    board.style.setProperty('--bacc', b.farbe);
    boardIdx = i;
    if (reduce) { boardWord.textContent = b.wort; }
    else {
      gsap.timeline()
        .to(boardWord, { yPercent: -110, duration: .28, ease: 'power2.in' })
        .add(() => { boardWord.textContent = b.wort; })
        .fromTo(boardWord, { yPercent: 110 }, { yPercent: 0, duration: .8, ease: 'expo.out' });
      gsap.from($$('.bgroup', panels[i]), { y: 40, opacity: 0, duration: .8, stagger: .07, ease: 'expo.out' });
      gsap.fromTo($$(`.board__pic[data-board="${b.id}"]`, boardArt), { y: 50, scale: .9 }, { y: 0, scale: 1, duration: 1.1, stagger: .08, ease: 'expo.out' });
    }
    ScrollTrigger.refresh();
  }
  boardTabs.addEventListener('click', e => {
    const t = e.target.closest('.board__tab');
    if (t) boardShow($$('.board__tab', boardTabs).indexOf(t));
  });
  boardTabs.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (d) { e.preventDefault(); boardShow((boardIdx + d + KARTE.bereiche.length) % KARTE.bereiche.length, true); }
  });

  /* ───────── Quiz ───────── */
  // Texte in tools/build_i18n.py (quiz.*, res.*), hier nur Reihenfolge der Antworten
  const QUIZ = [['g', 'c', 't', 'k'], ['g', 't', 'c', 'k'], ['g', 't', 'c', 'k']].map((codes, i) => ({
    q: t(`quiz.q${i + 1}`), a: codes.map(c => [t(`quiz.q${i + 1}.${c}`), c])
  }));
  const RESULTS = {
    g: { preis: 'croissant-gefuellt', c: '#BAC86C', img: 'assets/img/c5_croissant_pistazie_m.webp' },
    t: { preis: 'croffle', c: '#E6A647', img: 'assets/img/c3_croffle_pistazie_m.webp' },
    c: { preis: 'croffle', c: '#EBA3A9', img: 'assets/img/c4_croffle_schoko_m.webp' },
    k: { preis: 'croissant-gefuellt', c: '#D39A55', img: 'assets/img/c6_croissant_schoko_m.webp' }
  };
  Object.entries(RESULTS).forEach(([code, r]) => ['name', 'type', 'txt'].forEach(f => { r[f] = t(`res.${code}.${f}`); }));
  const quizStage = $('.quiz__stage'), quizBars = $$('.quiz__progress i');
  let answers = [];
  function quizSwap(html, after) {
    const old = quizStage.firstElementChild;
    const show = () => {
      quizStage.innerHTML = html;
      after && after();
      if (!reduce) gsap.from(quizStage.children[0].children, { y: 26, opacity: 0, duration: .7, stagger: .06, ease: 'expo.out' });
    };
    if (old && !reduce) gsap.to(old, { y: -18, opacity: 0, duration: .3, ease: 'power2.in', onComplete: show });
    else show();
  }
  function quizQuestion(i) {
    quizBars.forEach((b, j) => b.classList.toggle('is-done', j < i));
    const Q = QUIZ[i];
    quizSwap(`<div class="quiz__card">
        <p class="quiz__step">${t('js.quizStep', { n: i + 1, m: QUIZ.length })}</p>
        <h3 class="quiz__q">${Q.q}</h3>
        <div class="quiz__answers">${Q.a.map(([t, k], j) => `<button class="quiz__answer" data-k="${k}"><b>${t}</b><span>${'ABCD'[j]}</span></button>`).join('')}</div>
      </div>`, () => {
      gsap.from($$('.quiz__answer', quizStage), { y: 20, opacity: 0, duration: .6, stagger: .06, delay: .1, ease: 'expo.out' });
    });
  }
  function quizResult() {
    quizBars.forEach(b => b.classList.add('is-done'));
    const score = {};
    answers.forEach((k, i) => score[k] = (score[k] || 0) + 1 + i * 0.01);
    const key = Object.keys(score).sort((a, b) => score[b] - score[a])[0];
    const r = RESULTS[key];
    quizSwap(`<div class="result" style="--rc:${r.c}">
        <div class="result__art"><img src="${r.img}" alt="${r.name}"></div>
        <div class="result__body">
          <p class="result__kicker">${t('js.match')} · <span dir="ltr">${euro(itemById(r.preis).preis)} €</span></p>
          <h3 class="result__name">${r.name}</h3>
          <p class="result__type">${r.type}</p>
          <p class="result__txt">${r.txt}</p>
          <div class="result__actions">
            <a class="btn btn--solid" href="#besuch" data-cursor="hover"><span>${t('js.get')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            <button class="btn btn--ghost-dark quiz__again" data-cursor="hover"><span>${t('js.again')}</span></button>
          </div>
        </div>
      </div>`, () => {
      if (!reduce) gsap.from($('.result__art img', quizStage), { scale: .6, rotate: -14, duration: 1.2, ease: 'elastic.out(1, .6)' });
    });
  }
  quizStage.addEventListener('click', e => {
    const btn = e.target.closest('.quiz__answer');
    if (btn) {
      answers.push(btn.dataset.k);
      gsap.to(btn, { scale: .97, duration: .12, yoyo: true, repeat: 1 });
      answers.length < QUIZ.length ? quizQuestion(answers.length) : quizResult();
      return;
    }
    if (e.target.closest('.quiz__again')) { answers = []; quizQuestion(0); }
  });
  quizQuestion(0);

  /* ───────── Hero: Wortwechsel ───────── */
  const hero = $('.hero');
  const rot = $('.hero__rot');
  const video = $('.hero__video');
  const dots = $$('.hero__dots button');
  rot.setAttribute('aria-live', 'off');
  let idx = 0, busy = false, queued = null, auto = null, heroVisible = true;
  const STEP = 3.6;

  function setChars(el, text) {
    el.textContent = '';
    [...text].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; el.appendChild(s); });
    return $$('.ch', el);
  }
  setChars(rot, CONFIG.words[0].text);

  function setDots(i) {
    dots.forEach((d, j) => d.setAttribute('aria-selected', 'false'));
    void dots[i].offsetWidth;
    dots[i].setAttribute('aria-selected', 'true');
  }

  function go(next) {
    if (busy) { queued = next; return; }
    if (next === idx) return;
    busy = true;
    const w = CONFIG.words[next];
    const tl = gsap.timeline({
      onComplete: () => {
        busy = false;
        if (queued !== null) { const q = queued; queued = null; go(q); }
      }
    });
    tl.to($$('.ch', rot), { yPercent: -115, rotate: -10, opacity: 0, duration: .42, stagger: .022, ease: 'power3.in' }, 0)
      .add(() => {
        const chars = setChars(rot, w.text);
        gsap.fromTo(chars, { yPercent: 115, rotate: 10, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: .8, stagger: .03, ease: 'expo.out' });
      });
    tl.to(hero, { '--tint': w.color, duration: 1.1, ease: 'power2.inOut' }, 0);
    idx = next;
    setDots(next);
  }
  function schedule() {
    auto && auto.kill();
    if (reduce) return;
    auto = gsap.delayedCall(STEP, () => { if (heroVisible) go((idx + 1) % CONFIG.words.length); schedule(); });
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); schedule(); }));
  hero.style.setProperty('--dot-dur', STEP + 's');

  /* ───────── Hero Video (Ambient aus dem Laden, ohne Ton) ───────── */
  // Bei "Bewegung reduzieren" oder Datensparmodus bleibt das Standbild stehen
  // Hochkant Bildschirme bekommen die Hochkant Fassung (Mitte des Videos), sonst 1080p quer
  const saveData = navigator.connection && navigator.connection.saveData;
  const hoch = matchMedia('(max-aspect-ratio: 3/4)').matches;
  if (hoch) video.poster = video.dataset.posterHoch;
  if (reduce || saveData) video.removeAttribute('autoplay');
  else video.src = hoch ? video.dataset.hoch : video.dataset.quer;
  const playVideo = () => { if (!reduce && !saveData) { const p = video.play(); p && p.catch(() => {}); } };

  /* ───────── Preloader und Intro ───────── */
  const wait = ms => new Promise(res => setTimeout(res, ms));
  const videoReady = new Promise(res => {
    if (reduce || saveData || video.readyState >= 3) return res();
    video.addEventListener('canplay', res, { once: true });
    video.addEventListener('error', res, { once: true });
  });
  const ready = Promise.race([Promise.all([document.fonts.ready, videoReady]), wait(4500)]);

  const loader = $('.loader'), num = $('.loader__num');
  const prog = { v: 0 };
  const full = $('.loader__full');
  // Das Logo füllt sich von unten wie eine Tasse
  const renderLoader = () => {
    num.textContent = Math.round(prog.v);
    full.style.clipPath = `inset(${100 - prog.v}% 0 0 0)`;
  };
  const loaderIn = gsap.to(prog, { v: 82, duration: reduce ? .2 : 1.4, ease: 'power2.out', onUpdate: renderLoader });

  Promise.all([ready, loaderIn.then()]).then(() => {
    initScroll();
    gsap.timeline()
      .to(prog, { v: 100, duration: .45, ease: 'power2.inOut', onUpdate: renderLoader })
      .to('.loader__logo, .loader__count, .loader__word', { y: -30, opacity: 0, duration: .5, stagger: .05, ease: 'power3.in' }, '+=.15')
      .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.05, ease: 'expo.inOut' }, '-=.15')
      .add(() => {
        document.body.classList.remove('is-loading');
        lenis && lenis.start();
        heroIntro();
      }, '-=.75')
      .add(() => {
        loader.remove(); ScrollTrigger.refresh();
        // Nach einem Sprachwechsel an dieselbe Stelle zurück
        let back = null;
        try { back = sessionStorage.getItem('wac-scroll'); sessionStorage.removeItem('wac-scroll'); } catch (e) { /* privat */ }
        if (back) lenis ? lenis.scrollTo(Number(back), { immediate: true }) : window.scrollTo(0, Number(back));
      });
  });

  function heroIntro() {
    const tl = gsap.timeline({ onComplete: schedule });
    tl.from('.hero__line-in', { yPercent: 115, duration: 1.3, ease: 'expo.out' }, 0)
      .from($$('.ch', rot), { yPercent: 115, rotate: 8, duration: 1.2, stagger: .035, ease: 'expo.out' }, .12)
      .from(video, { scale: 1.14, duration: 2.4, ease: 'expo.out' }, 0)
      .from('.hero__eyebrow, .hero__lead, .hero__actions, .hero__foot, .hero__badge', { y: 24, opacity: 0, duration: 1, stagger: .07, ease: 'power3.out' }, .45)
      .from('.nav > *', { y: -24, opacity: 0, duration: 1, stagger: .06, ease: 'power3.out' }, .5);
    playVideo();
  }

  /* ───────── Scroll Animationen ───────── */
  function initScroll() {
    // Hero: Maus Parallaxe und Scroll
    if (fine && !reduce) {
      const badge = $('.hero__badge');
      const gx = gsap.quickTo(badge, 'x', { duration: 1.6, ease: 'power3' }), gy = gsap.quickTo(badge, 'y', { duration: 1.6, ease: 'power3' });
      hero.addEventListener('pointermove', e => {
        const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
        gx(nx * 18); gy(ny * 14);
      });
    }
    if (!reduce) {
      gsap.timeline({
        scrollTrigger: {
          trigger: hero, start: 'top top', end: 'bottom top', scrub: true
        }
      })
        .to('.hero__content', { yPercent: -18, opacity: .15, ease: 'none' }, 0)
        .to(video, { yPercent: 14, scale: 1.08, ease: 'none' }, 0)
        .to('.hero__badge', { yPercent: -120, ease: 'none' }, 0);
    }

    // Video und Wortwechsel laufen nur, solange der Hero im Bild ist (auch ganz oben bei 0)
    ScrollTrigger.create({
      trigger: hero, start: 'top bottom', end: 'bottom top',
      onToggle: self => { heroVisible = self.isActive; self.isActive ? playVideo() : video.pause(); }
    });

    // Überschriften Zeile für Zeile
    $$('.split-lines').forEach(el => {
      const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line', maskClass: 'line-mask' });
      if (reduce) return;
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.2, stagger: .08, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Allgemeine Einblendungen
    if (!reduce) {
      gsap.utils.toArray('.label, .board__title, .board__tabs, .board__body, .board__notes, .quiz__lead, .spot__lead, .visit__status, .hours, .visit__actions, .reels__head .btn, .spot__features li, .stat, .foot__ask, .foot__up').forEach(el => {
        gsap.from(el, { y: 34, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
    }

    // Manifest: Wort für Wort aufhellen
    const man = $('.manifest__text');
    const words = [];
    [...man.childNodes].forEach(node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const s = document.createElement('span'); s.className = 'word'; s.textContent = part; frag.appendChild(s); words.push(s);
        });
        man.replaceChild(frag, node);
      } else { words.push(node); }
    });
    if (!reduce) {
      gsap.fromTo(words, { opacity: .13 }, {
        opacity: 1, stagger: .1, ease: 'none',
        scrollTrigger: { trigger: man, start: 'top 78%', end: 'bottom 42%', scrub: true }
      });
      $$('.pill', man).forEach((p, i) => {
        gsap.from(p, { width: 0, marginLeft: 0, marginRight: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 75%' } });
        gsap.from($('img', p), { rotate: i % 2 ? 30 : -30, scale: .4, duration: 1.4, ease: 'elastic.out(1, .6)', scrollTrigger: { trigger: p, start: 'top 75%' } });
      });
    }

    // Zähler
    $$('[data-count]').forEach(el => {
      const end = Number(el.dataset.count), suf = el.dataset.suffix || '';
      const o = { v: 0 };
      const fmt = () => el.textContent = Math.round(o.v).toLocaleString(LANG === 'ar' ? 'en' : LANG) + suf;
      if (reduce) { o.v = end; fmt(); return; }
      gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', onUpdate: fmt, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    // Karte: horizontal am Desktop
    const track = $('.karte__track'), panels = $$('.panel');
    const progSpans = $$('.karte__progress span'), progBar = $('.karte__bar b'), progWrap = $('.karte__progress');
    let curPanel = -1;
    function setPanel(i) {
      if (i === curPanel) return;
      curPanel = i;
      progSpans.forEach((s, j) => s.classList.toggle('is-on', j === i));
      progWrap.style.color = getComputedStyle(panels[i]).getPropertyValue('--fg');
    }
    mm.add(DESK, () => {
      setPanel(0);
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.karte__pin', pin: true, scrub: reduce ? true : 1, start: 'top top',
          end: () => '+=' + dist(), invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => {
            gsap.set(progBar, { scaleX: self.progress });
            setPanel(Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1))));
          }
        }
      });
      if (reduce) return;
      panels.forEach(p => {
        const st = { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true };
        const main = $('.panel__img--main', p), side = $('.panel__img--side', p), decor = $('.panel__img--decor', p);
        gsap.fromTo(main, { xPercent: 22, rotate: 9 }, { xPercent: -22, rotate: -7, ease: 'none', scrollTrigger: st });
        side && gsap.fromTo(side, { xPercent: 70, yPercent: 14, rotate: -14 }, { xPercent: -50, yPercent: -12, rotate: 12, ease: 'none', scrollTrigger: { ...st } });
        decor && gsap.fromTo(decor, { xPercent: -40, rotate: -25 }, { xPercent: 60, rotate: 30, ease: 'none', scrollTrigger: { ...st } });
        gsap.fromTo($('.panel__text', p), { xPercent: 14 }, { xPercent: -14, ease: 'none', scrollTrigger: { ...st } });
      });
    });
    mm.add(MOB, () => {
      if (reduce) return;
      panels.forEach(p => {
        gsap.from($('.panel__img--main', p), { y: 70, rotate: 8, scale: .86, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 75%' } });
        const side = $('.panel__img--side', p);
        side && gsap.from(side, { x: 60, rotate: -14, opacity: 0, duration: 1.3, delay: .15, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 70%' } });
        gsap.from($$('.panel__num, .panel__name, .panel__desc, .panel__list', p), { y: 30, opacity: 0, duration: 1, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: $('.panel__text', p), start: 'top 85%' } });
      });
    });

    // Croffle Story: Text klebt, Bilder laufen
    const figs = $$('.story__fig'), steps = $$('.step');
    let curStep = 0;
    function setStep(i) {
      if (i === curStep) return;
      const out = steps[curStep], inn = steps[i], dir = i > curStep ? 1 : -1;
      gsap.to(out, { autoAlpha: 0, y: -40 * dir, duration: .5, ease: 'power3.in' });
      gsap.fromTo(inn, { autoAlpha: 0, y: 46 * dir }, { autoAlpha: 1, y: 0, duration: .8, ease: 'expo.out', delay: .25 });
      figs.forEach((f, j) => f.classList.toggle('is-active', j === i));
      curStep = i;
    }
    mm.add(DESK, () => {
      gsap.set(steps, { autoAlpha: 0 }); gsap.set(steps[curStep], { autoAlpha: 1 });
      figs.forEach((f, j) => f.classList.toggle('is-active', j === curStep));
      figs.forEach((f, i) => {
        ScrollTrigger.create({ trigger: f, start: 'top 55%', end: 'bottom 45%', onToggle: self => self.isActive && setStep(i) });
        if (!reduce && !f.classList.contains('story__fig--cut')) {
          gsap.fromTo($('img', f), { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
        }
      });
      gsap.fromTo('.story__meter b', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.story__media', start: 'top 55%', end: 'bottom 55%', scrub: true } });
      return () => gsap.set(steps, { clearProps: 'all' });
    });
    mm.add(MOB, () => {
      if (reduce) return;
      figs.forEach(f => gsap.from(f, { y: 50, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 85%' } }));
    });

    // Der Spot: Bild öffnet sich
    if (!reduce) {
      mm.add({ d: DESK, m: MOB }, ctx => {
        const from = ctx.conditions.d ? 'inset(9% 16% 9% 16% round 32px)' : 'inset(6% 6% 6% 6% round 24px)';
        gsap.fromTo('.spot__frame', { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.spot__hero', start: 'top 80%', end: 'top 5%', scrub: true } });
      });
      gsap.to('.spot__frame img', { scale: 1, yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.spot__hero', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.spot__fig--a', { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.spot__duo', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.spot__fig--b', { yPercent: 34 }, { yPercent: -26, ease: 'none', scrollTrigger: { trigger: '.spot__duo', start: 'top bottom', end: 'bottom top', scrub: true } });
      $$('.spot__fig img').forEach(img => gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }));

      // Reels fliegen rein
      gsap.from('.reel', { x: 140, opacity: 0, duration: 1.3, stagger: .06, ease: 'expo.out', scrollTrigger: { trigger: '.reels__rail', start: 'top 85%' } });

      // Karte im Besuch Abschnitt
      gsap.from('.visit__map', { clipPath: 'inset(12% 12% 12% 12% round 30px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.visit__map', start: 'top 85%' } });
      gsap.from('.visit__pin', { y: -80, opacity: 0, duration: 1.2, ease: 'bounce.out', delay: .4, scrollTrigger: { trigger: '.visit__map', start: 'top 80%' } });
    }

    // Footer Wortmarke
    const fw = $('.foot__word');
    const fchars = setChars(fw, fw.textContent).map(c => { if (c.textContent === ' ') c.innerHTML = '&nbsp;'; return c; });
    if (!reduce) {
      gsap.from([...fchars, $('.foot__q')], { yPercent: 105, duration: 1.2, stagger: .025, ease: 'expo.out', scrollTrigger: { trigger: '.foot__mark', start: 'top 92%' } });
      gsap.to('.foot__q', { rotate: 12, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      $('.foot__mark').addEventListener('pointerenter', () => {
        gsap.fromTo('.foot__q', { y: 0 }, { y: '-0.18em', duration: .35, ease: 'power2.out', yoyo: true, repeat: 1 });
        gsap.to(fchars, { yPercent: -8, duration: .3, stagger: { each: .02, from: 'start' }, ease: 'power2.out', yoyo: true, repeat: 1 });
      });
    }

    // Wortmarke füllt die Breite genau aus, egal wie schmal das Handy ist
    const mark = $('.foot__mark');
    // Fraunces ändert mit der Größe die Buchstabenbreite (optische Größe), daher in Schritten annähern
    const fitMark = () => {
      const cs = getComputedStyle(mark);
      const avail = (mark.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) * 0.985;
      let size = 100;
      for (let i = 0; i < 4; i++) {
        mark.style.fontSize = size + 'px';
        const content = $('.foot__word').getBoundingClientRect().width + $('.foot__q').getBoundingClientRect().width;
        size = Math.min(size * avail / content, innerWidth * 0.16);
      }
      mark.style.fontSize = Math.floor(size * 10) / 10 + 'px';
    };
    fitMark();
    addEventListener('resize', fitMark);

    addEventListener('load', () => { fitMark(); ScrollTrigger.refresh(); });
  }

  /* ───────── Karte erst nach Klick laden (DSGVO) ───────── */
  const MAP_SRC = 'https://www.openstreetmap.org/export/embed.html?bbox=13.2479%2C52.4297%2C13.2749%2C52.4407&layer=mapnik&marker=52.4352%2C13.2614';
  function loadMap() {
    const box = $('.visit__map');
    if ($('iframe', box)) return;
    const f = document.createElement('iframe');
    f.title = t('js.mapTitle');
    f.referrerPolicy = 'no-referrer';
    f.src = MAP_SRC;
    box.prepend(f);
    f.addEventListener('load', () => $('.visit__consent', box).classList.add('is-gone'));
    try { localStorage.setItem('wac-map', '1'); } catch (e) { /* privater Modus */ }
  }
  $('.visit__load').addEventListener('click', loadMap);
  try { if (localStorage.getItem('wac-map') === '1') loadMap(); } catch (e) { /* privater Modus */ }

  /* ───────── Reels: Ziehen mit Schwung ───────── */
  const rail = $('.reels__rail');
  rail.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation(); }, { passive: true });
  if (fine) {
    let down = false, sx = 0, sl = 0, lx = 0, vx = 0, moved = false;
    rail.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      down = true; moved = false; sx = lx = e.clientX; sl = rail.scrollLeft; vx = 0;
      gsap.killTweensOf(rail);
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 6 && !moved) { moved = true; rail.classList.add('is-drag'); }
      vx = e.clientX - lx; lx = e.clientX;
      rail.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (moved) gsap.to(rail, { scrollLeft: rail.scrollLeft - vx * 18, duration: 1, ease: 'power3.out' });
      setTimeout(() => rail.classList.remove('is-drag'), 30);
    });
    rail.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  }
  rail.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { rail.scrollBy({ left: 320, behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft') { rail.scrollBy({ left: -320, behavior: 'smooth' }); }
  });

  /* ───────── Cursor und Magnet Buttons ───────── */
  if (fine && !reduce) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor-dot'), label = $('.cursor__label');
    const cx = gsap.quickTo(cur, 'x', { duration: .55, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .55, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: .08 }), dy = gsap.quickTo(dot, 'y', { duration: .08 });
    addEventListener('pointermove', e => { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); }, { passive: true });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor], a, button');
      cur.classList.remove('is-hover', 'is-label');
      if (!t) return;
      const reel = t.closest('.reels__rail');
      if (reel) { label.textContent = 'Drag'; cur.classList.add('is-label'); return; }
      cur.classList.add('is-hover');
    });
    document.addEventListener('pointerdown', () => gsap.to(cur, { scale: .8, duration: .2 }));
    document.addEventListener('pointerup', () => gsap.to(cur, { scale: 1, duration: .4, ease: 'elastic.out(1,.5)' }));
    document.documentElement.addEventListener('mouseleave', () => { cur.classList.add('is-hidden'); dot.classList.add('is-hidden'); });
    document.documentElement.addEventListener('mouseenter', () => { cur.classList.remove('is-hidden'); dot.classList.remove('is-hidden'); });
    // Über der eingebetteten Karte gilt der normale Mauszeiger
    document.addEventListener('mouseover', e => { if (e.target.tagName === 'IFRAME') { cur.classList.add('is-hidden'); dot.classList.add('is-hidden'); } });
    document.addEventListener('mouseout', e => { if (e.target.tagName === 'IFRAME') { cur.classList.remove('is-hidden'); dot.classList.remove('is-hidden'); } });

    $$('[data-magnetic]').forEach(el => {
      const mx = gsap.quickTo(el, 'x', { duration: .7, ease: 'elastic.out(1, .45)' }), my = gsap.quickTo(el, 'y', { duration: .7, ease: 'elastic.out(1, .45)' });
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * .28); my((e.clientY - r.top - r.height / 2) * .38);
      });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }
})();
