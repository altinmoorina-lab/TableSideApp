import { Layout } from '@/components/layout';
import { MarketplaceProvider } from '@/context/marketplace-context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MarketplaceProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MarketplaceProvider>
    </SessionProvider>
  );
}
