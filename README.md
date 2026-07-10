# TechHub Marketplace

**TechHub Marketplace** eshte nje web aplikacion per shfletimin dhe menaxhimin e produkteve teknologjike. Perdoruesit mund te regjistrohen, te kycen, te shohin produkte, te kerkojne produkte, te ruajne produkte te preferuara, te shkruajne reviews dhe te shohin profilin e tyre. Administratori mund te menaxhoje katalogun e produkteve, mesazhet nga forma e kontaktit dhe reviews.

Linku i aplikacionit live: [https://tech-hub-nu-puce.vercel.app](https://tech-hub-nu-puce.vercel.app)

## Pershkrimi i Projektit

Qellimi i projektit eshte krijimi i nje marketplace modern per produkte teknologjike, ku funksionaliteti kryesor eshte i ndare ne dy role:

- **Perdoruesi i thjeshte** mund te shfletoje produkte, te shikoje detajet e tyre, te ruaje favorites, te dergoje mesazh kontakti dhe te shtoje review.
- **Administratori** mund te krijoje, perditesoje dhe fshije produkte, si dhe te menaxhoje te dhenat kryesore te platformes.

Produkte shembull ne platforme:

- MacBook Air M4
- ASUS ROG Strix G16
- Dell XPS 13
- Logitech G Pro X Keyboard
- Logitech MX Master 3S
- Razer DeathAdder V3
- Samsung Odyssey G5
- Sony WH-1000XM6
- Samsung 990 Pro SSD
- PlayStation 5

## Teknologjite e Perdorura

- **Next.js** per strukturen e aplikacionit, routing dhe renderim.
- **React** per ndertimin e komponenteve te frontend-it.
- **TypeScript** per kod me tipizim dhe me pak gabime.
- **Tailwind CSS** per dizajn responsive dhe stilizim modern.
- **MongoDB** si databaze per ruajtjen e produkteve, perdoruesve, favorites, reviews dhe mesazheve.
- **Mongoose** per modelimin dhe komunikimin me MongoDB.
- **NextAuth** per autentikim dhe menaxhim te sesioneve.
- **Jest / React Testing Library** per testim.
- **Vercel** per deployment dhe hosting.

## Funksionalitetet Kryesore

- Faqja kryesore me produkte te vecuara.
- Faqja e produkteve me liste produktesh.
- Faqe individuale per detajet e produktit.
- Kerkim produktesh.
- Sistem regjistrimi dhe login.
- Dashboard per perdoruesin.
- Profile page me informata te perdoruesit.
- Ruajtje dhe largim i produkteve favorite.
- Reviews per produkte.
- Contact form qe ruan mesazhet ne databaze.
- Admin panel per menaxhimin e produkteve.
- API routes per komunikim me backend-in.
- Lidhje me MongoDB.
- Dizajn responsive per desktop dhe mobile.

## Arkitektura e Projektit

Projekti eshte i organizuar ne kete menyre:

```txt
TableSideApp/
|-- components/        # Komponentet e riperdorshme te UI
|-- context/           # Context per marketplace, favorites dhe recently viewed
|-- lib/               # Funksione ndihmese, lidhja me databaze dhe logjika e produkteve
|-- models/            # Modelet Mongoose per MongoDB
|-- pages/             # Faqet kryesore dhe API routes te Next.js
|-- public/            # Asete publike
|-- styles/            # CSS global
|-- types/             # Tipat TypeScript
`-- README.md          # Dokumentimi i projektit
```

Aplikacioni perdor arkitekture **full-stack me Next.js**, ku frontend-i dhe backend-i jane brenda te njejtit projekt. Faqet gjenden ne `pages/`, ndersa endpoint-et backend gjenden ne `pages/api/`.

## Udhezime Instalimi

Per ta ekzekutuar projektin lokalisht, ndiq keto hapa:

1. Klono ose hap projektin ne kompjuter.

2. Instalo dependencies:

```bash
npm install
```

3. Krijo file `.env.local` ne root te projektit dhe vendos keto variabla:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=vendos-nje-secret-te-gjate
MONGODB_URI=mongodb://127.0.0.1:27017/techhub-marketplace
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

4. Starto MongoDB lokalisht ose lidhe projektin me MongoDB Atlas duke ndryshuar `MONGODB_URI`.

5. Starto aplikacionin:

```bash
npm run dev
```

6. Hape aplikacionin ne browser:

```txt
http://localhost:3000
```

## Llogari Testuese

Perdorues:

```txt
Email: altin@example.com
Password: password123
```

Administrator:

```txt
Email: admin@techhub.com
Password: admin123
```

## Komanda te Dobishme

```bash
npm run dev
```

Starton projektin ne development mode.

```bash
npm run build
```

Krijon production build.

```bash
npm run lint
```

Kontrollon kodin me ESLint.

```bash
npm test
```

Ekzekuton testet.

## Deployment ne Vercel

Projekti eshte hostuar ne Vercel.

Live link: [https://tech-hub-nu-puce.vercel.app](https://tech-hub-nu-puce.vercel.app)

Per deployment ne Vercel jane vendosur edhe environment variables te projektit, sidomos:

```bash
NEXTAUTH_URL=https://tech-hub-nu-puce.vercel.app
NEXTAUTH_SECRET=...
MONGODB_URI=...
```

Vercel ben build automatikisht pas lidhjes se projektit me GitHub dhe pas cdo push te ri ne repository.

## Screenshots

Screenshots mund te shtohen ne folderin `public/screenshots/` dhe pastaj te shfaqen ketu.

Shembuj te screenshot-eve qe duhet te perfshihen ne dorezim:

- Home page
- Products page
- Product details page
- Login/Register page
- Dashboard page
- Admin panel

```md
![Home Page](public/screenshots/home.png)
![Products Page](public/screenshots/products.png)
![Product Details](public/screenshots/product-details.png)
![Dashboard](public/screenshots/dashboard.png)
![Admin Panel](public/screenshots/admin.png)
```

## Anetaret e Grupit dhe Rolet

- **Altin Morina** - Zhvillim i frontend-it, dizajn i faqeve, lidhja me MongoDB, autentikim, admin panel, deployment ne Vercel dhe dokumentim.
- **Erjon Bajraktari** - Testim i funksionaliteteve, kontroll i kerkesave te projektit, mbledhje e te dhenave per produkte dhe ndihme ne organizimin e prezantimit.

## Perfundim

TechHub Marketplace ploteson qellimin e projektit duke kombinuar frontend modern, backend me API routes, autentikim, databaze MongoDB dhe deployment ne Vercel. Projekti eshte i pershtatshem per prezantim si web aplikacion full-stack per menaxhimin dhe shfletimin e produkteve teknologjike.
