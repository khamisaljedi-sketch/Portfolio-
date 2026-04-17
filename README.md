# 🌐 Khamis Al Jedi — Portfolio Website

## 📁 هيكل المجلدات / Folder Structure

```
portfolio/
├── index.html          ← الصفحة الرئيسية (ارفع هذه على GitHub)
├── README.md           ← هذا الملف
│
├── css/
│   ├── style.css       ← المتغيرات + الأساس + Navbar + Footer
│   ├── sections.css    ← أقسام الصفحة (Hero, About, Skills...)
│   └── animations.css  ← كل الحركات والأنيميشن
│
├── js/
│   ├── main.js         ← البيانات (المشاريع، الخبرات، الشهادات)
│   └── app.js          ← المنطق + عرض المحتوى + الانيميشن
│
└── images/
    ├── profile.png     ← صورتك الشخصية
    └── logo.png        ← شعارك KJ
```

---

## ➕ إضافة مشروع جديد

افتح `js/main.js` وابحث عن `PROJECTS_DATA` ثم أضف في نهاية المصفوفة:

```javascript
{
  id: '10',                          // رقم تسلسلي
  slug: 'my-new-project',            // اسم مختصر بدون مسافات
  nameAr: 'اسم المشروع بالعربية',
  nameEn: 'Project Name in English',
  descAr: 'وصف المشروع بالعربية',
  descEn: 'Project description in English',
  tech: ['HTML', 'CSS', 'JavaScript'],
  typeAr: 'Portfolio',               // النوع بالعربية
  typeEn: 'Portfolio',               // النوع بالإنجليزية
  color: 'blue',   // blue | teal | amber | rose | purple | green
  emoji: '🌐',
  stars: 5,        // من 1 إلى 5
  url: 'https://yourusername.github.io/your-repo/'
}
```

---

## 🚀 النشر على GitHub Pages

1. أنشئ مستودع جديد على GitHub
2. ارفع **كل محتوى مجلد `portfolio/`** (ليس المجلد نفسه)
3. اذهب إلى: Settings → Pages → Branch: main → Save
4. موقعك سيكون على: `https://yourusername.github.io/repo-name/`

---

## 🌍 تبديل اللغة

الموقع يدعم **العربية والإنجليزية** — اضغط على AR/EN في الناف بار.
لتعديل الترجمات: افتح `js/main.js` وعدّل كائني `LANG.ar` و `LANG.en`.

---

## 📧 تغيير معلومات التواصل

في `js/main.js` ابحث عن `contacts:` داخل `LANG.ar.contact` و `LANG.en.contact`.

---

Made with ❤️ from Gaza to the World 🇵🇸
