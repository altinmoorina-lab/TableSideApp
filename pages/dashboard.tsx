import { ProductCard } from '@/components/product-card';
import { Product } from '@/lib/products';
import { listProductsData } from '@/lib/store';
import { authOptions } from '@/lib/auth';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

type DashboardProps = {
  name: string;
  products: Product[];
};

export default function Dashboard({ name, products }: DashboardProps) {
  const lowStock = products.filter((product) => product.stock <= 10);
  const inventoryValue = products.reduce((total, product) => total + product.price * product.stock, 0);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12">
      <div className="rounded-lg bg-slate-950 p-8 text-white shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black">Welcome back, {name}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Track catalog health, featured products, and stock warnings from a protected server-rendered page.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Products</p>
          <p className="mt-2 text-3xl font-black">{products.length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Featured</p>
          <p className="mt-2 text-3xl font-black">{products.filter((product) => product.featured).length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Low stock</p>
          <p className="mt-2 text-3xl font-black">{lowStock.length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">Inventory value</p>
          <p className="mt-2 text-3xl font-black">${inventoryValue.toLocaleString()}</p>
        </div>
      </div>
      {lowStock.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <p className="font-black text-amber-900">Stock attention</p>
          <p className="mt-1 text-sm text-amber-800">{lowStock.map((product) => product.name).join(', ')} need restocking soon.</p>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  return {
    props: {
      name: session.user?.name || 'user',
      products: await listProductsData(),
    },
  };
};
