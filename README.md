# TechHub Marketplace

TechHub Marketplace is a Next.js web application where users browse technology products, save favorites, manage their profile, and admins manage the product catalog.

## Features

- 10+ linked pages: Home, About, Contact, Login, Register, Dashboard, Admin, Products, Product Details, Profile, Favorites, Search, FAQ, Terms, and 404.
- NextAuth authentication with credentials plus Google/Facebook provider configuration.
- Middleware role protection for user and admin routes.
- Product CRUD in the admin panel and API routes.
- Favorites, reviews, and contact message flows.
- MongoDB/Mongoose model files for User, Product, Favorite, Review, and ContactMessage.
- SSR, SSG, getStaticPaths, and ISR examples.
- Tailwind CSS responsive design.
- Jest and React Testing Library tests.

## Install

```bash
npm install
```

Create `.env.local` from `.env.example`:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-secret
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techhub
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

Demo accounts:

- User: `altin@example.com` / `password123`
- Admin: `admin@techhub.com` / `admin123`

## Tests

```bash
npm test
```

## Deployment

Deploy on Vercel and add the same environment variables from `.env.local` in the Vercel project settings.

Live link: add the Vercel URL after deployment.

Screenshots: add screenshots of Home, Products, Product Details, Dashboard, and Admin after deployment.

## Group Members

- Altin Morina: frontend UI, authentication, product CRUD, testing, and documentation.
