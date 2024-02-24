import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import theme from "%/theme/themeConfig";
import "%/globals.css";

import { useEffect } from "react";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/router";
import authApi from "@/api/authApi";
import groupApi from "@/api/groupApi";
import memberApi from "@/api/memberApi";
import useGroupStore from "@/stores/useGroupStore";

export default function App({ Component, pageProps }: AppProps) {
  const {
    user,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setUser,
  } = useUserStore();

  // useEffect(() => {
  //   const handleRedirect = () => {
  //     switch (path) {
  //       case "/main":
  //         if (!accessToken || refreshToken) replace("/login");
  //         break;
  //       case "/login":
  //         if (accessToken && refreshToken) {
  //           replace("/main");
  //         }
  //         break;
  //       default:
  //         if (accessToken && refreshToken) {
  //           replace("/main");
  //         } else {
  //           replace("/login");
  //         }
  //         break;
  //     }
  //   };

  //   handleRedirect();
  // }, [path, replace, accessToken, refreshToken]);

  useEffect(() => {
    const accessToken = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("accessToken"))
      ?.split("=")[1];
    const refreshToken = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("refreshToken"))
      ?.split("=")[1];

    // 쿠키에서 토큰 가져와서 스토어에 저장
    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }

    // 토큰으로 사용자 정보 가져오기
    authApi
      .getMyInfo()
      .then((res) => {
        setUser(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // 토큰으로 그룹 정보 가져오기
    groupApi.getAllGroups().then((res) => {
      console.log(res);
      useGroupStore.getState().setGroups(res);
    });
  }, [setAccessToken, setRefreshToken, setUser]);

  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
