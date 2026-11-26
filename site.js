/* yusuffiratgul.com — progressive enhancement only. Every feature is null-guarded. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var isTr = (root.lang || 'en').toLowerCase().indexOf('tr') === 0;
  var S = isTr
    ? { copied: 'Kopyalandı ✓', verify: 'Doğrula ▸', again: 'Tekrar doğrula ↺', locale: 'tr-TR',
        done: 'Doğrulama başarılı.' }
    : { copied: 'Copied ✓', verify: 'Verify ▸', again: 'Verify again ↺', locale: 'en-GB',
        done: 'Verification passed.' };

  var reduceMq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var motion = !(reduceMq && reduceMq.matches);
  var motionOff = []; // callbacks run once if the user switches to reduced motion mid-session
  if (reduceMq && reduceMq.addEventListener) {
    reduceMq.addEventListener('change', function (e) {
      if (!e.matches || !motion) return;
      motion = false;
      root.classList.remove('motion');
      motionOff.forEach(function (fn) { fn(); });
    });
  }
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  /* ---------- Istanbul clock ---------- */
  function initClock() {
    var el = $('[data-clock]');
    if (!el || !window.Intl || !Intl.DateTimeFormat) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat(S.locale, { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    } catch (e) { return; }
    var wrap = $('[data-clock-wrap]');
    function tick() {
      var now = new Date();
      el.textContent = fmt.format(now);
      el.setAttribute('datetime', now.toISOString());
    }
    tick();
    if (wrap) wrap.hidden = false;
    setInterval(tick, 30000);
  }

  /* ---------- copy email ---------- */
  function initCopy() {
    $$('[data-copy]').forEach(function (link) {
      var label = $('.copy-label', link) || link;
      var original = label.textContent;
      var timer = null;
      link.addEventListener('click', function (e) {
        if (!navigator.clipboard || !navigator.clipboard.writeText) return; // fall back to mailto:
        e.preventDefault();
        var text = (link.getAttribute('href') || '').replace(/^mailto:/i, '').split('?')[0] || original;
        navigator.clipboard.writeText(text).then(function () {
          label.textContent = S.copied;
          clearTimeout(timer);
          timer = setTimeout(function () { label.textContent = original; }, 2000);
        }, function () { window.location.href = link.href; });
      });
    });
  }

  /* ---------- header: scrolled state + hide on scroll down ---------- */
  function initHeader() {
    var header = $('.site-header');
    if (!header) return;
    var last = window.pageYOffset || 0;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset || 0;
      header.classList.toggle('is-scrolled', y > 8);
      if (motion) {
        var busy = header.contains(doc.activeElement) && doc.activeElement !== doc.body;
        if (y > 120 && y > last + 4 && !busy) header.classList.add('is-hidden');
        else if (y < last - 4 || y <= 120) header.classList.remove('is-hidden');
      }
      last = y;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });
    update();
  }

  /* ---------- mobile menu <dialog> ---------- */
  function initMenu() {
    var dlg = $('dialog.menu');
    var btn = $('.menu-btn');
    if (!dlg || !btn) return;
    if (typeof dlg.showModal !== 'function') { btn.hidden = true; return; }
    function close() { if (dlg.open) dlg.close(); }
    btn.addEventListener('click', function () { dlg.showModal(); btn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', function () { btn.setAttribute('aria-expanded', 'false'); btn.focus(); });
    $$('a', dlg).forEach(function (a) { a.addEventListener('click', close); });
    var x = $('.menu-close', dlg);
    if (x) x.addEventListener('click', close);
    dlg.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.matchMedia && window.matchMedia('(min-width: 720px)').addEventListener &&
      window.matchMedia('(min-width: 720px)').addEventListener('change', function (m) { if (m.matches) close(); });
    root.classList.add('menu-ready'); // CSS swaps inline links for the Menu button only now
  }

  /* ---------- ID card: verify animation + tilt ---------- */
  function initCard() {
    var stage = $('.hero-stage');
    var card = stage && $('.idcard', stage);
    if (!stage || !card) return;
    var btn = $('.verify-btn', stage);
    var checks = $$('.checks li', stage);
    var result = $('.result', stage);
    var status = $('[data-verify-status]', stage);
    root.classList.add('is-ready'); // releases the CSS no-flash start state
    if (!motion) return; // static final state; button stays hidden

    var busy = false;
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

    function reset() {
      stage.classList.add('is-unverified');
      stage.classList.remove('is-scanning');
      checks.forEach(function (c) { c.classList.remove('on'); });
      if (result) result.classList.remove('show');
      if (status) status.textContent = '';
    }


    function run() {
      if (busy) return;
      busy = true;
      timers.forEach(clearTimeout); timers = [];
      reset();
      if (btn) btn.setAttribute('aria-disabled', 'true');
      // restart the scan animation
      void card.offsetWidth;
      stage.classList.add('is-scanning');
      later(function () {
        stage.classList.remove('is-scanning');
        checks.forEach(function (c, i) { later(function () { c.classList.add('on'); }, i * 120); });
        later(function () {
          if (result) result.classList.add('show');
          if (status) status.textContent = S.done;
          if (btn) { btn.textContent = S.again; btn.removeAttribute('aria-disabled'); }
          busy = false;
        }, checks.length * 120 + 80);
      }, 900);
    }

    reset();
    if (btn) { btn.textContent = S.verify; btn.hidden = false; btn.addEventListener('click', run); }

    var raf = 0;
    function untilt() {
      cancelAnimationFrame(raf);
      card.style.removeProperty('--ry');
      card.style.removeProperty('--rx');
    }

    // Reduced motion switched on mid-session: stop everything, show the final verified state.
    motionOff.push(function () {
      busy = false;
      timers.forEach(clearTimeout); timers = [];
      untilt();
      stage.classList.remove('is-unverified', 'is-scanning');
      if (result) result.classList.remove('show');
      if (status) status.textContent = '';
      if (btn) { btn.hidden = true; btn.removeAttribute('aria-disabled'); }
    });

    if (window.PointerEvent && window.matchMedia('(hover: hover)').matches) {
      stage.addEventListener('pointermove', function (e) {
        if (!motion || e.pointerType !== 'mouse') return;
        var r = card.getBoundingClientRect();
        var x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        var y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          if (!motion) return;
          card.style.setProperty('--ry', ((x - 0.5) * 8).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        });
      });
      stage.addEventListener('pointerleave', untilt);
    }
  }

  /* ---------- app cards: mark previous card as .is-past once the next one stacks on it ---------- */
  function initApps() {
    if (!motion || !('IntersectionObserver' in window)) return;
    var apps = $$('.apps-list > .app');
    if (apps.length < 2) return;
    var mq = window.matchMedia('(min-width: 720px)');
    function clearPast() { apps.forEach(function (a) { a.classList.remove('is-past'); }); }
    if (mq.addEventListener) mq.addEventListener('change', function (m) { if (!m.matches) clearPast(); });
    motionOff.push(clearPast);
    var header = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 64;
    apps.forEach(function (app, i) {
      if (i === 0) return;
      // Zero-height sentinel marks where card i sits in normal flow; once it scrolls above
      // the card's sticky offset, card i is stacked on top of card i-1.
      var sentinel = doc.createElement('li');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.cssText = 'height:0;margin:0;padding:0;list-style:none;pointer-events:none';
      app.parentNode.insertBefore(sentinel, app);
      var line = Math.round(header + 16 + i * 14 + 6);
      var prev = apps[i - 1];
      new IntersectionObserver(function (entries) {
        var e = entries[entries.length - 1];
        var past = mq.matches && !e.isIntersecting && e.boundingClientRect.top < line;
        prev.classList.toggle('is-past', past);
      }, { rootMargin: '-' + line + 'px 0px 0px 0px', threshold: 0 }).observe(sentinel);
    });
  }

  initClock();
  initCopy();
  initHeader();
  initMenu();
  initCard();
  initApps();
}());
