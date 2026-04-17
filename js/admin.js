/* ═══════════════════════════════════════════════════
   KHAMIS AL JEDI — PORTFOLIO JS
   admin.js — Admin Panel + EmailJS Integration
   ═══════════════════════════════════════════════════

   ⚙️ EmailJS Setup (مجاني):
   1. اذهب إلى emailjs.com وأنشئ حساباً مجانياً
   2. أضف خدمة Gmail وانسخ Service ID
   3. أنشئ Template وانسخ Template ID
   4. انسخ Public Key من Account > API Keys
   5. ضع القيم في EMAILJS_CONFIG أدناه
   ═══════════════════════════════════════════════════ */

/* ── EMAILJS CONFIGURATION ── */
const EMAILJS_CONFIG = {
  publicKey:  'YOUR_PUBLIC_KEY',    // ← ضع Public Key هنا
  serviceId:  'YOUR_SERVICE_ID',   // ← ضع Service ID هنا
  templateId: 'YOUR_TEMPLATE_ID',  // ← ضع Template ID هنا
  toEmail:    'khamisaljedi@gmail.com'
};

/* ── ADMIN STATE ── */
let adminStarVal    = 4;
let adminColorVal   = 'blue';
let adminExtraProjects = [];

/* ── LOAD SAVED PROJECTS FROM LOCALSTORAGE ── */
(function loadSavedProjects() {
  try {
    const saved = localStorage.getItem('kj_extra_projects');
    if (saved) {
      adminExtraProjects = JSON.parse(saved);
      // Push into global PROJECTS_DATA
      adminExtraProjects.forEach(p => {
        if (!window.PORTFOLIO.PROJECTS_DATA.find(x => x.slug === p.slug)) {
          window.PORTFOLIO.PROJECTS_DATA.push(p);
        }
      });
    }
  } catch (e) { console.warn('Could not load saved projects:', e); }
})();

/* ── INIT EMAILJS ── */
(function initEmail() {
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }
})();

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type = 'info', duration = 4000) {
  const toast   = document.getElementById('email-toast');
  const msgEl   = document.getElementById('email-toast-msg');
  const iconEl  = document.getElementById('email-toast-icon');
  const icons   = { success: '✅', error: '❌', info: '📧', warning: '⚠️' };
  toast.className = '';
  toast.classList.add('show', type);
  msgEl.textContent  = msg;
  iconEl.textContent = icons[type] || '📧';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── CONTACT FORM SUBMIT (EmailJS) ── */
window.handleSubmit = function (btn) {
  const form    = btn.closest('.contact-form') || btn.parentElement;
  const inputs  = form.querySelectorAll('.form-input, .form-textarea');
  const vals    = {};
  inputs.forEach((inp, i) => { vals['field_' + i] = inp.value; });

  const name    = inputs[0]?.value?.trim() || '';
  const email   = inputs[1]?.value?.trim() || '';
  const subject = inputs[2]?.value?.trim() || '';
  const message = inputs[3]?.value?.trim() || '';

  // Validate
  if (!name || !email || !message) {
    showToast('⚠️ يرجى ملء جميع الحقول المطلوبة', 'warning');
    return;
  }
  if (!email.includes('@')) {
    showToast('⚠️ يرجى إدخال بريد إلكتروني صحيح', 'warning');
    return;
  }

  btn.textContent = '⏳ جاري الإرسال...';
  btn.disabled = true;
  showToast('⏳ جاري إرسال رسالتك...', 'info', 8000);

  // EmailJS send
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      from_name:    name,
      from_email:   email,
      subject:      subject || 'رسالة من الموقع',
      message:      message,
      to_email:     EMAILJS_CONFIG.toEmail,
      reply_to:     email,
    }).then(() => {
      showToast('✅ تم إرسال رسالتك بنجاح! سأرد عليك خلال 24 ساعة', 'success', 5000);
      btn.textContent = '✅ تم الإرسال!';
      btn.classList.add('success');
      // Clear fields
      inputs.forEach(inp => { inp.value = ''; });
      setTimeout(() => {
        const L = window.PORTFOLIO.LANG[window._currentLang || 'ar'];
        btn.textContent = L.contact.submitBtn;
        btn.classList.remove('success');
        btn.disabled = false;
      }, 4000);
    }).catch(err => {
      console.error('EmailJS error:', err);
      showToast('❌ فشل الإرسال، جرب مرة أخرى أو تواصل مباشرة عبر الواتساب', 'error', 6000);
      btn.textContent = '❌ فشل الإرسال';
      btn.disabled = false;
    });
  } else {
    // Fallback: mailto link
    const mailtoLink = `mailto:${EMAILJS_CONFIG.toEmail}?subject=${encodeURIComponent(subject || 'رسالة من الموقع')}&body=${encodeURIComponent('من: ' + name + '\nالبريد: ' + email + '\n\n' + message)}`;
    window.location.href = mailtoLink;
    showToast('📧 سيتم فتح تطبيق البريد الإلكتروني', 'info');
    btn.textContent = '📧 فتح البريد';
    setTimeout(() => {
      const L = window.PORTFOLIO.LANG[window._currentLang || 'ar'];
      btn.textContent = L.contact.submitBtn;
      btn.disabled = false;
    }, 3000);
  }
};

/* ── ADMIN PANEL TOGGLE ── */
window.toggleAdmin = function () {
  document.getElementById('admin-panel').classList.toggle('open');
  document.getElementById('admin-overlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('admin-panel').classList.contains('open') ? 'hidden' : '';
  renderAdminList();
};
window.closeAdmin = function () {
  document.getElementById('admin-panel').classList.remove('open');
  document.getElementById('admin-overlay').classList.remove('open');
  document.body.style.overflow = '';
};

/* ── STARS SELECTOR ── */
window.setStars = function (n) {
  adminStarVal = n;
  document.querySelectorAll('#ap-stars .admin-star-btn').forEach(btn => {
    btn.classList.toggle('lit', +btn.dataset.v <= n);
  });
};

/* ── COLOR SELECTOR ── */
window.selectColor = function (color, el) {
  adminColorVal = color;
  document.querySelectorAll('.admin-color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
};

/* ── ADD PROJECT ── */
window.adminAddProject = function () {
  const nameAr = document.getElementById('ap-name-ar').value.trim();
  const nameEn = document.getElementById('ap-name-en').value.trim();
  const descAr = document.getElementById('ap-desc-ar').value.trim();
  const descEn = document.getElementById('ap-desc-en').value.trim();
  const url    = document.getElementById('ap-url').value.trim();
  const techRaw = document.getElementById('ap-tech').value.trim();
  const typeAr = document.getElementById('ap-type-ar').value;
  const emoji  = document.getElementById('ap-emoji').value.trim() || '🌐';

  if (!nameAr || !url) {
    showToast('⚠️ يرجى إدخال اسم المشروع والرابط على الأقل', 'warning');
    return;
  }

  const slug = 'custom-' + Date.now();
  const newProject = {
    id:     String(window.PORTFOLIO.PROJECTS_DATA.length + 1).padStart(2, '0'),
    slug,
    nameAr: nameAr || nameEn,
    nameEn: nameEn || nameAr,
    descAr: descAr || descEn || 'مشروع مميز',
    descEn: descEn || descAr || 'A great project',
    tech:   techRaw ? techRaw.split(',').map(t => t.trim()).filter(Boolean) : ['HTML', 'CSS', 'JS'],
    typeAr,
    typeEn: typeAr,
    color:  adminColorVal,
    emoji,
    stars:  adminStarVal,
    url:    url.startsWith('http') ? url : 'https://' + url
  };

  // Add to global data
  window.PORTFOLIO.PROJECTS_DATA.push(newProject);
  adminExtraProjects.push(newProject);

  // Save to localStorage
  try {
    localStorage.setItem('kj_extra_projects', JSON.stringify(adminExtraProjects));
  } catch (e) { }

  // Re-render projects section
  if (typeof renderProjects === 'function') renderProjects();

  // Success feedback
  const btn = document.getElementById('admin-add-btn');
  btn.textContent = '✅ تمت الإضافة بنجاح!';
  btn.classList.add('success');
  setTimeout(() => { btn.textContent = '➕ إضافة المشروع للموقع'; btn.classList.remove('success'); }, 2500);

  // Clear form
  ['ap-name-ar','ap-name-en','ap-desc-ar','ap-desc-en','ap-url','ap-tech','ap-emoji'].forEach(id => {
    document.getElementById(id).value = '';
  });
  setStars(4);

  // Update admin list and export code
  renderAdminList();
  updateExportCode();
  showToast('✅ تم إضافة "' + nameAr + '" بنجاح!', 'success');
};

/* ── DELETE PROJECT ── */
window.adminDeleteProject = function (slug) {
  window.PORTFOLIO.PROJECTS_DATA = window.PORTFOLIO.PROJECTS_DATA.filter(p => p.slug !== slug);
  adminExtraProjects = adminExtraProjects.filter(p => p.slug !== slug);
  try {
    localStorage.setItem('kj_extra_projects', JSON.stringify(adminExtraProjects));
  } catch (e) { }
  if (typeof renderProjects === 'function') renderProjects();
  renderAdminList();
  updateExportCode();
  showToast('🗑 تم حذف المشروع', 'info', 2500);
};

/* ── RENDER ADMIN PROJECTS LIST ── */
function renderAdminList() {
  const list = document.getElementById('admin-projects-list');
  if (!list) return;
  list.innerHTML = window.PORTFOLIO.PROJECTS_DATA.map(p => `
    <div class="admin-proj-item">
      <span class="admin-proj-emoji">${p.emoji}</span>
      <span class="admin-proj-name">${p.nameAr}</span>
      ${adminExtraProjects.find(x => x.slug === p.slug)
        ? `<button class="admin-proj-del" onclick="adminDeleteProject('${p.slug}')" title="حذف">🗑</button>`
        : '<span style="font-size:10px;color:var(--ink3);padding:2px 6px;">مدمج</span>'
      }
    </div>`).join('');
}

/* ── EXPORT CODE ── */
function updateExportCode() {
  const codeArea = document.getElementById('admin-export-code');
  if (!codeArea || !adminExtraProjects.length) return;
  codeArea.value = adminExtraProjects.map(p =>
    `// ── مشروع: ${p.nameAr}\n` +
    `{\n` +
    `  id: '${p.id}', slug: '${p.slug}',\n` +
    `  nameAr: '${p.nameAr}', nameEn: '${p.nameEn}',\n` +
    `  descAr: '${p.descAr}',\n` +
    `  descEn: '${p.descEn}',\n` +
    `  tech: ${JSON.stringify(p.tech)},\n` +
    `  typeAr: '${p.typeAr}', typeEn: '${p.typeEn}',\n` +
    `  color: '${p.color}', emoji: '${p.emoji}',\n` +
    `  stars: ${p.stars}, url: '${p.url}'\n` +
    `}`
  ).join(',\n\n');
}

window.copyExportCode = function () {
  const area = document.getElementById('admin-export-code');
  if (!area?.value) {
    showToast('ℹ️ لا يوجد مشاريع جديدة للتصدير بعد', 'info');
    return;
  }
  navigator.clipboard.writeText(area.value).then(() => {
    showToast('✅ تم نسخ الكود — الصقه في js/main.js', 'success');
  }).catch(() => {
    area.select(); document.execCommand('copy');
    showToast('✅ تم النسخ!', 'success');
  });
};

/* ── EXPOSE renderProjects globally ── */
// Overridden after app.js loads
window._currentLang = 'ar';
