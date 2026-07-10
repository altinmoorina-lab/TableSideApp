import { Button } from '@/components/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [success, setSuccess] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactForm) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setSuccess('Your message was saved successfully.');
      reset();
    }
  }

  return (
    <section className="mx-auto grid max-w-3xl gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">Contact</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Send a message to TechHub</h1>
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
          Message
          <textarea className="min-h-32 rounded-lg border border-slate-300 px-3 py-2" {...register('message')} />
          {errors.message && <span className="text-sm text-rose-600">{errors.message.message}</span>}
        </label>
        {success && <p className="rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{success}</p>}
        <Button disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send message'}</Button>
      </form>
    </section>
  );
}
