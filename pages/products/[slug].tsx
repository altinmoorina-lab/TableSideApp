import { Button } from '@/components/button';
import { useMarketplace } from '@/context/marketplace-context';
import { Product, products } from '@/lib/products';
import { findProductData, listReviewsData, Review } from '@/lib/store';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type ProductDetailsProps = {
  product: Product;
  reviews: Review[];
};

export default function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const { data: session } = useSession();
  const { addRecentlyViewed, isFavorite, toggleFavorite } = useMarketplace();
  const [reviewItems, setReviewItems] = useState(reviews);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState('');
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    addRecentlyViewed(product);
  }, [addRecentlyViewed, product]);

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:items-start">
      <div className="grid min-w-0 overflow-hidden rounded-lg bg-white p-3 shadow-soft">
        <div className="grid aspect-[16/10] max-h-[560px] min-h-[260px] place-items-center rounded-lg bg-[radial-gradient(circle_at_30%_20%,#38bdf8,transparent_26%),linear-gradient(135deg,#0f172a,#1d4ed8_55%,#16a34a)] p-6 text-center text-white">
        {product.image && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-[520px] w-full rounded object-contain"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="max-w-xl text-balance text-3xl font-black leading-tight md:text-5xl">{product.name}</span>
        )}
        </div>
      </div>
      <div className="grid min-w-0 content-start gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-tech">{product.category}</p>
          <h1 className="mt-2 break-words text-3xl font-black leading-tight text-ink md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-pretty text-slate-600">{product.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-3xl font-black">${product.price}</p>
          <p className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">{product.stock} in stock</p>
          <p className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">{product.rating} stars</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => toggleFavorite(product.id)}>
          {isFavorite(product.id) ? 'Remove favorite' : 'Save favorite'}
        </Button>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Specifications</h2>
          <ul className="mt-4 grid gap-2 text-slate-700">
            {product.specs.map((spec) => (
              <li key={spec} className="break-words">- {spec}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Reviews</h2>
          <div className="mt-4 grid gap-3">
            {reviewItems.length === 0 && <p className="text-sm text-slate-600">No reviews yet. Be the first to add one.</p>}
            {reviewItems.map((review) => (
              <p key={review.id} className="text-sm text-slate-600">
                <strong className="text-ink">{review.author}</strong> ({review.rating}/5): {review.comment}
              </p>
            ))}
          </div>
          <form
            className="mt-5 grid gap-3 border-t border-slate-100 pt-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setReviewMessage('');

              const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  productId: product.id,
                  author: session?.user?.name || 'Guest',
                  rating,
                  comment,
                }),
              });

              if (!response.ok) return;

              const data = await response.json();
              setReviewItems((current) => [data.review, ...current]);
              setComment('');
              setRating(5);
              setReviewMessage('Review saved to the database.');
            }}>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Rating
              <select
                className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Comment
              <textarea
                className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 font-normal"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                required
                minLength={4}
              />
            </label>
            {reviewMessage && <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{reviewMessage}</p>}
            <Button>Add review</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: products.map((product) => ({ params: { slug: product.slug } })),
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<ProductDetailsProps> = async ({ params }) => {
  const product = await findProductData(String(params?.slug));

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
      reviews: await listReviewsData(product.id),
    },
    revalidate: 60,
  };
};
