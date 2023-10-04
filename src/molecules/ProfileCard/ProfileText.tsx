import User from "@/types/User";
import { Size } from "@/types/enums";
import TextBox from "@/atoms/TextBox/TextBox";

import styles from "./ProfileText.module.scss";

type ProfileTextProps = {
  /**
   * 표시할 텍스트 정보가 들어있는 User 객체입니다.
   */
  user: User;
  /**
   * 컴포넌트의 크기입니다.
   */
  size: Size;
};

const ProfileText: React.FC<ProfileTextProps> = ({ user, size }) => {
  const profileTextStyle =
    styles["profile-text"] + " " + styles["profile-text--" + size];
  const mainTextStyle = styles["profile-text__main-text"];
  const loginStyle =
    styles["profile-text__login"] +
    " " +
    styles["profile-text__login--" + size];
  const commentStyle =
    styles["profile-text__comment"] +
    " " +
    styles["profile-text__comment--" + size];

  const locationText = user.location ? user.location : "퇴근";
  // TODO: 백엔드 api 구현 후에 로직 변경 필요할수도 있음

  return (
    <div className={profileTextStyle}>
      <div className={mainTextStyle}>
        <div className={loginStyle}>{user.login}</div>
        <TextBox
          text={locationText}
          primary={user.location !== undefined}
          size={size}
        />
      </div>
      {user.comment === "" ? null : (
        <div className={commentStyle}>{user.comment}</div>
      )}
    </div>
  );
};

export default ProfileText;
