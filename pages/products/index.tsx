import { ProductCard } from '@/components/product-card';
import { useFavorites } from '@/hooks/use-favorites';
import { Product } from '@/lib/products';
import { listProductsData } from '@/lib/store';
import type { GetServerSideProps } from 'next';

type ProductsPageProps = {
  products: Product[];
};

export default function ProductsPage({ products }: ProductsPageProps) {
  const { isFavorite, toggleFavorite } = useFavorites(products);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Products</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Dynamic product catalog</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This page uses getServerSideProps for fresh catalog data and client state for saving favorites.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            favorite={isFavorite(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async () => {
  return {
    props: {
      products: await listProductsData(),
    },
  };
};
