import { Button } from '@/components/button';
import { Product } from '@/lib/products';
import Link from 'next/link';
import { useState } from 'react';

type ProductCardProps = {
  product: Product;
  favorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
};

export function ProductCard({ product, favorite = false, onToggleFavorite }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft hover:ring-blue-100">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#38bdf8,transparent_26%),linear-gradient(135deg,#0f172a,#1d4ed8_55%,#16a34a)] p-6 text-center text-white">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition group-hover:opacity-100" />
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
            {product.stock} in stock
          </span>
          {product.featured && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-amber-950 shadow-sm">
              Featured
            </span>
          )}
          {product.image && !imageFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full rounded object-cover transition duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="max-w-48 text-balance text-xl font-black leading-tight">{product.name}</span>
          )}
        </div>
      </Link>
      <div className="grid gap-3 p-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-tech">
            <span className="h-2 w-2 rounded-full bg-circuit" />
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`} className="text-lg font-black text-ink hover:text-tech">
            {product.name}
          </Link>
          <p className="text-sm text-slate-600">{product.brand}</p>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
          <p className="text-xl font-black">${product.price}</p>
          <p className="text-sm font-semibold text-amber-600">{product.rating.toFixed(1)} stars</p>
        </div>
        {onToggleFavorite && (
          <Button variant={favorite ? 'secondary' : 'primary'} onClick={() => onToggleFavorite(product.id)}>
            {favorite ? 'Saved' : 'Save favorite'}
          </Button>
        )}
      </div>
    </article>
  );
}
