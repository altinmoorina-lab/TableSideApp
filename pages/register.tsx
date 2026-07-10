import { Button } from '@/components/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Use a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

type RegisterForm = z.infer<typeof registerSchema>;

type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Register() {
  const [success, setSuccess] = useState('');
  const [createdUser, setCreatedUser] = useState<RegisteredUser | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterForm) {
    setSuccess('');
    setCreatedUser(null);

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      setCreatedUser(data.user);
      setSuccess('Account created and saved. You can now log in with these credentials.');
      reset();
    }
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Register</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Create your TechHub account</h1>
        <p className="mt-3 text-slate-600">
          New users are saved in MongoDB when the database is connected, then shown here for confirmation.
        </p>
      </div>
      <form className="grid gap-4 rounded-lg bg-white p-6 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
        <label className="grid gap-2 font-semibold">
          Name
          <input className="rounded-lg border border-slate-300 px-3 py-2" {...register('name')} />
          {errors.name && <span className="text-sm text-rose-600">{errors.name.message}</span>}
        </label>
        <label className="grid gap-2 font-semibold">
          Email
          <input className="rounded-lg border border-slate-300 px-3 py-2" {...register('email')} />
          {errors.email && <span className="text-sm text-rose-600">{errors.email.message}</span>}
        </label>
        <label className="grid gap-2 font-semibold">
          Password
          <input type="password" className="rounded-lg border border-slate-300 px-3 py-2" {...register('password')} />
          {errors.password && <span className="text-sm text-rose-600">{errors.password.message}</span>}
        </label>
        {success && <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{success}</p>}
        <Button disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Register'}</Button>
        <Link href="/login" className="text-sm font-semibold text-slate-600">
          Already registered? Login
        </Link>
      </form>
      <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-start-2">
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Registered User Preview</p>
        {createdUser ? (
          <div className="mt-5 grid gap-4">
            <div className="rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-300">Account name</p>
              <p className="mt-1 text-2xl font-black">{createdUser.name}</p>
            </div>
            <dl className="grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="font-bold text-slate-500">Email</dt>
                <dd className="font-semibold text-ink">{createdUser.email}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="font-bold text-slate-500">Role</dt>
                <dd className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-700">{createdUser.role}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="font-bold text-slate-500">Database ID</dt>
                <dd className="break-all rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">{createdUser.id}</dd>
              </div>
            </dl>
            <Link href="/login" className="inline-flex justify-center rounded-lg bg-tech px-4 py-2 text-sm font-semibold text-white">
              Login with this account
            </Link>
          </div>
        ) : (
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            After registration, the saved user information will appear here.
          </p>
        )}
      </aside>
    </section>
  );
}
