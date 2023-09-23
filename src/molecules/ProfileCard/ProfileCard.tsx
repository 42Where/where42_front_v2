import { Fragment } from "react";
import Image from "next/image";

import FunctionButton from "&/Icons/functionButton.svg";

import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import cardStyles from "./ProfileCard.module.css";
import textStyles from "./ProfileText.module.css";

type ProfileCardProps = {
  /**
   * 사용자의 아이디입니다.
   */
  loginId: string;
  /**
   * 사용자의 위치입니다.
   */
  location?: string;
  /**
   * 사용자의 한줄소개입니다.
   */
  userComment?: string;
  /**
   * 프로필사진의 URL입니다.
   */
  profileImageSrc?: string;
  /**
   * 컴포넌트의 크기입니다.
   * large는 본인의 프로필카드로 사용합니다.
   *  - 추가기능이 많이 필요할경우에 본인 프로필은 별도 컴포넌트로 분리해야할수도 있음.
   * medium/small은 다른 사용자의 프로필카드로 사용합니다.
   */
  size?: "small" | "medium" | "large";
  /**
   * 사용자의 위치 정보 이용 동의 여부입니다.
   * 지금은 사용하지 않지만 동의 여부에 따라서 퇴근/위치 정보 없음 등을 표시하는 정책 결정 필요.
   * TODO? 동의를 하지않아 상세 위치를 제공할수 없을때 안내하는 문구나 아이콘을 추가하면 좋을수도 있음.
   */
  isLocationUseAgreed?: boolean;
  /**
   * 프로필사진을 클릭했을 때 실행할 함수입니다.
   */
  profileImageOnClick?: () => void;
  /**
   * 기능버튼을 클릭했을 때 실행할 함수입니다.
   * 추후에 본인일경우 설정 아이콘을 표시하거나 모달을 띄우는 등의 기능이 필요할 수 있음.
   */
  functionButtonOnClick?: () => void;
  // api 연동후에는 api 형식에 맞게 props를 수정해야함.
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  loginId,
  location,
  userComment,
  profileImageSrc,
  size = "medium",
  isLocationUseAgreed = false,
  profileImageOnClick,
  functionButtonOnClick,
}) => {
  const profileCardClassName = `${cardStyles["profile-card"]} ${
    cardStyles["profile-card--" + size]
  }`;
  const profileCardContentLayoutClassName = `${
    cardStyles["profile-card-content-layout"]
  } ${cardStyles["profile-card-content-layout--" + size]}`;

  return (
    <div className={profileCardClassName}>
      <div className={profileCardContentLayoutClassName}>
        <ProfileImage
          loginId={loginId}
          src={profileImageSrc}
          isActive={location !== undefined ? true : false}
          size={size}
          onClick={profileImageOnClick}
        />
        <ProfileText
          loginId={loginId}
          location={location}
          userComment={userComment}
          size={size}
          isLocationUseAgreed={isLocationUseAgreed}
        />
      </div>
      <Image
        src={FunctionButton}
        alt="functionButton"
        onClick={functionButtonOnClick}
      />
    </div>
  );
};

const ProfileText: React.FC<ProfileCardProps> = ({
  loginId,
  location,
  userComment,
  size = "medium",
  isLocationUseAgreed = false,
}) => {
  const profileCardTextClassName = `${textStyles["profile-text"]} ${
    textStyles["profile-text--" + size]
  }`;
  const profileCardLoginIdStyleClassName = `${
    textStyles["profile-text-login-id-style"]
  } ${textStyles["profile-text-login-id-style--" + size]}`;

  let loginIdClassName;
  let locationClassName;
  let userCommentClassName;
  // 타이포그래피 적용 후 글로벌 타이포그래피 사용 필요

  switch (size) {
    case "large":
      loginIdClassName = textStyles["profile-text-h5"];
      locationClassName = textStyles["profile-text-h4"];
      userCommentClassName = textStyles["profile-text-body3"];
      break;
    case "medium":
      loginIdClassName = textStyles["profile-text-h5"];
      locationClassName = textStyles["profile-text-h5"];
      userCommentClassName = textStyles["profile-text-small"];
      break;
    case "small":
      loginIdClassName = textStyles["profile-text-h6"];
      locationClassName = textStyles["profile-text-h6"];
      userCommentClassName = textStyles["profile-text-small2"];
      break;
  }

  return (
    <div className={profileCardTextClassName}>
      <div className={profileCardLoginIdStyleClassName}>
        <span className={loginIdClassName}>{loginId}</span>
      </div>
      {size === "large" ? (
        <div className={textStyles["profile-text-large-layout"]}>
          <div className={textStyles["profile-text-location-style"]}>
            <div className={locationClassName}>{location ?? "퇴근"}</div>
          </div>
          <div className={textStyles["profile-text-comment-style"]}>
            <div className={userCommentClassName}>{userComment}</div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className={textStyles["profile-text-location-style"]}>
            <div className={locationClassName}>{location ?? "퇴근"}</div>
          </div>
          <div className={textStyles["profile-text-comment-style"]}>
            <div className={userCommentClassName}>{userComment}</div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ProfileCard;
