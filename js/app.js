/* ═══════════════════════════════════════════════════
   KHAMIS AL JEDI — PORTFOLIO JS
   app.js — Rendering, Animations & Interactions
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const { LANG, PROJECTS_DATA, EXPERIENCE_DATA, CERTS_DATA, COLOR_MAP } = window.PORTFOLIO;

  let currentLang = 'ar';

  /* ─────────────────────────────── CURSOR ─────────────────────────────── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });

  /* ─────────────────────────────── LOADER ─────────────────────────────── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 2000);
  });

  /* ─────────────────────────────── PROGRESS ─────────────────────────────── */
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', updateProgress);
  function updateProgress() {
    const h   = document.body.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / h) * 100;
    progressBar.style.width = pct + '%';
  }

  /* ─────────────────────────────── NAVBAR ─────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveNav();
  });

  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.nav-link[data-section]').forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }

  /* ─────────────────────────────── MOBILE MENU ─────────────────────────────── */
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger  = document.getElementById('hamburger');

  window.toggleMobile = function () {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  window.closeMobile = function () {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ─────────────────────────────── LANGUAGE SWITCH ─────────────────────────────── */
  window.switchLang = function (lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    window._currentLang = lang; // sync for admin.js
    renderAll();
    // Update HTML dir/lang
    document.documentElement.lang = lang;
    document.documentElement.dir  = LANG[lang].dir;
    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };

  // Expose renderProjects globally so admin.js can call it
  window.renderProjects = function() { renderProjects(); };

  /* ─────────────────────────────── COUNT-UP ─────────────────────────────── */
  function countUp(el, target, duration = 1400) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start >= target) { el.textContent = target; clearInterval(timer); }
    }, 16);
  }
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target, +e.target.dataset.count);
        countObserver.unobserve(e.target);
      }
    });
  }, { threshold: .5 });

  /* ─────────────────────────────── SCROLL REVEAL ─────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // stagger children
        if (e.target.classList.contains('stagger-children')) {
          e.target.classList.add('visible');
        }
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -60px 0px' });

  function bindReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
      revealObserver.observe(el);
    });
    document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
    // title underlines
    document.querySelectorAll('.title-underline').forEach(el => {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      }, { threshold: .5 }).observe(el);
    });
    // lang fill bars
    document.querySelectorAll('.lang-fill').forEach(el => {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) el.classList.add('animated');
      }, { threshold: .5 }).observe(el);
    });
  }

  /* ─────────────────────────────── PROJECTS FILTER ─────────────────────────────── */
  window.filterProjects = function (type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    const L = LANG[currentLang];
    const allLabel = L.projects.filters[0];
    document.querySelectorAll('.project-card').forEach(card => {
      const t = card.dataset.type;
      card.classList.toggle('hidden', type !== allLabel && t !== type);
    });
  };

  /* ─────────────────────────────── FORM ─────────────────────────────── */
  window.handleSubmit = function (btn) {
    const L = LANG[currentLang];
    btn.textContent = L.contact.successMsg;
    btn.classList.add('success');
    setTimeout(() => {
      btn.textContent = L.contact.submitBtn;
      btn.classList.remove('success');
    }, 3500);
  };

  /* ─────────────────────────────── PAGE TRANSITION ─────────────────────────────── */
  const overlay = document.getElementById('page-overlay');
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      overlay.classList.add('entering');
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'instant' });
        overlay.classList.remove('entering');
        overlay.classList.add('leaving');
        setTimeout(() => overlay.classList.remove('leaving'), 600);
      }, 380);
    });
  });

  /* ─────────────────────────────── TILT EFFECT ─────────────────────────────── */
  function applyTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r   = card.getBoundingClientRect();
        const x   = e.clientX - r.left - r.width  / 2;
        const y   = e.clientY - r.top  - r.height / 2;
        const rx_ = (y / r.height) * 8;
        const ry_ = -(x / r.width) * 8;
        card.style.transform = `perspective(700px) rotateX(${rx_}deg) rotateY(${ry_}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─────────────────────────────── SMOOTH SCROLL ─────────────────────────────── */
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobile();
  };

  /* ─────────────────────────────── RENDER HELPERS ─────────────────────────────── */
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

  /* ─────────────────────────────── RENDER FUNCTIONS ─────────────────────────────── */

  function renderNav() {
    const L = LANG[currentLang];
    const sections = ['about','skills','projects','experience','certificates','contact'];
    // Desktop
    const desktopNav = document.getElementById('desktop-nav');
    desktopNav.innerHTML = sections.map(s =>
      `<a href="#${s}" class="nav-link" data-section="${s}" onclick="scrollToSection('${s}');return false;">${L.nav[s]}</a>`
    ).join('') + `<a href="#contact" class="nav-link nav-cta" onclick="scrollToSection('contact');return false;">${L.nav.contact}</a>`;
    // Mobile
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.innerHTML = sections.map(s =>
      `<a href="#${s}" class="nav-link" onclick="closeMobile();scrollToSection('${s}');return false;">${L.nav[s]}</a>`
    ).join('');
  }

  function renderHero() {
    const L  = LANG[currentLang];
    const h  = L.hero;
    const el = document.getElementById('hero-content');
    el.innerHTML = `
      <div class="hero-left">
        <div class="hero-badge reveal">
          <div class="badge-dot"></div>
          ${esc(h.badge)}
        </div>
        <div class="hero-name-en reveal">${esc(h.nameEn)}</div>
        <h1 class="hero-name reveal">
          <span class="name-first">${esc(h.nameAr)}</span>
          <span class="name-last gradient">${esc(h.nameLast)}</span>
        </h1>
        <p class="hero-subtitle reveal">${esc(h.subtitle)}</p>
        <p class="hero-desc reveal">${esc(h.desc)}</p>
        <div class="hero-actions reveal">
          <a href="#projects" class="btn btn-primary" onclick="scrollToSection('projects');return false;">${h.cta1} ↓</a>
          <a href="#contact" class="btn btn-outline" onclick="scrollToSection('contact');return false;">${h.cta2} ✉</a>
        </div>
        <div class="hero-stats reveal">
          ${h.stats.map(s => `
            <div class="hstat">
              <span class="hstat-num" data-count="${s.num}">0</span>
              <div class="hstat-lbl">${esc(s.lbl)}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-profile-card reveal-scale">
          <div class="hero-photo-slider" id="hero-slider">
            <div class="hero-photo-slide active" id="slide-0">
              <img src="images/profile2.png" alt="Khamis Nedal Al Jedi" loading="eager" />
            </div>
            <div class="hero-photo-slide" id="slide-1">
              <img src="images/profile.png" alt="Khamis Nedal Al Jedi" loading="eager" />
            </div>
          </div>
          <div class="slider-dots">
            <button class="slider-dot active" id="dot-0" onclick="goToSlide(0)"></button>
            <button class="slider-dot" id="dot-1" onclick="goToSlide(1)"></button>
          </div>
          <div class="hero-profile-badge badge-float">
            <div class="hpb-dot"></div>
            <div><div class="hpb-text">${esc(h.available)}</div><div class="hpb-sub">${esc(h.availableSub)}</div></div>
          </div>
          <div class="hero-profile-exp">
            <span class="hpe-num">3+</span>
            <div class="hpe-lbl">${esc(h.yearsExp)}</div>
          </div>
        </div>
        <div class="hero-floater hf1"></div>
        <div class="hero-floater hf2"></div>
        <div class="hero-floater hf3"></div>
      </div>`;

    // Init auto-slider
    initSlider();
  }

  /* ─── PHOTO SLIDER ─── */
  let sliderInterval = null;
  let currentSlide   = 0;
  const TOTAL_SLIDES = 2;

  window.goToSlide = function (n) {
    document.getElementById('slide-' + currentSlide)?.classList.remove('active');
    document.getElementById('dot-'   + currentSlide)?.classList.remove('active');
    currentSlide = n;
    document.getElementById('slide-' + currentSlide)?.classList.add('active');
    document.getElementById('dot-'   + currentSlide)?.classList.add('active');
  };

  function initSlider() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => {
      goToSlide((currentSlide + 1) % TOTAL_SLIDES);
    }, 4000);
  }

  function renderAbout() {
    const L = LANG[currentLang];
    const a = L.about;
    const el = document.getElementById('about-content');
    el.innerHTML = `
      <div class="about-img-wrap reveal-left">
        <img src="images/profile2.png" alt="Khamis Nedal Al Jedi" class="about-photo" loading="lazy" />
        <div class="about-deco-ring"></div>
        <div class="about-deco-dot"></div>
        <div class="about-exp-card badge-float">
          <span class="aec-num">3+</span>
          <div class="aec-lbl">${esc(a.expBadge)}</div>
        </div>
      </div>
      <div class="about-info reveal-right">
        <div class="section-label">${esc(a.label)}</div>
        <h2 class="section-title title-underline">${a.title.split('\n').map(esc).join('<br>')}</h2>
        <p class="about-text">${esc(a.text1)}</p>
        <p class="about-text">${esc(a.text2)}</p>
        <div class="info-grid">
          ${a.fields.map(f => `
            <div class="info-item">
              <span class="info-lbl">${esc(f.lbl)}</span>
              <span class="info-val${f.green ? ' text-green' : ''}">${esc(f.val)}</span>
            </div>`).join('')}
        </div>
        <div class="about-tags stagger-children">
          <span class="tag tag-blue">Video Editing</span>
          <span class="tag tag-teal">UI/UX Design</span>
          <span class="tag tag-amber">Motion Graphics</span>
          <span class="tag tag-rose">Brand Identity</span>
          <span class="tag tag-purple">Web Development</span>
          <span class="tag tag-green">Adobe CC</span>
        </div>
      </div>`;
  }

  function renderSkills() {
    const L = LANG[currentLang];
    const s = L.skills;
    document.getElementById('skills-header').innerHTML = `
      <div class="section-label reveal">${esc(s.label)}</div>
      <h2 class="section-title reveal">${esc(s.title)}</h2>
      <p class="section-sub reveal">${esc(s.sub)}</p>`;
    document.getElementById('skills-grid').innerHTML = s.cards.map((c, i) => `
      <div class="skill-card sc-${c.color} reveal" style="transition-delay:${i * .1}s">
        <div class="skill-icon" style="background:${COLOR_MAP[c.color].bg}">${c.icon}</div>
        <div class="skill-card-title">${esc(c.title)}</div>
        <div class="skill-items">
          ${c.items.map(it => `<span class="skill-pill">${esc(it)}</span>`).join('')}
        </div>
      </div>`).join('');
  }

  function renderProjects() {
    const L = LANG[currentLang];
    const p = L.projects;
    document.getElementById('projects-header').innerHTML = `
      <div class="section-label reveal">${esc(p.label)}</div>
      <h2 class="section-title reveal">${esc(p.title)}</h2>
      <p class="section-sub reveal">${esc(p.sub)}</p>`;
    const allLabel = p.filters[0];
    document.getElementById('projects-filters').innerHTML = p.filters.map((f, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}" onclick="filterProjects('${esc(f)}')">${esc(f)}</button>`
    ).join('');
    document.getElementById('projects-grid').innerHTML = PROJECTS_DATA.map((pr, i) => {
      const c = COLOR_MAP[pr.color] || COLOR_MAP.blue;
      return `
        <div class="project-card reveal" style="transition-delay:${i * .08}s" data-type="${currentLang === 'ar' ? pr.typeAr : pr.typeEn}">
          <div class="pc-thumb" style="background:${c.bg}">
            <div class="pc-thumb-inner">${pr.emoji}</div>
            <div class="pc-overlay">
              <a class="pc-overlay-btn" href="${pr.url}" target="_blank" rel="noopener">${p.viewBtn}</a>
            </div>
          </div>
          <div class="pc-body">
            <div class="pc-type-badge" style="background:${c.bg};color:${c.txt}">${currentLang === 'ar' ? pr.typeAr : pr.typeEn}</div>
            <div class="pc-title">${esc(currentLang === 'ar' ? pr.nameAr : pr.nameEn)}</div>
            <div class="pc-desc">${esc(currentLang === 'ar' ? pr.descAr : pr.descEn)}</div>
            <div class="pc-techs">${pr.tech.map(t => `<span class="pc-tech">${t}</span>`).join('')}</div>
            <div class="pc-footer">
              <div class="pc-stars">${stars(pr.stars)}</div>
              <a class="pc-link" href="${pr.url}" target="_blank" rel="noopener">${p.linkBtn}</a>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function renderExperience() {
    const L = LANG[currentLang];
    const e = L.experience;
    document.getElementById('exp-header').innerHTML = `
      <div class="section-label reveal">${esc(e.label)}</div>
      <h2 class="section-title reveal">${esc(e.title)}</h2>
      <p class="section-sub reveal">${esc(e.sub)}</p>`;
    document.getElementById('exp-timeline').innerHTML = EXPERIENCE_DATA.map((ex, i) => `
      <div class="exp-item reveal" style="transition-delay:${i * .15}s">
        <div class="exp-dot-wrap"><div class="exp-dot">${ex.icon}</div></div>
        <div class="exp-content">
          <div class="exp-date">${currentLang === 'ar' ? ex.dateAr : ex.dateEn}</div>
          <div class="exp-title">${esc(currentLang === 'ar' ? ex.titleAr : ex.titleEn)}</div>
          <div class="exp-company">${esc(currentLang === 'ar' ? ex.companyAr : ex.companyEn)}</div>
          <ul class="exp-points">
            ${(currentLang === 'ar' ? ex.pointsAr : ex.pointsEn).map(pt => `<li>${esc(pt)}</li>`).join('')}
          </ul>
        </div>
      </div>`).join('');
  }

  function renderEducation() {
    const L = LANG[currentLang];
    const e = L.education;
    document.getElementById('edu-header').innerHTML = `
      <div class="section-label reveal">${esc(e.label)}</div>
      <h2 class="section-title reveal">${esc(e.title)}</h2>
      <p class="section-sub reveal">${esc(e.sub)}</p>`;
    document.getElementById('edu-content').innerHTML = `
      <div class="edu-card reveal">
        <div class="edu-icon">🎓</div>
        <div>
          <div class="edu-degree">${currentLang === 'ar' ? 'بكالوريوس تكنولوجيا المعلومات — وسائط متعددة' : "Bachelor's in IT — Multimedia"}</div>
          <div class="edu-school">${currentLang === 'ar' ? 'الجامعة الإسلامية بغزة' : 'Islamic University of Gaza'}</div>
          <div class="edu-date mono">Oct 2021 — Jun 2025</div>
          <div class="edu-badges">
            <span class="edu-badge">${currentLang === 'ar' ? 'تقدير ممتاز' : 'Excellent Grade'}</span>
            <span class="edu-badge">${currentLang === 'ar' ? 'تدريب ميداني 94%' : 'Field Training 94%'}</span>
            <span class="edu-badge">Video & Design</span>
            <span class="edu-badge">${currentLang === 'ar' ? 'غزة، فلسطين 🇵🇸' : 'Gaza, Palestine 🇵🇸'}</span>
          </div>
        </div>
      </div>`;
  }

  function renderCertificates() {
    const L = LANG[currentLang];
    const c = L.certificates;
    document.getElementById('certs-header').innerHTML = `
      <div class="section-label reveal">${esc(c.label)}</div>
      <h2 class="section-title reveal">${esc(c.title)}</h2>
      <p class="section-sub reveal">${esc(c.sub)}</p>`;
    document.getElementById('certs-grid').innerHTML = CERTS_DATA.map((cert, i) => {
      const col = COLOR_MAP[cert.color] || COLOR_MAP.blue;
      return `
        <div class="cert-card reveal" style="transition-delay:${i * .06}s">
          <div class="cert-icon-w" style="background:${col.bg}">${cert.icon}</div>
          <div>
            <div class="cert-title">${esc(currentLang === 'ar' ? cert.titleAr : cert.titleEn)}</div>
            <div class="cert-year mono">${esc(cert.year)}</div>
          </div>
        </div>`;
    }).join('');
  }

  // SVG icon map for contact items
  const CONTACT_ICONS = {
    '📧': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    '📱': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.938 0C5.344 0 .017 5.325.013 11.92A11.9 11.9 0 0 0 1.6 17.94L0 24l6.224-1.632a11.92 11.92 0 0 0 5.706 1.455h.005C18.527 23.823 23.85 18.5 23.854 11.9 23.858 5.3 18.533-.004 11.938 0z"/></svg>`,
    '🐙': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
    '🎨': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12c.828 0 1.5-.672 1.5-1.5 0-.397-.149-.758-.396-1.029-.242-.263-.382-.603-.382-.971 0-.828.672-1.5 1.5-1.5H16c3.314 0 6-2.686 6-6 0-5.971-5.373-11-10-11zm-5.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>`,
    '👤': `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    '📍': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
  };

  function renderContact() {
    const L = LANG[currentLang];
    const c = L.contact;
    document.getElementById('contact-header').innerHTML = `
      <div class="section-label reveal">${esc(c.label)}</div>
      <h2 class="section-title reveal">${esc(c.title)}</h2>
      <p class="section-sub reveal">${esc(c.sub)}</p>`;
    document.getElementById('contact-info').innerHTML = c.contacts.map(ci => `
      <div class="contact-item">
        <div class="ci-icon-w" style="background:${COLOR_MAP[ci.color].bg};color:${COLOR_MAP[ci.color].txt}">
          ${CONTACT_ICONS[ci.icon] || ci.icon}
        </div>
        <div>
          <span class="ci-label">${esc(ci.label)}</span>
          ${ci.href
            ? `<a class="ci-value" href="${ci.href}" ${ci.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(ci.value)}</a>`
            : `<span class="ci-value">${esc(ci.value)}</span>`}
        </div>
      </div>`).join('');
    document.getElementById('contact-form-inner').innerHTML = `
      <h3 style="font-size:18px;font-weight:800;margin-bottom:22px;color:var(--ink)">${esc(c.formTitle)}</h3>
      ${c.fields.map(f => f.type === 'textarea'
        ? `<div class="form-group"><label class="form-label">${esc(f.label)}</label><textarea class="form-textarea" placeholder="${esc(f.placeholder)}" dir="${f.dir}"></textarea></div>`
        : `<div class="form-group"><label class="form-label">${esc(f.label)}</label><input class="form-input" type="${f.type}" placeholder="${esc(f.placeholder)}" dir="${f.dir}" /></div>`
      ).join('')}
      <button class="form-submit" onclick="handleSubmit(this)">${esc(c.submitBtn)}</button>`;
  }

  function renderFooter() {
    const L = LANG[currentLang];
    const f = L.footer;
    // SVG Icons for footer social links
    const socialLinks = [
      {
        title: 'Email', href: 'mailto:khamisaljedi@gmail.com',
        svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
      },
      {
        title: 'WhatsApp', href: 'https://wa.me/972592348755', target: true,
        svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.938 0C5.344 0 .017 5.325.013 11.92A11.9 11.9 0 0 0 1.6 17.94L0 24l6.224-1.632a11.92 11.92 0 0 0 5.706 1.455h.005C18.527 23.823 23.85 18.5 23.854 11.9 23.858 5.3 18.533-.004 11.938 0z"/></svg>`
      },
      {
        title: 'GitHub', href: 'https://github.com/khamisaljedi-sketch', target: true,
        svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`
      },
      {
        title: 'Behance', href: 'https://www.behance.net/khamis-aljedi', target: true,
        svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.607.41.276.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.673 1.45.673 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-.17 1.36-.5.37-1.1.64-1.77.81-.68.17-1.39.25-2.13.25H0V4.51zm-.37 5.55c.58 0 1.06-.14 1.42-.41.36-.27.54-.69.54-1.26 0-.31-.06-.57-.18-.78-.12-.2-.28-.36-.48-.49-.2-.12-.42-.2-.67-.25-.25-.04-.51-.07-.78-.07H3.27v3.26zm.16 5.79c.29 0 .57-.03.83-.08.27-.05.5-.15.7-.3.2-.14.36-.33.48-.58.12-.24.18-.55.18-.92 0-.73-.2-1.25-.6-1.55-.4-.31-.93-.46-1.6-.46H3.27v3.89zm9.14-1.94c.19.28.47.51.82.67.36.16.73.24 1.12.24.42 0 .79-.1 1.1-.3.31-.2.49-.48.54-.84h2.08c-.34 1.07-.87 1.84-1.57 2.29-.7.45-1.55.67-2.54.67-.69 0-1.31-.11-1.87-.34-.56-.22-1.04-.54-1.43-.95-.39-.4-.69-.88-.9-1.44-.21-.55-.32-1.15-.32-1.8 0-.63.11-1.22.32-1.76.22-.54.52-1.01.92-1.4.39-.4.87-.71 1.43-.94.55-.22 1.17-.34 1.85-.34.75 0 1.41.14 1.97.43.56.29 1.02.68 1.38 1.17.36.49.62 1.05.78 1.67.16.62.21 1.27.14 1.97zm3.16-2.56c-.16-.25-.38-.46-.65-.62-.27-.16-.57-.24-.9-.24-.36 0-.67.07-.93.22-.26.14-.47.33-.63.57-.16.23-.27.49-.33.77-.06.28-.09.57-.09.86h3.89c-.06-.61-.2-1.11-.36-1.56zm1.44-6.9h-5.3v1.46h5.3V4.52z"/></svg>`
      },
      {
        title: 'Facebook', href: 'https://www.facebook.com/khamisnedal', target: true,
        svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
      },
      {
        title: 'LinkedIn', href: 'https://www.linkedin.com/in/khamisaljedi', target: true,
        svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
      }
    ];

    document.getElementById('footer-content').innerHTML = `
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="images/logo.png" alt="KJ Logo" class="footer-logo-img" />
            <span class="footer-logo-name">Khamis Al Jedi</span>
          </div>
          <p class="footer-bio">${esc(f.bio)}</p>
          <div class="footer-socials">
            ${socialLinks.map(s => `
              <a class="footer-social" href="${s.href}" ${s.target ? 'target="_blank" rel="noopener"' : ''} title="${s.title}" aria-label="${s.title}">
                ${s.svg}
              </a>`).join('')}
          </div>
        </div>
        ${f.cols.map(col => `
          <div>
            <div class="footer-col-title">${esc(col.title)}</div>
            <div class="footer-col-links">
              ${col.links.map(l => `<a href="${l.h}" onclick="scrollToSection('${l.h.replace('#','')}');return false;">${esc(l.t)}</a>`).join('')}
            </div>
          </div>`).join('')}
        <div>
          <div class="footer-col-title">${esc(f.contactTitle)}</div>
          <div class="footer-contact-item">
            <div class="fci-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div class="fci-text"><a href="mailto:khamisaljedi@gmail.com">khamisaljedi@gmail.com</a></div>
          </div>
          <div class="footer-contact-item">
            <div class="fci-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,.6)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.938 0C5.344 0 .017 5.325.013 11.92A11.9 11.9 0 0 0 1.6 17.94L0 24l6.224-1.632a11.92 11.92 0 0 0 5.706 1.455h.005C18.527 23.823 23.85 18.5 23.854 11.9 23.858 5.3 18.533-.004 11.938 0z"/></svg>
            </div>
            <div class="fci-text"><a href="https://wa.me/972592348755" target="_blank">+972592348755</a></div>
          </div>
          <div class="footer-contact-item">
            <div class="fci-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="fci-text">${currentLang === 'ar' ? 'البريج، غزة — فلسطين 🇵🇸' : 'Al-Bureij, Gaza — Palestine 🇵🇸'}</div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">${esc(f.copy)}</div>
        <div class="footer-made">${f.made}</div>
        <div class="footer-bottom-links">
          <a href="#hero" onclick="scrollToSection('hero');return false;">${currentLang === 'ar' ? 'للأعلى ↑' : 'Back to Top ↑'}</a>
          <a href="mailto:khamisaljedi@gmail.com">${currentLang === 'ar' ? 'تواصل معي' : 'Contact'}</a>
        </div>
      </div>`;
  }

  /* ─────────────────────────────── RENDER ALL ─────────────────────────────── */
  function renderAll() {
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    renderCertificates();
    renderContact();
    renderFooter();
    // Re-bind after render
    setTimeout(() => {
      bindReveal();
      applyTilt('.project-card');
      applyTilt('.skill-card');
      // rebind cursor hover
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
      });
      // rebind page transitions
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
          const href = a.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          overlay.classList.add('entering');
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'instant' });
            overlay.classList.remove('entering');
            overlay.classList.add('leaving');
            setTimeout(() => overlay.classList.remove('leaving'), 600);
          }, 380);
        });
      });
    }, 50);
  }

  /* ─────────────────────────────── SCROLL INDICATOR ─────────────────────────────── */
  function addScrollIndicator() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const ind = document.createElement('div');
    ind.className = 'scroll-indicator';
    ind.innerHTML = `<span>SCROLL</span><div class="scroll-arrow">↓</div>`;
    hero.appendChild(ind);
    // Hide on scroll
    window.addEventListener('scroll', () => {
      ind.style.opacity = window.scrollY > 100 ? '0' : '1';
    });
  }

  /* ─────────────────────────────── INIT ─────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    addScrollIndicator();
    updateProgress();
  });

})();
