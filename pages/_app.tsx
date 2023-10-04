import "%/globals.css";
import type { AppProps } from "next/app";
import Modal from "@/atoms/Modal/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal />
      <Component {...pageProps} />
    </>
  );
}
