# ✅ TodoMaster 🚀

A modern **todo + subscription demo** built with **Next.js 16**, **Clerk Auth**, **Neon Postgres**, and **Prisma** — featuring a clean UI, pagination, search, and role-based admin tools.

---

<p align="center">
  <img src="./app/screenshots/1.png" alt="Landing Page" width="800"/>
</p>
---

## ✨ Features

✅ **Clerk Authentication** (Sign In / Sign Up)  
✅ **User Dashboard**

- Create todos
- Complete / undo
- Delete
- Search + pagination

<p align="center">
  <img src="./app/screenshots/2.png" alt="Todo Page" width="800"/>
</p>
---

✅ **Subscription Gate**

- Free users: max **3 todos**
- Subscribed users: unlimited

<p align="center">
  <img src="./app/screenshots/3.png" alt="subscription page" width="800"/>
</p>
---

✅ **Admin Dashboard**

- Search user by email
- View user todos
- Update subscription
- Moderate todos  
  ✅ **Webhooks**
- On `user.created`, user is automatically inserted into Neon DB  
  ✅ **Dark/Light Mode Support** 🌙☀️  
  ✅ Fully **responsive UI** 📱💻

---

## 🧱 Tech Stack

- ⚡ **Next.js 16 (App Router)**
- 🔐 **Clerk**
- 🗃️ **Neon (PostgreSQL)**
- 🔷 **Prisma ORM**
- 🎨 **Tailwind CSS + shadcn/ui**
- 🧩 **Svix Webhooks**

---

## 📂 Project Structure

```txt
saas-starter-app/
├─ app/
│  ├─ api/
│  │  ├─ admin/
│  │  │  └─ route.ts
│  │  ├─ subscription/
│  │  │  └─ route.ts
│  │  ├─ todos/
│  │  │  ├─ route.ts
│  │  │  └─ [id]/
│  │  │     └─ route.ts
│  │  └─ webhook/
│  │     └─ register/
│  │        └─ route.ts
│  ├─ (authenticated)/
│  │  ├─ layout.tsx
│  │  ├─ dashboard/
│  │  │  └─ page.tsx
│  │  ├─ subscribe/
│  │  │  └─ page.tsx
│  │  └─ admin/
│  │     └─ dashboard/
│  │        └─ page.tsx
│  ├─ sign-in/
│  │  └─ [[...rest]]/
│  │     └─ page.tsx
│  ├─ sign-up/
│  │  └─ [[...rest]]/
│  │     └─ page.tsx
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ components/
│  ├─ Navbar.tsx
│  ├─ TodoItem.tsx
│  ├─ TodoForm.tsx
│  ├─ Pagination.tsx
│  ├─ BackButton.tsx
│  └─ ui/ (shadcn components)
│
├─ hooks/
│  └─ use-toast.ts
│
├─ lib/
│  └─ prisma.ts
│
├─ prisma/
│  └─ schema.prisma
│
├─ middleware.ts
├─ package.json
└─ README.md
```

---

## 🔑 Environment Variables

Create a .env.local file:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

WEBHOOK_SECRET="whsec_..."

```

## ▶️ Run Locally

```
npm install
npx prisma generate
npm run dev
```

Open:
📍 http://localhost:3000

---

## 🧪 Prisma Setup

If you are using migrations:

```
npx prisma migrate dev --name init
```

For production deploy:

```
npx prisma migrate deploy
```

## 🔔 Clerk Webhook Setup

In Clerk Dashboard → Webhooks:

Endpoint URL:

```
https://YOUR-DEPLOYED-URL.vercel.app/api/webhook/register
```

Subscribe event:
✅ user.created

Copy the webhook signing secret and set it as:

```
WEBHOOK_SECRET="whsec_..."
```

## 🔎 Contact

- Email: [officialsithumbuddhika@gmail.com](mailto:officialsithumbuddhika@gmail.com)
- LinkedIn: [Sithum Buddhika Jayalal](https://www.linkedin.com/in/sithum-buddhika-jayalal-827860341)
