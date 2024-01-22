import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import theme from "%/theme/themeConfig";
import "%/globals.css";

import { useEffect } from "react";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/router";
import groupApi from "@/api/groupApi";
import memberApi from "@/api/memberApi";
import useGroupStore from "@/stores/useGroupStore";

import axios from "@/utils/Axios";

export default function App({ Component, pageProps }: AppProps) {
  const { user, token, setToken, setUser } = useUserStore();
  const router = useRouter();

  const path = router.pathname;
  const replace = router.replace;

  useEffect(() => {
    const handleRedirect = () => {
      switch (path) {
        case "/main":
          if (!token) replace("/login");
          break;
        case "/login":
          if (token) {
            replace("/main");
          }
          break;
        default:
          if (token) {
            replace("/main");
          } else {
            replace("/login");
          }
          break;
      }
    };

    handleRedirect();
  }, [path, replace, token]);

  useEffect(() => {
    // 쿼리스트링에서 토큰 가져오기
    console.log(router.query);
    const { token, intraId, agreement } = router.query;

    if (intraId && agreement && token) {
      // 토큰이 존재하면 로컬 스토리지에 저장
      localStorage.setItem("token", token as string);
      console.log("Token update from query string:", token);
      setToken(token as string);
      memberApi
        .getMemberInfo({ intraId: Number(intraId as string) })
        .then((res) => {
          console.log(res);
          setUser(res);
        });
      return;
    } else if (token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, [router.query, setToken, setUser]);

  // useEffect(() => {
  //   // 토큰이 존재하면 axios 헤더에 토큰 추가, 없으면 삭제
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     console.log(axios.defaults.headers.common["Authorization"]);
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [token]);

  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
