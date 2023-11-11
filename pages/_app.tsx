import "%/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Modal from "@/atoms/Modal/Modal";

import theme from "%/theme/themeConfig";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  // TODO: server side 에서 page 를 generating 할때, localStorage 에 접근할 수 없음
  // 로그인을 하지 않았다면
  const { isAuth, protectedRoutes } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth && protectedRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [isAuth, protectedRoutes, router]);

  return (
    <ConfigProvider theme={theme}>
      <Modal />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
