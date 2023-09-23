import { Fragment } from "react";
import Image from "next/image";
import HelpIcon from "&/Icons/help.svg";
import Logo from "&/BI.svg";
import styles from "./LoginMain.module.scss";

function LoginMain() {
  return (
    <Fragment>
      <div className={styles.help}>
        <Image src={HelpIcon} alt="help icon" />
      </div>
      <div className={styles.main}>
        {/* Logo */}
        <Image src={Logo} alt="Logo" />
        <div className={styles.title}>
          {/* TOOD: h1 - h6 tag 가 적용이 안되는 문제 해결이 필요합니다 */}
          {/* Sub Title */}
          <h3>42Seoul 위치 정보 검색 서비스</h3>
          {/* Title */}
          <h1>어디있니?</h1>
        </div>
        <button>로그인</button>
      </div>
    </Fragment>
  );
}

export default LoginMain;
