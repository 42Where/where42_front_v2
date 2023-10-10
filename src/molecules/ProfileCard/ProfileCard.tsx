import FunctionButtonIcon from "&/Icons/functionButton.svg";
import UserAddIcon from "&/Icons/userAdd.svg";
import User from "@/types/User";
import { Size } from "@/types/enums";
import IconButton from "@/atoms/buttons/IconButton/IconButton";
import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

import styles from "./ProfileCard.module.scss";
import ProfileText from "./ProfileText";

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
  profileImageOnClick?: React.MouseEventHandler;
  /**
   * 기능버튼을 클릭했을 때 실행할 함수입니다.
   * 추후에 본인일경우 설정 아이콘을 표시하거나 모달을 띄우는 등의 기능이 필요할 수 있음.   */
  functionButtonOnClick?: React.MouseEventHandler;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  size,
  profileImageOnClick,
  functionButtonOnClick,
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
      <IconButton
        Icon={user.isFriend ? FunctionButtonIcon : UserAddIcon}
        size={size}
        onClick={functionButtonOnClick}
      />
    </div>
  );
};

export default ProfileCard;
