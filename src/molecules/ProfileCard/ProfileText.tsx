import React from "react";

import User from "@/types/User";
import TextBox from "@/atoms/TextBox/TextBox";

import styles from "./ProfileText.module.css";

type ProfileTextProps = {
  /**
   * 표시할 텍스트 정보가 들어있는 User 객체입니다.
   */
  user: User;
};

const ProfileText: React.FC<ProfileTextProps> = ({ user }) => {
  const locationText = user.location ? user.location : "퇴근";
  // TODO: 백엔드 api 구현 후에 로직 변경 필요할수도 있음

  return (
    <div className={styles.profile_text}>
      <div className={styles.main}>
        <div className={styles.login}>{user.intraName}</div>
        <TextBox text={locationText} primary={locationText !== "퇴근"} />
      </div>
      {user.comment && <div className={styles.comment}>{user.comment}</div>}
    </div>
  );
};

export default ProfileText;
