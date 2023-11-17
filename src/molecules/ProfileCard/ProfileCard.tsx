import React from "react";
import User from "@/types/User";
import { Size } from "@/types/enums";

import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileText from "./ProfileText";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

import styles from "./ProfileCard.module.scss";

type ProfileCardProps = {
  /**
   * 사용자 정보
   * undefined일 경우에는 스켈레톤 표시
   */
  user?: User;
  /**
   * 컴포넌트의 크기입니다.
   */
  size: Size;
  /**
   * 프로필사진을 클릭했을 때 실행할 함수입니다.
   */
  profileImageOnClick?: () => void;
  /**
   * 기능버튼
   * 친구가 아닐경우 친구추가 아이콘을 표시합니다.
   * 친구일 경우 기능버튼을 표시합니다.
   * 체크박스를 표시할 수도 있습니다.
   */
  children?: React.ReactNode;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  size,
  children,
  profileImageOnClick,
}) => {
  if (user === undefined) {
    return <ProfileCardSkeleton size={size} />;
  }

  const profileCardStyle =
    styles["profile-card"] + " " + styles["profile-card--" + size];
  const ContentStyle =
    styles["profile-card__content"] +
    " " +
    styles["profile-card__content--" + size];

  return (
    <div className={profileCardStyle}>
      <div className={ContentStyle}>
        <ProfileImage user={user} size={size} onClick={profileImageOnClick} />
        <ProfileText user={user} size={size} />
      </div>
      {/* 기능버튼 */}
      {children}
    </div>
  );
};

export default React.memo(ProfileCard);
