import { Product } from '@/lib/products';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type MarketplaceContextValue = {
  favoriteIds: string[];
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || '';
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];

    const saved = window.localStorage.getItem('techhub-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    if (userEmail) return;
    window.localStorage.setItem('techhub-favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds, userEmail]);

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      if (!userEmail) {
        const saved = window.localStorage.getItem('techhub-favorites');
        if (active) setFavoriteIds(saved ? JSON.parse(saved) : []);
        return;
      }

      const response = await fetch(`/api/favorites?userEmail=${encodeURIComponent(userEmail)}`);
      if (!response.ok) return;

      const data = await response.json();
      if (active) {
        setFavoriteIds(data.favorites.map((favorite: { productId: string }) => favorite.productId));
      }
    }

    loadFavorites();

    return () => {
      active = false;
    };
  }, [userEmail]);

  const addRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((current) => [product, ...current.filter((item) => item.id !== product.id)].slice(0, 4));
  }, []);

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (userEmail) {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail, productId }),
        });

        if (!response.ok) return;
      }

      setFavoriteIds((current) =>
        current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
      );
    },
    [userEmail],
  );

  const isFavorite = useCallback((productId: string) => favoriteIds.includes(productId), [favoriteIds]);

  const value = useMemo(
    () => ({
      favoriteIds,
      recentlyViewed,
      addRecentlyViewed,
      toggleFavorite,
      isFavorite,
    }),
    [addRecentlyViewed, favoriteIds, isFavorite, recentlyViewed, toggleFavorite],
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }

  return context;
}
