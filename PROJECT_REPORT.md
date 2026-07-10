# TechHub Marketplace - Project Report

## Project Scope

TechHub Marketplace is a web application for browsing technology products, saving favorites, and managing the catalog through an admin panel.

## Requirements Coverage

- Minimum 10 pages: Home, About, Contact, Login, Register, Dashboard, Admin, Products, Product Details, Profile, Favorites, Search, FAQ, Terms, and 404.
- Reusable components: Header, Footer, ProductCard, Button, Modal, Layout.
- Authentication: NextAuth credentials plus Google/Facebook provider configuration.
- Role management: middleware protects dashboard/profile and restricts admin routes to admin users.
- CRUD: product CRUD through `/api/products` and admin UI; review/contact/favorites API routes provide additional entity operations.
- MongoDB: Mongoose models for User, Product, Favorite, Review, and ContactMessage.
- State management: Context API in `context/marketplace-context.tsx`, useState/useEffect, and custom hook `hooks/use-favorites.ts`.
- Data fetching: `getServerSideProps`, `getStaticProps`, `getStaticPaths`, and `revalidate` are implemented.
- Forms: Contact and Register use react-hook-form with zod validation and success/error messages.
- Styling: Tailwind CSS responsive layouts for mobile, tablet, and desktop.
- Testing: component and API tests are in `__tests__`.
- Deployment: Vercel-ready scripts and `.env.example`.

## Demo Flow

1. Open Home and Products.
2. Open a Product Details page.
3. Save products to Favorites.
4. Login with `admin@techhub.com` / `admin123`.
5. Open Dashboard, Profile, and Admin.
6. Create, update, and delete a product.
7. Submit the Contact form.
