(function () {
  const STORAGE_KEY = 'lz_lang';
  const supported = ['en', 'zh'];

  function detectInitial() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    return 'en';
  }

  function applyLang(lang) {
    const dict = (window.I18N && window.I18N[lang]) || {};
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    localStorage.setItem(STORAGE_KEY, lang);
  }

  const initLang = detectInitial();
  applyLang(initLang);

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.body.getAttribute('data-lang') || 'en';
      applyLang(cur === 'en' ? 'zh' : 'en');
    });
  }

  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // card mouse glow
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .hero, .card, .skill-col').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
