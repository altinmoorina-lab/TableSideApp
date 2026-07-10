import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        tech: '#2563eb',
        circuit: '#16a34a',
        panel: '#f8fafc',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
