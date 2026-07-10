import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/button';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/search', label: 'Search' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const accountItems = session
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/profile', label: 'Profile' },
        ...(session.user.role === 'admin' ? [{ href: '/admin', label: 'Admin' }] : []),
      ]
    : [];
  const isActive = (href: string) => (href === '/' ? router.pathname === '/' : router.pathname.startsWith(href));
  const linkClass = (href: string) =>
    `rounded-full px-3 py-2 transition ${
      isActive(href) ? 'bg-blue-50 text-tech shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-tech'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm text-white shadow-[inset_0_-10px_18px_rgba(37,99,235,0.35)] ring-1 ring-white/10">
            TH
          </span>
          <span>
            TechHub <span className="text-tech">Marketplace</span>
          </span>
        </Link>
        <button className="rounded-lg border px-3 py-2 text-sm font-semibold md:hidden" onClick={() => setOpen(!open)}>
          Menu
        </button>
        <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
          {accountItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                {session.user.role}
              </span>
              <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:text-tech">
                Login
              </Link>
              <Link href="/register" className="rounded-lg bg-tech px-4 py-2 text-sm font-semibold text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {open && (
        <nav className="grid gap-2 border-t border-slate-200 bg-white px-4 py-4 text-sm font-semibold md:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          {accountItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href={session ? '/profile' : '/login'} className={linkClass(session ? '/profile' : '/login')} onClick={() => setOpen(false)}>
            {session ? 'Profile' : 'Login'}
          </Link>
        </nav>
      )}
    </header>
  );
}
