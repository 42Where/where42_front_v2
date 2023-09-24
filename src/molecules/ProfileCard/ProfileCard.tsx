import { Size } from "@/Types/enums";
import User from "@/Types/User";
import ProfileImage from "@/atoms/ProfileImage/ProfileImage";

import cardStyles from "./ProfileCard.module.scss";
import textStyles from "./ProfileText.module.scss";

export type ProfileCardProps = {
  /**
   * 사용자 정보입니다.
   */
  user: User;
  /**
   * 컴포넌트의 크기입니다.
   */
  size?: Size;
  /**
   * 기능버튼에 사용할 아이콘 버튼입니다
   */
  children?: React.ReactNode;
  // api 연동후에는 api 형식에 맞게 props를 수정해야함.
};

/**
 * 다른 사용자의 프로필 컴포넌트로 사용합니다.
 * TODO: useMemo를 사용하여 불필요한 렌더링을 방지하도록 최적화가 필요합니다.
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  size = Size.Medium,
  children,
}) => {
  const profileCardClassName = `${cardStyles["profilecard"]} ${
    cardStyles["profilecard--" + size]
  }`;
  const profileCardContentClassName = `${cardStyles["profilecard__content"]} ${
    cardStyles["profilecard__content--" + size]
  }`;

  return (
    <div className={profileCardClassName}>
      <div className={profileCardContentClassName}>
        <ProfileImage user={user} size={size} />
        <ProfileText user={user} size={size} />
      </div>
      {children}
    </div>
  );
};

const ProfileText: React.FC<ProfileCardProps> = ({
  user: { login, location, comment },
  size,
}) => {
  const profileTextClassName = `${textStyles["profiletext"]} ${
    textStyles["profiletext--" + size]
  }`;
  const loginClassName = `${textStyles["profiletext__login"]} ${
    textStyles["profiletext__login--" + size]
  }`;
  const locationClassName = `${textStyles["profiletext__location"]} ${
    textStyles["profiletext__location--" + size]
  }`;
  const commentClassName = `${textStyles["profiletext__comment"]} ${
    textStyles["profiletext__comment--" + size]
  }`;

  return (
    <div className={profileTextClassName}>
      <div className={loginClassName}>{login}</div>
      <div className={locationClassName}>{location ?? "퇴근"}</div>
      <div className={commentClassName}>{comment}</div>
    </div>
  );
};

export default ProfileCard;
