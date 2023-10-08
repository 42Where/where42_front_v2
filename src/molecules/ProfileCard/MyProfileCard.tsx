import SettingIcon from "&/Icons/setting.svg";
import NewGroupIcon from "&/Icons/newGroup.svg";
import User from "@/types/User";
import { Size } from "@/types/enums";
import IconButton from "@/atoms/buttons/IconButton/IconButton";
import IconTextButton from "@/atoms/buttons/IconButton/IconTextButton";
import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileText from "./ProfileText";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

import styles from "./MyProfileCard.module.scss";
import Checkbox from "@/atoms/buttons/Checkbox/Checkbox";

type MyProfileCardProps = {
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
   * 프로필사진을 클릭했을 때 실행할 함수입니다. - 아마도 새창에서 인트라 프로필 페이지
   */
  profileImageOnClick?: () => void;
  /**
   * 기능버튼을 클릭했을 때 실행할 함수입니다. - 아마도 설정 모달이나 드롭다운
   */
  functionButtonOnClick?: () => void;
  /**
   * 출석한 친구만 보기 토글 함수와 값 - 추후에 zustand로 관리
   */
  attendanceOnly?: { state: boolean; toggle: () => void };
  /**
   * 자리비움 토글 함수와 값 - 추후에 zustand로 관리
   */
  stepOut?: { state: boolean; toggle: () => void };
  /**
   * 새 그룹 생성 함수
   */
  newGroup?: () => void;
  // TODO: api 구현 이후에 자기자신을 의미하는 타입 정의 필요
};

const MyProfileCard: React.FC<MyProfileCardProps> = ({
  user,
  size,
  profileImageOnClick,
  functionButtonOnClick,
  attendanceOnly = { state: false, toggle: () => {} },
  stepOut = { state: false, toggle: () => {} },
  newGroup = () => {},
}) => {
  if (user === undefined) {
    return <ProfileCardSkeleton size={size} />;
  }

  const myProfileCardStyle =
    styles["my-profile-card"] + " " + styles["my-profile-card--" + size];
  const contentStyle =
    styles["profile-card__content"] +
    " " +
    styles["profile-card__content--" + size];
  const iconsStyle =
    styles["my-profile-card__icons"] +
    " " +
    styles["my-profile-card__icons--" + size];

  return (
    <div className={myProfileCardStyle}>
      <div className={contentStyle}>
        <ProfileImage user={user} size={size} onClick={profileImageOnClick} />
        <div></div>
        <ProfileText user={user} size={size} />
      </div>
      <IconButton
        Icon={SettingIcon}
        size={"large"}
        onClick={functionButtonOnClick}
      />
      <div className={iconsStyle}>
        <IconTextButton
          text="출근한 친구만 보기"
          size="small"
          onClick={attendanceOnly.toggle}
        >
          <Checkbox isChecked={attendanceOnly.state} size="small" />
        </IconTextButton>
        <IconTextButton text="새 그룹" size="small" onClick={newGroup}>
          <IconButton Icon={NewGroupIcon} size="small" />
        </IconTextButton>
      </div>
    </div>
  );
};

export default MyProfileCard;
