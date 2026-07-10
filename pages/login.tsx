import { Button } from '@/components/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type ProviderMap = Record<string, { id: string; name: string }>;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@techhub.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [providers, setProviders] = useState<ProviderMap>({});

  useEffect(() => {
    async function loadProviders() {
      const response = await fetch('/api/auth/providers');
      if (!response.ok) return;
      setProviders(await response.json());
    }

    loadProviders();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <section className="mx-auto grid max-w-md gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Login</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Access your account</h1>
      </div>
      <form className="grid gap-4 rounded-lg bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <label className="grid gap-2 font-semibold">
          Email
          <input className="rounded-lg border border-slate-300 px-3 py-2" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="grid gap-2 font-semibold">
          Password
          <input
            type="password"
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p className="rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}
        <Button>Login</Button>
        {(providers.google || providers.facebook) && (
          <div className="grid gap-2 text-sm">
            {providers.google && (
              <button type="button" className="font-semibold text-tech" onClick={() => signIn('google')}>
                Continue with Google
              </button>
            )}
            {providers.facebook && (
              <button type="button" className="font-semibold text-tech" onClick={() => signIn('facebook')}>
                Continue with Facebook
              </button>
            )}
          </div>
        )}
        <Link href="/register" className="text-sm font-semibold text-slate-600">
          Need an account? Register
        </Link>
      </form>
    </section>
  );
}
