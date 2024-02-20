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
    const accessToken = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("accessToken"))
      ?.split("=")[1]; // 쿠키에서 토큰 가져오기
    if (accessToken) {
      setToken(accessToken);
    }

    // 쿼리스트링에서 인트라id, 동의여부 가져오기
    const quary = router.query;
    const intraId = parseInt(quary.intraId as string);
    const agreement = quary.agreement as string;

    if (intraId) {
      // 인트라id로 사용자 정보 가져오기
      memberApi
        .getMemberInfo({ intraId })
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // console.log("accessToken", accessToken);
    // console.log("intraId", intraId);
    // console.log("agreement", agreement);
  }, [router.query, setToken, setUser]);

  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
