import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-12 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">404</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you opened does not exist.</p>
        <Link href="/products" className="mt-6 inline-flex rounded-lg bg-tech px-4 py-2 font-semibold text-white">
          Back to products
        </Link>
      </div>
    </section>
  );
}
