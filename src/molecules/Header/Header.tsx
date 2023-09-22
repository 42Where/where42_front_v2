import { useRouter } from "next/router";

import Logo from "&/Icons/logoB.svg";
import SearchIcon from "&/Icons/search.svg";
import SignOutIcon from "&/Icons/signOut.svg";

import Image from "next/image";
// import IconButton from "@/atoms/IconButton/IconButton";
// IconButton 구현 후 Image들을 IconButton으로 변경

import styles from "./Header.module.scss";

type HeaderProps = {
  /**
   * 현재 페이지의 url
   * 실제 환경에서는 router 를 통해 받아오거나 redux/zustand를 통해 로그인 여부를 확인할 예정
   * 배포시에는 제거
   */
  url?: "/" | "/main" | "/search" | "/login" | "/signup";
};

const Header: React.FC<HeaderProps> = ({ url }) => {
  const router = useRouter();

  const LogoClickHandler = () => {
    router.push("/");
    // TODO: 메인페이지로 이동
    // 구현 변경이 필요할수도 있음
  };
  const SearchClickHandler = () => {
    router.push("/search");
    // TODO: 검색창으로 이동
    // 추후 검색창으로 이동이 아니라 플로트를 띄우는 방식으로 변경
  };
  const SignOutClickHandler = () => {
    // 대충 로그아웃 함수 구현 필요
    // 재활용 가능성이 많은 함수이므로 다른곳에서 구현후 import해서 재사용해야할수도 있음
  };

  let ButtonWrapper: JSX.Element[] = [];

  switch (url) {
    case "/main":
      ButtonWrapper = [
        <Image
          src={SearchIcon}
          alt="search"
          onClick={SearchClickHandler}
          key={"search"}
        />,
        <Image
          src={SignOutIcon}
          alt="signout"
          onClick={SignOutClickHandler}
          key={"signout"}
        />,
      ];
      break;
    case "/search":
      ButtonWrapper = [
        <Image
          src={SignOutIcon}
          alt="signout"
          onClick={SignOutClickHandler}
          key={"signout"}
        />,
      ];
      break;
    default:
      ButtonWrapper = [];
      break;
  }

  return (
    <div className={styles.header}>
      <Image src={Logo} alt="logo" onClick={LogoClickHandler} />
      <div className={styles["header__buttonwrapper"]}>{ButtonWrapper}</div>
    </div>
  );
};

export default Header;
