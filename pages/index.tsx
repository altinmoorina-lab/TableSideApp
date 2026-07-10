import { Button } from '@/components/button';
import { ProductCard } from '@/components/product-card';
import { Product } from '@/lib/products';
import { listProductsData } from '@/lib/store';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

type HomeProps = {
  featured: Product[];
};

export default function Home({ featured }: HomeProps) {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="grid gap-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Student marketplace project</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">TechHub Marketplace</h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Browse modern laptops, gaming gear, audio, displays, and storage. Save favorites, manage your profile, and use
              the admin panel to maintain the product catalog.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button>Browse products</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary">About project</Button>
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-5 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.slice(0, 4).map((product) => (
                <div key={product.id} className="rounded-lg bg-white p-4 text-ink">
                  <p className="text-sm font-bold text-tech">{product.brand}</p>
                  <p className="mt-1 font-black">{product.name}</p>
                  <p className="mt-4 text-2xl font-black">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-tech">Featured stock</p>
            <h2 className="text-3xl font-black text-ink">Popular technology products</h2>
          </div>
          <Link href="/search" className="font-semibold text-tech">
            Search catalog
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const products = await listProductsData();

  return {
    props: {
      featured: products.filter((product) => product.featured),
    },
  };
};
