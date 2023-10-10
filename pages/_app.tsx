import "%/globals.css";
import type { AppProps } from "next/app";
import Modal from "@/atoms/Modal/Modal";
import DropdownMenu from "@/atoms/DropdownMenu/DropdownMenu";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal />
      <DropdownMenu />
      <Component {...pageProps} />
    </>
  );
}
