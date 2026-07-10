import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
};

const variants = {
  primary: 'bg-tech text-white hover:bg-blue-700',
  secondary: 'border border-slate-300 bg-white text-ink hover:border-tech hover:text-tech',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
