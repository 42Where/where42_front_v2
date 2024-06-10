import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Head>
        <title>Where42</title>
        <link rel='icon' href='/Icons/logo.svg' />
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId='G-0H3Z5S8GSR' />
    </>
  );
}
