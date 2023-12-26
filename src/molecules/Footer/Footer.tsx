import React from "react";
import { Modal } from "antd";

import Logo from "&/Icons/logoC.svg";

import Terms from "@/atoms/Terms/Terms";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const { useModal } = Modal;

  const [modal, context] = useModal();
  const onOpenTerms = () => {
    modal.success({
      icon: null,
      title: null,
      content: <Terms />,
      okText: "닫기",
      width: "85%",
      centered: true,
      style: {
        padding: "0",
      },
    });
  };

  return (
    <footer className={styles.footer}>
      <a href="https://github.com/42Where" target="_blank">
        {/* TODO: 깃허브 프로필 꾸며야 할수도 */}
        <Logo
          className={styles.logo}
          // style={{
          //   width: "8rem",
          //   height: "2rem",
          // }}
          // TODO: 로고 크기 조절 필요
        />
      </a>
      <div className={styles.links}>
        {/* TODO: 문의 구글 스프레드시트 연결 필요 */}
        <a href="대충 슬랙 dm 링크나 구글 스프레드" target="_blank">
          버그 제보/문의
        </a>
        <div onClick={onOpenTerms}>개인정보 이용 동의서</div>
        {context}
      </div>
    </footer>
  );
};

export default Footer;
