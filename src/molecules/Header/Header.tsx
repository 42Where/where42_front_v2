import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Logo from "&/Icons/logoB.svg";
import SearchIcon from "&/Icons/search.svg";
import SignOutIcon from "&/Icons/signOut.svg";

import AIcon from "@/atoms/AIcon/AIcon";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  const router = useRouter();

  const LogoClickHandler = () => {
    router.push("/main");
    // TODO: 메인페이지로 이동
    // 구현 변경이 필요할수도 있음
  };
  const SearchClickHandler = () => {
    router.push("/search");
    // TODO: 검색창으로 이동
    // 추후 검색창으로 이동이 아니라 플로트를 띄우는 방식으로 변경
  };
  const SignOutClickHandler = () => {
    // TODO: 대충 로그아웃 함수 구현 필요
    // 재활용 가능성이 많은 함수이므로 다른곳에서 구현후 import해서 재사용해야할수도 있음
  };

  const LogoComponent = <Logo onClick={LogoClickHandler} />;
  const Buttons =
    currentPath === "/main" ? (
      <>
        <AIcon
          icon={SearchIcon}
          onClick={SearchClickHandler}
          size="medium"
          key={"search"}
        />
        <AIcon
          icon={SignOutIcon}
          onClick={SignOutClickHandler}
          size="medium"
          key={"signout"}
        />
      </>
    ) : currentPath === "/search" ? (
      <AIcon
        icon={SignOutIcon}
        onClick={SignOutClickHandler}
        size="medium"
        key={"signout"}
      />
    ) : null;

  return (
    <div className={styles.header}>
      {LogoComponent}
      <div className={styles["header__buttonwrapper"]}>{Buttons}</div>
    </div>
  );

  // TODO?: 추후에 이미지 사이즈를 그대로 사용하는 아이콘 버튼이 필요할경우
  // IconButton의 props를 수정하거나 별개의 컴포넌트로 구현이 필요할수도 있음*
};

export default Header;
