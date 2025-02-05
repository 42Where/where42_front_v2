import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Head>
        <title>Where42</title>
        <link rel="icon" href="/image/logo.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <GoogleAnalytics gaId="G-0H3Z5S8GSR" />
    </>
  );
}
