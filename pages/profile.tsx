import { Button } from '@/components/button';
import { authOptions } from '@/lib/auth';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useState } from 'react';

type ProfileProps = {
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export default function Profile({ user }: ProfileProps) {
  const [name, setName] = useState(user.name);
  const [success, setSuccess] = useState('');

  return (
    <section className="mx-auto grid max-w-3xl gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Profile</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Account details</h1>
      </div>
      <form
        className="grid gap-4 rounded-lg bg-white p-6 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setSuccess('Profile updated locally for the demo.');
        }}>
        <label className="grid gap-2 font-semibold">
          Name
          <input className="rounded-lg border border-slate-300 px-3 py-2" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="grid gap-2 font-semibold">
          Email
          <input className="rounded-lg border border-slate-300 px-3 py-2" value={user.email} disabled />
        </label>
        <p className="text-sm font-semibold text-slate-600">Role: {user.role}</p>
        {success && <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{success}</p>}
        <Button>Update profile</Button>
      </form>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  return {
    props: {
      user: {
        name: session.user?.name || '',
        email: session.user?.email || '',
        role: session.user?.role || 'user',
      },
    },
  };
};
