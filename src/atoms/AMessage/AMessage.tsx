import React from "react";
import { message } from "antd";

const useAMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const axiosSuccess = (message?: string) => {
    messageApi.success("성공");
    message && console.log(message);
  };

  const axiosError = (status: number) => {
    switch (status) {
      case 302:
        messageApi.error("백엔드 수정해주세요!!!!!!!!!!!!!!!!!!!!!!!!!!");
        break;
      case 400:
        messageApi.error("잘못된 요청입니다.");
        break;
      case 401:
        messageApi.error("로그인이 필요합니다.");
        break;
      case 403:
        messageApi.error("접근 권한이 없습니다.");
        break;
      case 404:
        messageApi.error("요청하신 페이지를 찾을 수 없습니다.");
        break;
      case 500:
        messageApi.error("서버에 오류가 발생하였습니다.");
        break;
      case 503:
        messageApi.error("서비스를 사용할 수 없습니다.");
        break;
      // 이 부분 부터는 백엔드에서 정의한 에러 코드
      case 1000:
        messageApi.error("존재하지 않는 맴버입니다.");
        break;
      case 1001:
        messageApi.error("존재하지 않는 그룹입니다.");
        break;
      case 1101:
        messageApi.error("그룹이 존재하지 않습니다.");
        break;
      case 1102:
        messageApi.error("이미 그룹에 속해있습니다.");
        break;
      case 1200:
        messageApi.error("존재하지 않는 그룹입니다.");
        break;
      case 1300:
        messageApi.error("유효하지 않은 검색 입력 값입니다.");
        break;
      case 1301:
        messageApi.error("유효하지 않은 검색 타입입니다.");
        break;
      case 1400:
        messageApi.error("유효한 OAuth 토큰이 없습니다.");
        break;
      case 1401:
        messageApi.error("유요하지 않은 OAuth 토큰 이름입니다.");
        break;
      case 1402:
        messageApi.error("이미 등록된 OAuth 토큰입니다.");
        break;
      case 1500:
        messageApi.error("유효한 토큰이 없습니다.");
        break;
      case 1501:
        messageApi.error("서명이 잘못된 토큰입니다.");
        break;
      case 1502:
        messageApi.error("만료된 토큰입니다.");
        break;
      case 1503:
        messageApi.error("지원 되지 않는 토큰입니다.");
        break;
      case 1504:
        messageApi.error("잘못된 토큰입니다.");
        break;
      case 1600:
        messageApi.error("Unauthorized 권한이 없습니다.");
        break;
      case 1601:
        messageApi.error("42API 요청 횟수를 초과하였습니다.");
        break;
      case 1602:
        messageApi.error("HANE-API 요청 실패");
        break;
      case 1603:
        messageApi.error("잘못된 접근입니다");
        break;
      case 1604:
        messageApi.error("이미 등록된 유저입니다");
        break;
      default:
        messageApi.error("알 수 없는 오류가 발생하였습니다.");
        break;
    }
  };

  return { contextHolder, axiosSuccess, axiosError };
};

export default useAMessage;
