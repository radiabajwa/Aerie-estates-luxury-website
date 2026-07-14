(() => {
  'use strict';

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector('.cursor-dot');
  if (cursor && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.4)');
      el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
    });
  }

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Scroll cue click ---------- */
  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Ledger horizontal progress ---------- */
  const ledgerScroll = document.getElementById('ledgerScroll');
  const ledgerBar = document.getElementById('ledgerProgressBar');
  if (ledgerScroll && ledgerBar) {
    const updateBar = () => {
      const max = ledgerScroll.scrollWidth - ledgerScroll.clientWidth;
      const pct = max > 0 ? (ledgerScroll.scrollLeft / max) * 100 : 0;
      ledgerBar.style.width = Math.max(12, pct) + '%';
    };
    ledgerScroll.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  /* ---------- Hero 3D parallax canvas ---------- */
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const canTilt = matchMedia('(min-width: 900px)').matches && matchMedia('(hover:hover)').matches;
    const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canTilt && !prefersReducedMotion) {
      window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        heroCanvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      });
    } else {
      // Flatten the tilt on touch devices / reduced motion for readability & performance
      heroCanvas.style.transform = 'rotateX(28deg) rotateZ(-10deg) scale(1)';
    }

    // Entrance reveal shortly after load
    requestAnimationFrame(() => {
      setTimeout(() => heroCanvas.classList.add('is-in'), 150);
    });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('is-sent');
      const btn = contactForm.querySelector('.btn-primary');
      btn.disabled = true;
      setTimeout(() => {
        contactForm.reset();
      }, 400);
    });
  }
})();
