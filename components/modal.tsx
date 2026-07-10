import { ReactNode } from 'react';
import { Button } from '@/components/button';

type ModalProps = {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, open, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-ink">{title}</h2>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
