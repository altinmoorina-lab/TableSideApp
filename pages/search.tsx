import { ProductCard } from '@/components/product-card';
import { Product } from '@/lib/products';
import { listProductsData } from '@/lib/store';
import type { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';

type SearchPageProps = {
  products: Product[];
};

export default function SearchPage({ products }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    return products.filter((product) =>
      [product.name, product.brand, product.category].some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [products, query]);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Search</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Find technology products</h1>
      </div>
      <input
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
        placeholder="Search by product, brand, or category..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async () => ({
  props: {
    products: await listProductsData(),
  },
});
