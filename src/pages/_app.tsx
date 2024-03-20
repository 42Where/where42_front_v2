import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Head>
        <title>Where42</title>
        <link rel='icon' href='/icons/logo.svg' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
