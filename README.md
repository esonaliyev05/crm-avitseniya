# Avitseniya Academy CRM

React/Vite frontend va Google Apps Script + Google Sheets server tomoni asosidagi EDU CRM.

## Tezkor ishga tushirish

```bash
npm install
copy .env.example .env
npm run dev
```

`.env` ga Apps Script Web App URL kiriting. Offline interfeys ko‘rish uchun `VITE_DEMO_MODE=true` qiling; demo loginlar `boss@demo.uz`, `admin@demo.uz` yoki `teacher@demo.uz`, parol `demo123`. Demo rejimi ma’lumotni saqlamaydi va production uchun mo‘ljallanmagan.

Apps Script deploy va xavfsizlik tartibi [apps-script/README.md](apps-script/README.md) da.

## Arxitektura

```mermaid
flowchart LR
  R[React Vite] --> A[Apps Script Web App]
  A --> S[Google Sheets]
  A --> M[Mock or SMS Provider]
```

## Login va ruxsat

```mermaid
sequenceDiagram
  participant U as User
  participant R as React
  participant A as Apps Script
  participant S as Sheets Cache
  U->>R: Email va parol
  R->>A: login
  A->>S: Hash tekshiruvi
  A-->>R: Opaque session token
  R->>A: action + token
  A->>S: Session va role tekshiruvi
  A-->>R: Ruxsatlangan javob
```

## O‘quvchini guruhga biriktirish

```mermaid
flowchart TD
  A[Admin/Boss] --> B[groups.assignStudent]
  B --> C{Role tekshiruvi}
  C -->|OK| D{Faol birikma yoqmi?}
  D -->|Ha| E[CONFLICT]
  D -->|Yo‘q| F[GroupStudents yozuvi]
  F --> G[Audit log]
```

## Davomat

```mermaid
flowchart LR
  A[Teacher/Admin] --> B[Lesson va guruhni tekshirish]
  B --> C{Bekor qilinganmi?}
  C -->|Ha| D[Rad etish]
  C -->|Yo‘q| E[Lock bilan upsert]
  E --> F[Attendance]
  F --> G[Audit log]
```

## To‘lov va qarzdorlik

```mermaid
flowchart LR
  O[Payment obligation, minor units] --> D[Qarz]
  P[Completed payments] --> D
  X[Discount] --> D
  D --> R[amount - payments - discount]
  P --> I[Idempotency key + audit]
```

## SMS xabarnoma

```mermaid
flowchart LR
  T[Daily trigger] --> D[Qarzdorliklarni olish]
  D --> C{Consent va dedupe}
  C -->|OK| M[MockSmsProvider]
  M --> L[SmsLogs]
  C -->|No| L
```

## Tekshiruvlar

Frontend build: `npm run build`. Apps Scriptda login, role, CRUD, duplicate attendance, qisman/void payment va mock SMS oqimlarini yuqoridagi actionlar bilan tekshiring. Hech qanday secret repositoryga kiritilmagan.
