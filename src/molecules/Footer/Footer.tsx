import React from "react";
import { Modal } from "antd";

import Logo from "&/Icons/logoC.svg";

import Terms from "@/atoms/Terms/Terms";
import TermsProps from "&/terms";

import styles from "./Footer.module.scss";

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
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <a href="https://www.where42.kr/">
          <Logo
            style={{
              width: "8rem",
              height: "2rem",
            }}
          />
        </a>
        <div className={styles.footer__links}>
          <div className={styles.footer__link}>
            {/* TODO: 깃허브 프로필 꾸며야 할수도 */}
            <a href="https://github.com/42Where" target="_blank">
              About
            </a>
          </div>
          <div className={styles.footer__link}>
            {/* TODO: 문의 구글 스프레드시트 연결 필요 */}
            <a href="대충 슬랙 dm 링크나 구글 스프레드" target="_blank">
              Contact
            </a>
          </div>
          <div onClick={onOpenTerms}>Privacy & Terms</div>
          {context}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
