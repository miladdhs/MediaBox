UploadModal.vue
معرفی
کامپوننت `UploadModal` یک مودال مدیریت آپلود است که امکان انتخاب چندین فایل، پیش‌نمایش تصویر/ویدیو، زوم، چرخش، پیمایش بین فایل‌ها، حذف، و تأیید را فراهم می‌کند. این کامپوننت کنترل‌شده است و وضعیت باز/بسته و لیست فایل‌ها از طریق `v-model`‌ها مدیریت می‌شود.

ویژگی‌ها
- **انتخاب چند فایل**
- **پیش‌نمایش** برای تصویر و ویدیو با زوم/چرخش/Drag
- **لیست بندانگشتی** برای جابه‌جایی سریع بین فایل‌ها
- **حذف فایل جاری** و **پاک‌سازی همه** پس از تأیید
- **قابل تمing** از طریق شیء `theme` (CSS Variables)

نصب و استفاده سریع
1) نصب آیکن‌ها (در صورت نیاز):
```bash
npm i @ant-design/icons-vue
```
2) استفاده در یک صفحه:
```vue
<template>
  <button @click="isOpen = true">آپلود</button>
  <UploadModal
    :isOpen="isOpen"
    :selectedFiles="files"
    :allowedExtensions="'jpg,jpeg,png,mp4'"
    :maxFileSizeMB="10"
    :theme="theme"
    @update:isOpen="v => isOpen = v"
    @update:selectedFiles="v => files = v"
    @file-error="onError"
    @files-passed="onAdded"
  />
  <ul>
    <li v-for="f in files" :key="f.name">{{ f.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UploadModal from './UploadModal.vue';

const isOpen = ref(false);
const files = ref<File[]>([]);
const theme = { primary: '#22c55e' };
function onError(message: string){ alert(message); }
function onAdded(added: File[]){ console.log('added', added); }
</script>
```

API
Props
- **isOpen: boolean (الزامی)**: وضعیت باز/بسته مودال.
- **selectedFiles?: File[]**: لیست فایل‌ها.
- **allowedExtensions?: string | string[]**: پسوندهای مجاز.
- **allowedTypes?: 'image' | 'video' | Array<'image' | 'video'>**: نوع فایل‌های مجاز.
- **maxFileSizeMB?: number (پیش‌فرض: 10)**: حداکثر حجم هر فایل بر حسب مگابایت.
- **theme?: { primary, onPrimary, surface, text, border, overlay, canvas, danger }**: سفارشی‌سازی رنگ‌ها.

Emits
- **update:isOpen (boolean)**
- **update:selectedFiles (File[])**
- **file-error (string)**
- **files-passed (File[])**

رفتار و قوانین
- **اولویت فیلتر**: اگر `allowedTypes` تعیین نشده باشد، تعیین نوع از `allowedExtensions` انجام می‌شود؛ در غیر اینصورت از `allowedTypes` استفاده می‌شود.
- **محدودیت حجم**: `maxSizeMB × 1024 × 1024` بایت برای هر فایل.
- **جلوگیری از تکرار**: فایل‌های تکراری بر اساس نام نادیده گرفته می‌شوند.
- **پیش‌نمایش**: فقط برای `image/*` و `video/*` نمایش داده می‌شود.
- **مدیریت URL**: `URL.revokeObjectURL` برای آزادسازی منابع انجام می‌شود.

میانبرها و تعاملات
- **Wheel**: زوم کردن (بدون `preventDefault`، سازگار با passive).
- **Mouse drag**: جابه‌جایی پیش‌نمایش هنگام زوم.
- **دکمه‌ها**: بزرگ‌نمایی، کوچک‌نمایی، چرخش چپ/راست، بازنشانی، حذف، بستن.

تمینگ (CSS Variables)
این مقادیر از طریق `theme` مقداردهی می‌شوند:
```css
--mbox-accent, --mbox-on-accent, --mbox-panel-bg, --mbox-text,
--mbox-border, --mbox-overlay-bg, --mbox-canvas-bg, --mbox-danger
```

نمونه‌ها
- **فقط تصاویر**:
```vue
<UploadModal :isOpen="isOpen" :selectedFiles="files" :allowedTypes="'image'" />
```
- **پسوندهای خاص**:
```vue
<UploadModal :isOpen="isOpen" :selectedFiles="files" :allowedExtensions="['pdf','docx']" />
```

نکات
- برای تجربه بهتر، لیبل دکمه «اضافه» را با زبان پروژه هماهنگ کنید.
- در پروژه‌هایی با تم سراسری، `theme` را خالی بگذارید تا از CSS Variables موجود استفاده شود.
