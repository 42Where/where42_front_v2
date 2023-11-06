import "%/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Modal from "@/atoms/Modal/Modal";

import theme from "%/theme/themeConfig";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Modal />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
