import "%/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Modal from "@/atoms/Modal/Modal";

import theme from "%/theme/themeConfig";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // 로그인을 하지 않았다면
  const isAuth = false;
  const router = useRouter();

  useEffect(() => {
    const protectedRoutes = ["/main"];

    if (!isAuth && protectedRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [isAuth, router]);

  return (
    <ConfigProvider theme={theme}>
      <Modal />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
