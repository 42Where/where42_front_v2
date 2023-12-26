import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import Logo from "&/Icons/logoC.svg";
import SearchIcon from "&/Icons/search.svg";
import SignOutIcon from "&/Icons/signOut.svg";

import AIcon from "@/atoms/AIcon/AIcon";
import SearchModal from "../SearchModal/SearchModal";

import styles from "./Header.module.css";
import { useIsLaptop, useIsMobile, useIsTablet } from "@/utils/MediaQuary";

const Header: React.FC = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  const router = useRouter();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();

  const LogoClickHandler = useCallback(() => {
    router.push("/main");
  }, [router]);
  const SearchClickHandler = useCallback(() => {
    setSearchModalOpen(true);
  }, []);
  const SignOutClickHandler = () => {
    // TODO: 대충 로그아웃 함수 구현 필요
    // 재활용 가능성이 많은 함수이므로 다른곳에서 구현후 import해서 재사용해야할수도 있음
  };

  const LogoComponent = (
    <Logo
      width={isMobile || isTablet ? "6rem" : "8rem"}
      onClick={LogoClickHandler}
    />
  );
  const Buttons =
    currentPath === "/main" ? (
      <>
        <AIcon
          icon={SearchIcon}
          onClick={SearchClickHandler}
          size={isMobile || isTablet ? "medium" : "large"}
          key={"search"}
        />
        <AIcon
          icon={SignOutIcon}
          onClick={SignOutClickHandler}
          size={isMobile || isTablet ? "medium" : "large"}
          key={"signout"}
        />
      </>
    ) : null;

  return (
    <div className={styles.header}>
      {LogoComponent}
      <div className={styles.buttonwrapper}>{Buttons}</div>
      <SearchModal
        open={searchModalOpen}
        size={isMobile || isTablet ? "medium" : "large"}
        onCancel={() => {
          setSearchModalOpen(false);
        }}
      />
    </div>
  );
};

export default Header;
