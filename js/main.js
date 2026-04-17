/* ═══════════════════════════════════════════════════
   KHAMIS AL JEDI — PORTFOLIO JS
   main.js — Data & Language Content
   ═══════════════════════════════════════════════════ */

/* ── BILINGUAL CONTENT ── */
const LANG = {
  ar: {
    dir: 'rtl', lang: 'ar',
    nav: {
      about: 'من أنا', skills: 'المهارات', projects: 'المشاريع',
      experience: 'الخبرات', certificates: 'الشهادات', contact: 'تواصل'
    },
    hero: {
      badge: 'متاح للمشاريع الجديدة — غزة، فلسطين 🇵🇸',
      nameAr: 'خميس نضال',
      nameLast: 'الجدي',
      nameEn: 'Khamis Nedal Al Jedi',
      subtitle: 'Multimedia Developer & Creative Designer',
      desc: 'خريج تكنولوجيا المعلومات - وسائط متعددة من الجامعة الإسلامية بغزة. أجمع بين إبداع التصميم وقوة البرمجة لأبني تجارب رقمية لا تُنسى. أصنع من غزة للعالم.',
      cta1: 'استعرض أعمالي', cta2: 'تواصل معي',
      stats: [
        { num: 9,  lbl: 'مشروع منشور' },
        { num: 3,  lbl: 'سنوات خبرة' },
        { num: 10, lbl: 'شهادة وجائزة' },
        { num: 94, lbl: 'تقييم التدريب %' }
      ],
      available: 'متاح للعمل الآن', availableSub: 'رد خلال 24 ساعة',
      yearsExp: 'سنة خبرة'
    },
    about: {
      label: 'من أنا', title: 'مبدع رقمي\nمن فلسطين',
      text1: 'خميس نضال الجدي — خريج بكالوريوس تكنولوجيا المعلومات تخصص وسائط متعددة من الجامعة الإسلامية بغزة بتقدير ممتاز (94%). أعمل محرر فيديو في جمعية الصلاح الخيرية، ومسؤول دعم إدارة مشاريع في قسم تكنولوجيا المعلومات بالجامعة.',
      text2: 'أتقن مزج الإبداع مع التقنية — من تصميم الهويات البصرية إلى تطوير المواقع، ومن المونتاج الاحترافي إلى الموشن جرافيك. أؤمن أن كل مشروع رقمي هو رسالة، وهدفي أن تكون رسالتك واضحة وقوية.',
      expBadge: 'سنوات خبرة',
      fields: [
        { lbl: 'الاسم',       val: 'خميس نضال الجدي' },
        { lbl: 'الموقع',      val: 'البريج، غزة 🇵🇸' },
        { lbl: 'البريد',      val: 'khamisaljedi@gmail.com' },
        { lbl: 'التخصص',     val: 'Multimedia & IT' },
        { lbl: 'الهاتف',      val: '+972592348755' },
        { lbl: 'متاح للعمل', val: '✅ نعم', green: true }
      ]
    },
    skills: {
      label: 'المهارات', title: 'ترسانتي التقنية',
      sub: 'أتقن مجموعة واسعة من الأدوات الإبداعية والتقنية لتقديم أفضل النتائج',
      cards: [
        { icon: '🎨', title: 'التصميم الجرافيكي', color: 'blue', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Brand Identity', 'UI/UX Design', 'Typography'] },
        { icon: '🎬', title: 'تحرير الفيديو والموشن', color: 'amber', items: ['Adobe Premiere Pro', 'After Effects', 'Motion Graphics', 'Color Grading', 'Storytelling', 'Transitions'] },
        { icon: '💻', title: 'تطوير الويب', color: 'teal', items: ['HTML5 / CSS3', 'JavaScript', 'Bootstrap', 'WordPress', 'Git / GitHub', 'Responsive Design'] },
        { icon: '📱', title: 'الإعلام الرقمي', color: 'purple', items: ['Digital Marketing', 'Social Media Design', 'Content Creation', 'Digital Photography', 'SEO Basics'] },
        { icon: '⚙️', title: 'الإنتاجية والإدارة', color: 'rose', items: ['Microsoft Office', 'Google Drive', 'Notion / Trello', 'Asana', 'Project Management'] },
        { icon: '🌐', title: 'اللغات', color: 'green', items: ['العربية — أصلية', 'English — جيد', 'Turkish — A1'] }
      ]
    },
    projects: {
      label: 'المشاريع', title: 'أعمال أعتز بها',
      sub: 'مجموعة مختارة من أبرز مشاريعي في التطوير والتصميم',
      filters: ['الكل', 'Portfolio', 'E-Commerce', 'Healthcare', 'App', 'Corporate'],
      viewBtn: 'فتح المشروع ↗', linkBtn: 'معاينة →'
    },
    experience: {
      label: 'الخبرة المهنية', title: 'مسيرتي العملية',
      sub: 'خبرات حقيقية في بيئات مهنية متنوعة'
    },
    education: {
      label: 'التعليم', title: 'المؤهل الأكاديمي',
      sub: 'أساس أكاديمي متين يدعم كل عمل إبداعي'
    },
    certificates: {
      label: 'الشهادات والجوائز', title: 'إنجازاتي وشهاداتي',
      sub: 'شهادات معتمدة وجوائز تعكس الالتزام بالتميز'
    },
    contact: {
      label: 'تواصل', title: 'لنبدأ مشروعك',
      sub: 'هل لديك فكرة أو مشروع؟ أنا هنا للمساعدة — رد خلال 24 ساعة',
      formTitle: 'أرسل رسالة',
      fields: [
        { label: 'اسمك', placeholder: 'محمد أحمد', type: 'text', dir: 'rtl' },
        { label: 'بريدك الإلكتروني', placeholder: 'you@example.com', type: 'email', dir: 'ltr' },
        { label: 'موضوع الرسالة', placeholder: 'مشروع تصميم / تحرير فيديو...', type: 'text', dir: 'rtl' },
        { label: 'رسالتك', placeholder: 'أخبرني عن مشروعك...', type: 'textarea', dir: 'rtl' }
      ],
      submitBtn: 'إرسال الرسالة ✉', successMsg: '✅ تم الإرسال بنجاح!',
      contacts: [
        { icon: '📧', label: 'البريد الإلكتروني', value: 'khamisaljedi@gmail.com', href: 'mailto:khamisaljedi@gmail.com', color: 'blue' },
        { icon: '📱', label: 'الهاتف / واتساب', value: '+972592348755', href: 'https://wa.me/972592348755', color: 'teal' },
        { icon: '🐙', label: 'GitHub', value: 'github.com/khamisaljedi-sketch', href: 'https://github.com/khamisaljedi-sketch', color: 'amber' },
        { icon: '🎨', label: 'Behance', value: 'behance.net/khamis-aljedi', href: 'https://www.behance.net/khamis-aljedi', color: 'rose' },
        { icon: '👤', label: 'Facebook', value: 'facebook.com/khamisnedal', href: 'https://www.facebook.com/khamisnedal', color: 'purple' },
        { icon: '📍', label: 'الموقع', value: 'البريج، غزة — فلسطين 🇵🇸', href: null, color: 'green' }
      ]
    },
    footer: {
      bio: 'مطور ومصمم وسائط متعددة من غزة، فلسطين. أبني تجارب رقمية تجمع بين الإبداع والتقنية.',
      cols: [
        { title: 'روابط سريعة', links: [{t:'من أنا',h:'#about'},{t:'المهارات',h:'#skills'},{t:'المشاريع',h:'#projects'},{t:'الخبرات',h:'#experience'},{t:'الشهادات',h:'#certificates'}] },
        { title: 'الخدمات', links: [{t:'تصميم UI/UX',h:'#contact'},{t:'تطوير مواقع',h:'#contact'},{t:'تحرير فيديو',h:'#contact'},{t:'موشن جرافيك',h:'#contact'},{t:'هوية بصرية',h:'#contact'}] }
      ],
      contactTitle: 'للتواصل',
      copy: '© 2026 خميس نضال الجدي — NexaCode · جميع الحقوق محفوظة',
      made: 'صُنع بـ ❤️ من غزة للعالم'
    }
  },
  en: {
    dir: 'ltr', lang: 'en',
    nav: {
      about: 'About', skills: 'Skills', projects: 'Projects',
      experience: 'Experience', certificates: 'Certificates', contact: 'Contact'
    },
    hero: {
      badge: 'Available for New Projects — Gaza, Palestine 🇵🇸',
      nameAr: 'Khamis',
      nameLast: 'Al Jedi',
      nameEn: 'خميس نضال الجدي',
      subtitle: 'Multimedia Developer & Creative Designer',
      desc: 'IT-Multimedia graduate from the Islamic University of Gaza. I combine creative design with technical development to build unforgettable digital experiences. Crafting from Gaza for the World.',
      cta1: 'View My Work', cta2: 'Get In Touch',
      stats: [
        { num: 9,  lbl: 'Published Projects' },
        { num: 3,  lbl: 'Years Experience' },
        { num: 10, lbl: 'Certificates' },
        { num: 94, lbl: 'Training Score %' }
      ],
      available: 'Available for Work', availableSub: 'Reply within 24hrs',
      yearsExp: 'Years Exp.'
    },
    about: {
      label: 'About Me', title: 'Creative Digital\nProfessional',
      text1: 'Khamis Nedal Al Jedi — Bachelor\'s graduate in IT-Multimedia from the Islamic University of Gaza with an Excellent grade (94%). Currently working as a Video Editor at Al-Salah Charity Association and Project Management Support Officer at IUG\'s IT Department.',
      text2: 'I master the blend of creativity and technology — from visual identity design to web development, from professional video editing to motion graphics. I believe every digital project is a message, and my goal is to make your message clear and powerful.',
      expBadge: 'Years Experience',
      fields: [
        { lbl: 'Name',       val: 'Khamis Nedal Al Jedi' },
        { lbl: 'Location',   val: 'Al-Bureij, Gaza 🇵🇸' },
        { lbl: 'Email',      val: 'khamisaljedi@gmail.com' },
        { lbl: 'Major',      val: 'Multimedia & IT' },
        { lbl: 'Phone',      val: '+972592348755' },
        { lbl: 'Available',  val: '✅ Yes', green: true }
      ]
    },
    skills: {
      label: 'Skills', title: 'My Tech Arsenal',
      sub: 'A wide range of creative and technical tools to deliver exceptional results',
      cards: [
        { icon: '🎨', title: 'Graphic Design', color: 'blue', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Brand Identity', 'UI/UX Design', 'Typography'] },
        { icon: '🎬', title: 'Video & Motion', color: 'amber', items: ['Adobe Premiere Pro', 'After Effects', 'Motion Graphics', 'Color Grading', 'Storytelling', 'Transitions'] },
        { icon: '💻', title: 'Web Development', color: 'teal', items: ['HTML5 / CSS3', 'JavaScript', 'Bootstrap', 'WordPress', 'Git / GitHub', 'Responsive Design'] },
        { icon: '📱', title: 'Digital Media', color: 'purple', items: ['Digital Marketing', 'Social Media Design', 'Content Creation', 'Digital Photography', 'SEO Basics'] },
        { icon: '⚙️', title: 'Productivity', color: 'rose', items: ['Microsoft Office', 'Google Drive', 'Notion / Trello', 'Asana', 'Project Management'] },
        { icon: '🌐', title: 'Languages', color: 'green', items: ['Arabic — Native', 'English — Good', 'Turkish — A1'] }
      ]
    },
    projects: {
      label: 'Projects', title: 'Work I\'m Proud Of',
      sub: 'A curated selection of my best development and design projects',
      filters: ['All', 'Portfolio', 'E-Commerce', 'Healthcare', 'App', 'Corporate'],
      viewBtn: 'Open Project ↗', linkBtn: 'Preview →'
    },
    experience: {
      label: 'Experience', title: 'My Professional Journey',
      sub: 'Real experience in diverse professional environments'
    },
    education: {
      label: 'Education', title: 'Academic Background',
      sub: 'A strong academic foundation supporting every creative endeavor'
    },
    certificates: {
      label: 'Certificates & Awards', title: 'My Achievements',
      sub: 'Recognized certifications and awards reflecting commitment to excellence'
    },
    contact: {
      label: 'Contact', title: 'Let\'s Start Your Project',
      sub: 'Have an idea or project? I\'m here to help — reply within 24 hours',
      formTitle: 'Send a Message',
      fields: [
        { label: 'Your Name', placeholder: 'John Smith', type: 'text', dir: 'ltr' },
        { label: 'Email Address', placeholder: 'you@example.com', type: 'email', dir: 'ltr' },
        { label: 'Subject', placeholder: 'Design project / Video editing...', type: 'text', dir: 'ltr' },
        { label: 'Your Message', placeholder: 'Tell me about your project...', type: 'textarea', dir: 'ltr' }
      ],
      submitBtn: 'Send Message ✉', successMsg: '✅ Message Sent Successfully!',
      contacts: [
        { icon: '📧', label: 'Email', value: 'khamisaljedi@gmail.com', href: 'mailto:khamisaljedi@gmail.com', color: 'blue' },
        { icon: '📱', label: 'Phone / WhatsApp', value: '+972592348755', href: 'https://wa.me/972592348755', color: 'teal' },
        { icon: '🐙', label: 'GitHub', value: 'github.com/khamisaljedi-sketch', href: 'https://github.com/khamisaljedi-sketch', color: 'amber' },
        { icon: '🎨', label: 'Behance', value: 'behance.net/khamis-aljedi', href: 'https://www.behance.net/khamis-aljedi', color: 'rose' },
        { icon: '👤', label: 'Facebook', value: 'facebook.com/khamisnedal', href: 'https://www.facebook.com/khamisnedal', color: 'purple' },
        { icon: '📍', label: 'Location', value: 'Al-Bureij, Gaza — Palestine 🇵🇸', href: null, color: 'green' }
      ]
    },
    footer: {
      bio: 'Multimedia Developer & Designer from Gaza, Palestine. Building digital experiences that merge creativity with technology.',
      cols: [
        { title: 'Quick Links', links: [{t:'About',h:'#about'},{t:'Skills',h:'#skills'},{t:'Projects',h:'#projects'},{t:'Experience',h:'#experience'},{t:'Certificates',h:'#certificates'}] },
        { title: 'Services', links: [{t:'UI/UX Design',h:'#contact'},{t:'Web Development',h:'#contact'},{t:'Video Editing',h:'#contact'},{t:'Motion Graphics',h:'#contact'},{t:'Brand Identity',h:'#contact'}] }
      ],
      contactTitle: 'Get In Touch',
      copy: '© 2026 Khamis Nedal Al Jedi — NexaCode · All Rights Reserved',
      made: 'Made with ❤️ from Gaza to the World'
    }
  }
};

/* ── PROJECTS DATA ── */
const PROJECTS_DATA = [
  { id:'01', slug:'nexacode-portfolio',  nameAr:'NexaCode — معرض الأعمال',          nameEn:'NexaCode Portfolio',        descAr:'معرض أعمال وكالة NexaCode بهويات بصرية متكاملة وتصميم احترافي',                      descEn:'Full agency portfolio with brand identities and professional design',         tech:['HTML','CSS','JS','Animations'], typeAr:'Portfolio',         typeEn:'Portfolio',  color:'blue',   emoji:'🌐', stars:5, url:'https://khamisaljedi-sketch.github.io/my-portfolio/' },
  { id:'02', slug:'nestora',             nameAr:'NEXAS — تجارب رقمية',              nameEn:'NEXAS Digital Experiences',  descAr:"موقع شخصي مستقبلي — 'لا أصمم مواقع، أصنع عوالم رقمية'",                             descEn:"Personal futuristic website — 'I don't design websites, I craft digital worlds'", tech:['HTML','CSS','Motion Design','Scroll FX'], typeAr:'Portfolio', typeEn:'Portfolio', color:'purple', emoji:'✨', stars:5, url:'https://khamisaljedi-sketch.github.io/nestora_website/' },
  { id:'03', slug:'ecommerce-store',     nameAr:'بيت أنيق — Home Nest',            nameEn:'Home Nest — Furniture Store',descAr:'متجر إلكتروني فاخر للأثاث والديكور بتجربة تسوق استثنائية',                           descEn:'Luxury e-commerce store for furniture and decor with an exceptional shopping experience', tech:['HTML','CSS','JS','E-Commerce'], typeAr:'E-Commerce', typeEn:'E-Commerce', color:'amber', emoji:'🛒', stars:5, url:'https://khamisaljedi-sketch.github.io/ecommerce-store/' },
  { id:'04', slug:'clinic-management',   nameAr:'نظام إدارة العيادات',              nameEn:'Clinic Management System',   descAr:'نظام إدارة عيادات طبية شامل مع إدارة المرضى والمواعيد والتقارير',                    descEn:'Comprehensive clinic management system with patient records and appointments', tech:['HTML','CSS','JS','LocalStorage'], typeAr:'Healthcare', typeEn:'Healthcare', color:'teal',  emoji:'🏥', stars:4, url:'https://khamisaljedi-sketch.github.io/clinic-management-system/' },
  { id:'05', slug:'nexus-digital',       nameAr:'Nexus — تجارب رقمية متقدمة',      nameEn:'Nexus Digital Experiences',  descAr:'منصة تجارب رقمية بتصاميم جريئة ومؤثرات بصرية وتفاعل متقدم',                        descEn:'Digital experience platform with bold designs and advanced visual effects', tech:['HTML','CSS','JS','WebGL'], typeAr:'Portfolio',  typeEn:'Portfolio',  color:'rose',   emoji:'🚀', stars:5, url:'https://khamisaljedi-sketch.github.io/nexus-digital-experiences/' },
  { id:'06', slug:'medical-center',      nameAr:'موقع المركز الطبي',                nameEn:'Medical Center Website',     descAr:'موقع مركز طبي احترافي مع نظام حجز المواعيد وعرض الخدمات',                          descEn:'Professional medical center website with appointment booking and services', tech:['HTML','CSS','JS'], typeAr:'Healthcare', typeEn:'Healthcare', color:'green',  emoji:'💊', stars:4, url:'https://khamisaljedi-sketch.github.io/medical-center-website/' },
  { id:'07', slug:'taskflow',            nameAr:'TaskFlow — إدارة المهام',          nameEn:'TaskFlow — Task Manager',    descAr:'تطبيق إدارة مهام وأعمال بواجهة سلسة وتجربة مستخدم متميزة',                         descEn:'Task and project management app with smooth UI and great UX', tech:['HTML','CSS','JS','Drag&Drop'], typeAr:'App', typeEn:'App', color:'blue',   emoji:'✅', stars:4, url:'https://khamisaljedi-sketch.github.io/taskflow/' },
  { id:'08', slug:'global-website',      nameAr:'Global Website',                   nameEn:'Global Corporate Website',   descAr:'موقع تجاري عالمي متعدد اللغات بتصميم عصري ومحتوى غني',                             descEn:'Multi-language global corporate website with modern design', tech:['HTML','CSS','JS'], typeAr:'Corporate', typeEn:'Corporate', color:'teal',   emoji:'🌍', stars:4, url:'https://khamisaljedi-sketch.github.io/global-website/' },
  { id:'09', slug:'abu-khamees',         nameAr:'أبو خميس للمبيعات',               nameEn:'Abu Khamees Sales System',   descAr:'نظام مبيعات محلي بواجهة عربية كاملة وإدارة المخزون والمنتجات',                     descEn:'Local sales system with full Arabic UI and inventory management', tech:['HTML','CSS','JS','Arabic UI'], typeAr:'App', typeEn:'App', color:'amber', emoji:'🛍️', stars:4, url:'https://khamisaljedi-sketch.github.io/abu_khamees_sales/' }
];

/* ── EXPERIENCE DATA ── */
const EXPERIENCE_DATA = [
  {
    icon: '💼', dateAr: 'أغسطس 2025 — حتى الآن', dateEn: 'Aug 2025 — Present',
    titleAr: 'مسؤول دعم إدارة مشاريع', titleEn: 'Project Management Support Officer',
    companyAr: 'الجامعة الإسلامية بغزة — قسم IT', companyEn: 'Islamic University of Gaza — IT Dept.',
    pointsAr: ['تصميم وإدارة المحتوى المرئي للفعاليات الرسمية للجامعة','تحديث وصيانة المواقع المبنية على WordPress','دعم مشاريع IT من خلال التوثيق والتنسيق','المساهمة في تحسين الهوية الرقمية للجامعة'],
    pointsEn: ['Designed and managed multimedia visuals for official university events','Updated and maintained WordPress-based websites','Supported IT projects through documentation and coordination','Helped improve the university\'s digital identity']
  },
  {
    icon: '🎬', dateAr: 'فبراير 2024 — حتى الآن', dateEn: 'Feb 2024 — Present',
    titleAr: 'محرر فيديو', titleEn: 'Video Editor',
    companyAr: 'جمعية الصلاح الخيرية — غزة', companyEn: 'Al-Salah Charity Association — Gaza',
    pointsAr: ['تحرير فيديوهات ترويجية وتوعوية للبرامج الاجتماعية والإنسانية','التعاون مع الفريق الإعلامي لإنتاج محتوى إبداعي لوسائل التواصل','تحسين جودة الصوت والصورة والسرد باستخدام Premiere Pro وAfter Effects','زيادة تفاعل الجمهور من خلال الإنتاج الإبداعي المؤثر'],
    pointsEn: ['Edited promotional and awareness videos for social and humanitarian programs','Collaborated with media team to produce creative social media content','Enhanced video quality and storytelling using Premiere Pro and After Effects','Contributed to increasing audience engagement through impactful video production']
  },
  {
    icon: '🎓', dateAr: 'أغسطس 2025 — أكتوبر 2025', dateEn: 'Aug 2025 — Oct 2025',
    titleAr: 'متدرب Multimedia & IT', titleEn: 'Multimedia & IT Trainee',
    companyAr: 'الجامعة الإسلامية بغزة — قسم IT', companyEn: 'Islamic University of Gaza — IT Dept.',
    pointsAr: ['المساعدة في إنشاء محتوى متعدد الوسائط للمشاريع التعليمية','دعم مهام تحرير الفيديو والدعم التقني','تقييم ممتاز للإبداع والاحترافية (94%)'],
    pointsEn: ['Assisted in creating multimedia content for educational projects','Supported video editing and technical troubleshooting tasks','Received Excellent evaluation for creativity and professionalism (94%)']
  },
  {
    icon: '🤝', dateAr: 'أبريل 2023 — حتى الآن', dateEn: 'Apr 2023 — Present',
    titleAr: 'مصمم وسائط متعددة متطوع', titleEn: 'Volunteer Multimedia Designer',
    companyAr: 'مركز شباب المجتمع المحلي — غزة', companyEn: 'Local Youth Community Center — Gaza',
    pointsAr: ['تصميم فلايرات رقمية ومنشورات سوشيال ميديا وحملات توعية','إنتاج فيديوهات قصيرة وموشن جرافيك لمبادرات الشباب','زيادة تفاعل المجتمع من خلال المحتوى الإبداعي'],
    pointsEn: ['Designed digital flyers, social media posts, and awareness campaigns','Produced short videos and motion graphics for youth initiatives','Increased community engagement through creative visual content']
  }
];

/* ── CERTIFICATES DATA ── */
const CERTS_DATA = [
  { icon:'🏆', titleAr:'شهادة تفوق — تدريب الوسائط المتعددة', titleEn:'Certificate of Excellence — Multimedia Internship', year:'IUG · 2025', color:'amber' },
  { icon:'🎨', titleAr:'Adobe Photoshop Advanced Certification', titleEn:'Adobe Photoshop Advanced Certification', year:'2024', color:'blue' },
  { icon:'📱', titleAr:'Google Digital Marketing Certificate', titleEn:'Google Digital Marketing Certificate', year:'Google · 2024', color:'teal' },
  { icon:'🎬', titleAr:'Motion Graphics using After Effects', titleEn:'Motion Graphics using After Effects', year:'Coursera · 2024', color:'rose' },
  { icon:'💻', titleAr:'Graphic Design Bootcamp', titleEn:'Graphic Design Bootcamp', year:'Udemy · 2024', color:'purple' },
  { icon:'🌐', titleAr:'HTML, CSS & JavaScript for Beginners', titleEn:'HTML, CSS & JavaScript for Beginners', year:'Udemy · 2023', color:'blue' },
  { icon:'🎥', titleAr:'Premiere Pro Video Editing Essentials', titleEn:'Premiere Pro Video Editing Essentials', year:'2023', color:'amber' },
  { icon:'🖼️', titleAr:'Portfolio Development for Designers', titleEn:'Portfolio Development for Designers', year:'LinkedIn · 2023', color:'green' },
  { icon:'📸', titleAr:'Digital Photography Workshop', titleEn:'Digital Photography Workshop', year:'IUG · 2023', color:'teal' },
  { icon:'🥈', titleAr:'المركز الثاني — مسابقة التصميم الإبداعي', titleEn:'2nd Place — Creative Design Competition', year:'IUG · 2023', color:'rose' },
  { icon:'🏅', titleAr:'جائزة المتطوع المتميز', titleEn:'Outstanding Volunteer Award', year:'IUG · 2022', color:'purple' },
  { icon:'🖥️', titleAr:'ICDL — رخصة قيادة الحاسب الدولية', titleEn:'ICDL — International Computer Driving License', year:'2022', color:'blue' }
];

const COLOR_MAP = {
  blue:   { bg:'var(--blue-ll)',   txt:'var(--blue)' },
  teal:   { bg:'var(--teal-l)',    txt:'var(--teal)' },
  amber:  { bg:'var(--amber-l)',   txt:'var(--amber)' },
  rose:   { bg:'var(--rose-l)',    txt:'var(--rose)' },
  purple: { bg:'var(--purple-l)', txt:'var(--purple)' },
  green:  { bg:'var(--green-l)',   txt:'var(--green)' },
  orange: { bg:'var(--orange-l)',  txt:'var(--orange)' }
};

window.PORTFOLIO = { LANG, PROJECTS_DATA, EXPERIENCE_DATA, CERTS_DATA, COLOR_MAP };
