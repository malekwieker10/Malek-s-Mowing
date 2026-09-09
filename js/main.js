/* ============================================================
   Malek's Mowing — site behavior
   No dependencies. Everything degrades gracefully without JS.
   ============================================================ */
(function () {
  'use strict';

  /* ---- CONFIG -------------------------------------------------
     Paste a form endpoint here to have quote requests emailed to
     you automatically (e.g. a Formspree URL: https://formspree.io/f/xxxxxxx).
     Leave it empty and the form falls back to opening the visitor's
     email app with the request pre-filled — which works with zero setup.
  --------------------------------------------------------------- */
  var FORM_ENDPOINT = '';
  var CONTACT_EMAIL = 'maleksmowing@outlook.com';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- current year ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var toggle = $('#navToggle');
  var nav = $('#nav');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- header shadow on scroll ---------- */
  var header = $('#siteHeader');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- scrollspy ---------- */
  var navLinks = $$('.nav a[href^="#"]').filter(function (a) { return !a.classList.contains('btn'); });
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = $$('.section-head, .card, .visit-card, .ba, .work, .hero-card, .check-list');

  if ('IntersectionObserver' in window && !reduceMotion) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- quote form ---------- */
  var form = $('#quoteForm');
  var note = $('#formNote');

  function setError(input, message) {
    var field = input.closest('.field');
    var err = field ? field.querySelector('.err') : null;
    if (field) field.classList.toggle('invalid', Boolean(message));
    if (err) err.textContent = message || '';
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validate(input) {
    var value = input.value.trim();

    if (input.hasAttribute('required') && !value) {
      setError(input, 'This one is required.');
      return false;
    }
    if (input.type === 'tel' && value) {
      var digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        setError(input, 'Please enter a 10-digit phone number.');
        return false;
      }
    }
    if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(input, 'That email address looks off.');
      return false;
    }
    setError(input, '');
    return true;
  }

  function buildMailto(data) {
    var body = [
      'Name: ' + data.name,
      'Phone: ' + data.phone,
      'Email: ' + (data.email || '—'),
      'Address: ' + data.address,
      'Service: ' + data.service,
      'Yard size: ' + data.size,
      '',
      'Notes:',
      data.notes || '—'
    ].join('\n');

    return 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Estimate request — ' + data.name) +
      '&body=' + encodeURIComponent(body);
  }

  if (form) {
    var inputs = $$('input, select, textarea', form);

    inputs.forEach(function (input) {
      input.addEventListener('blur', function () { validate(input); });
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field && field.classList.contains('invalid')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var ok = true;
      var firstBad = null;
      inputs.forEach(function (input) {
        if (!validate(input)) {
          ok = false;
          if (!firstBad) firstBad = input;
        }
      });

      if (!ok) {
        note.textContent = 'Please fix the highlighted fields.';
        note.className = 'form-note error';
        if (firstBad) firstBad.focus();
        return;
      }

      var data = {};
      inputs.forEach(function (input) { data[input.name] = input.value.trim(); });

      var button = form.querySelector('button[type="submit"]');

      if (!FORM_ENDPOINT) {
        // No backend configured — hand the request off to the visitor's email app.
        note.textContent = 'Opening your email app to send the request…';
        note.className = 'form-note';
        window.location.href = buildMailto(data);
        return;
      }

      button.disabled = true;
      button.textContent = 'Sending…';
      note.textContent = '';
      note.className = 'form-note';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed with status ' + res.status);
          form.reset();
          note.textContent = 'Thanks! Your request is in — we\'ll be in touch within 24 hours.';
          note.className = 'form-note success';
        })
        .catch(function () {
          note.textContent = 'Something went wrong. Please call or text (605) 290-3872 instead.';
          note.className = 'form-note error';
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = 'Send my request';
        });
    });
  }
})();
