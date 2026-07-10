import { useMarketplace } from '@/context/marketplace-context';
import { Product } from '@/lib/products';

export function useFavorites(products: Product[]) {
  const { favoriteIds, isFavorite, toggleFavorite } = useMarketplace();
  const favorites = products.filter((product) => favoriteIds.includes(product.id));

  return {
    favorites,
    favoriteCount: favorites.length,
    isFavorite,
    toggleFavorite,
  };
}
