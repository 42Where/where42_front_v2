import { useState } from "react";
import Image from "next/image";

import imageStyles from "./ProfileImage.module.css";
import indicatorStyles from "./ProfileImageActiveIndicator.module.css";

import DefaultProfileImage from "&/Common/defaultProfileImageLarge.svg";

type ProfileImageProps = {
  /**
   * 사용자의 아이디입니다.
   * Imaged의 alt로 사용됩니다. 인자가 없을경우 "ProfileImage"가 사용됩니다.
   */
  loginId?: string;
  /**
   * 프로필사진의 URL입니다.
   * 인자가 들어오지 않거나 이미지 로딩에 실패할경우 기본 이미지파일을 사용합니다.
   */
  src?: string;
  /**
   * 사용자의 출석여부를 의미합니다.
   * 출석했을경우 테두리와 활성화 아이콘이 표시됩니다.
   */
  isActive?: boolean;
  /**
   * 프로필사진의 크기입니다.
   * small: 64px, medium: 96px, large: 128px
   */
  size?: "small" | "medium" | "large";
  /**
   * 프로필사진을 클릭했을때 실행되는 함수입니다.
   */
  onClick?: () => void;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  loginId = "ProfileImage",
  src = DefaultProfileImage,
  isActive = false,
  size = "medium",
  onClick = () => {},
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const imageErrorHandler = () => {
    setImageSrc(DefaultProfileImage);
  };

  const mode = isActive ? "active" : "inactive";
  let imageSize;

  switch (size) {
    case "large":
      imageSize = 128;
      break;
    case "medium":
      imageSize = 96;
      break;
    case "small":
      imageSize = 64;
      break;
    default:
      imageSize = 96;
      break;
  }

  const imageSizeClassName = imageStyles[`profile-image--${size}`];
  const indicatorClassName = indicatorStyles[`active-indicator--${mode}`];
  const indicatorBorderClassName = `${
    indicatorStyles["active-indicator__border"]
  } ${indicatorStyles[`active-indicator__border--${size}`]}`;
  const indicatorDotClassName = `${indicatorStyles["active-indicator__dot"]} ${
    indicatorStyles[`active-indicator__dot--${size}`]
  }`;

  return (
    <div className={imageSizeClassName} onClick={onClick}>
      <div className={indicatorClassName}>
        <div className={indicatorBorderClassName}>
          <div className={indicatorDotClassName} />
        </div>
      </div>
      <Image
        className={imageStyles["profile-image__image"]}
        src={imageSrc}
        width={imageSize}
        height={imageSize}
        alt={loginId}
        onError={imageErrorHandler}
      />
    </div>
  );
};

export default ProfileImage;
