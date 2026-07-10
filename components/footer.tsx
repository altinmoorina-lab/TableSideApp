import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="font-bold text-ink">TechHub Marketplace</p>
          <p className="mt-2">A student web project for browsing technology products, saving favorites, and managing catalog data.</p>
        </div>
        <div className="grid gap-2">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
        <p className="md:text-right">Built with Next.js, NextAuth, MongoDB models, Tailwind CSS, and Jest tests.</p>
      </div>
    </footer>
  );
}
