# Avitseniya CRM — Google Apps Script

## Xavfsiz ishga tushirish

1. Google Sheet’dan **Extensions → Apps Script** oching va ushbu papkadagi `.gs` fayllar hamda `appsscript.json` ni bitta Apps Script loyihasiga yuklang.
2. `crmSetupSpreadsheet()` ni bir marta ishga tushiring. U Sheet ID ni Script Properties’ga yozadi va barcha jadval sarlavhalarini yaratadi.
3. Script editoridan `crmSetupFirstBoss('owner@example.uz', 'uzun-va-yagona-parol', 'Academy Boss')` ni faqat bir marta bajaring. Parol kamida 12 belgidan iborat; hash va alohida salt saqlanadi. Bu funksiya Users bo‘sh bo‘lmaganda ishlamaydi.
4. `crmInstallTriggers()` ni ishga tushiring va so‘ralgan ruxsatlarni tasdiqlang. U har kuni 09:00 da qarzdorlik SMS tekshiruvini ishga tushiradi.
5. **Deploy → New deployment → Web app**: Execute as **Me**, accessni tashkilotingiz ehtiyojiga mos cheklang. Deploy URL’ni frontend `.env` dagi `VITE_API_URL` ga qo‘ying.

Google Apps Script CORS va request-header cheklovlari tufayli server yaratgan, taxmin qilinmaydigan session token JSON so‘rov tanasida yuboriladi. U 6 soatdan so‘ng CacheService’dan tugaydi va har amalda serverda tekshiriladi. URL parametrlaridan rol yoki user ID qabul qilinmaydi.

## Muhim sozlamalar

- Sheet ommaga ulashilmasligi kerak; faqat Apps Script deploy foydalanuvchisi va vakolatli xodimlar ruxsat oladi.
- Hozir `MockSmsProvider` (`crmMockSmsSend_`) ishlaydi. U real xabar yubormaydi, natijani `SmsLogs` ga `MOCK_SENT` deb yozadi. Real adapter qo‘shilganda kalitlar faqat Script Properties’da saqlansin.
- Pul qiymatlari `amountMinor` (tiyin) sifatida butun sonlarda saqlanadi. To‘lov yaratishda `idempotencyKey` majburiy.

## API protokoli

`POST { action, data, sessionToken }` standart javob qaytaradi: `{ ok: true, data }` yoki `{ ok:false, error:{ code, message } }`.

`login` public; qolgan amallar session va rol orqali tekshiriladi. Asosiy actionlar: `students.*`, `groups.list`, `groups.assignStudent`, `attendance.*`, `payments.*`, `notifications.*`, `sms.send`, `reports.*`, `dashboard`.
