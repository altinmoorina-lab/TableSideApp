import { ProductCard } from '@/components/product-card';
import { useFavorites } from '@/hooks/use-favorites';
import { Product } from '@/lib/products';
import { listProductsData } from '@/lib/store';
import type { GetServerSideProps } from 'next';

type FavoritesPageProps = {
  products: Product[];
};

export default function FavoritesPage({ products }: FavoritesPageProps) {
  const { favorites, isFavorite, toggleFavorite } = useFavorites(products);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Favorites</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Your saved products</h1>
      </div>
      {favorites.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">No favorites yet. Save products from the catalog.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorite={isFavorite(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<FavoritesPageProps> = async () => ({
  props: {
    products: await listProductsData(),
  },
});
