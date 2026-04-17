# 📧 إعداد EmailJS — تفعيل الإيميل

## الخطوات (مجاني 100%)

### 1. إنشاء حساب
- اذهب إلى: https://www.emailjs.com
- اضغط **Sign Up** وأنشئ حساباً مجانياً
- (الحساب المجاني: 200 رسالة/شهر)

---

### 2. إضافة خدمة Gmail
- في لوحة التحكم اضغط **Email Services**
- اضغط **Add New Service**
- اختر **Gmail**
- سجّل الدخول بـ `khamisaljedi@gmail.com`
- احفظ وانسخ الـ **Service ID** (مثال: `service_abc123`)

---

### 3. إنشاء Template
- اضغط **Email Templates**
- اضغط **Create New Template**
- في حقل **To email**: `{{to_email}}`
- في حقل **Subject**: `رسالة جديدة من {{from_name}}: {{subject}}`
- في حقل **Content**:
```
اسم المرسل: {{from_name}}
البريد: {{from_email}}

الرسالة:
{{message}}
```
- احفظ وانسخ الـ **Template ID** (مثال: `template_xyz789`)

---

### 4. الحصول على Public Key
- اذهب إلى **Account** (أيقونة المستخدم أعلى اليمين)
- اضغط **API Keys**
- انسخ الـ **Public Key** (مثال: `user_AbCdEfGhIjK`)

---

### 5. إضافة القيم في الكود

افتح ملف `js/admin.js` وعدّل هذه الأسطر:

```javascript
const EMAILJS_CONFIG = {
  publicKey:  'user_AbCdEfGhIjK',     // ← ضع Public Key هنا
  serviceId:  'service_abc123',        // ← ضع Service ID هنا
  templateId: 'template_xyz789',       // ← ضع Template ID هنا
  toEmail:    'khamisaljedi@gmail.com' // ← بريدك (لا تغيره)
};
```

---

### ✅ جاهز!
الآن عندما يملأ أي زائر النموذج ويضغط إرسال، ستصلك الرسالة مباشرة على **khamisaljedi@gmail.com**

---

### ⚠️ ملاحظة مهمة
إذا لم تُعدّ EmailJS بعد، سيفتح الموقع تطبيق البريد الإلكتروني (mailto) كبديل تلقائي.
