import { useState } from "react";
import Image from "next/image";
import DefaultProfileImage from "&/Common/defaultProfileImageLarge.svg";

import { Size } from "@/atoms/types/enums";
import User from "@/atoms/types/User";

import imageStyles from "./ProfileImage.module.scss";
import indicatorStyles from "./ProfileImageIndicator.module.scss";
import Link from "next/link";

type ProfileImageProps = {
  /**
   * 사용자 정보입니다.
   * login, profileImgSrc, location만 사용합니다.
   */
  user: User;
  /**
   * 프로필사진의 크기입니다.
   * small: 64px, medium: 96px, large: 128px
   */
  size?: Size;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  user: { login, profileImgSrc = "", location },
  size = Size.Medium,
}) => {
  const [imageSrc, setImageSrc] = useState(profileImgSrc);

  const imageErrorHandler = () => {
    setImageSrc(DefaultProfileImage);
  };

  const mode = location !== undefined ? "active" : "inactive";
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
  }

  const imageSizeClassName = imageStyles[`profileimage--${size}`];
  const indicatorClassName = indicatorStyles[`indicator--${mode}`];
  const indicatorBorderClassName = `${indicatorStyles["indicator__border"]} ${
    indicatorStyles[`indicator__border--${size}`]
  }`;
  const indicatorDotClassName = `${indicatorStyles["indicator__dot"]} ${
    indicatorStyles[`indicator__dot--${size}`]
  }`;

  return (
    <Link
      className={imageSizeClassName}
      href={`https://profile.intra.42.fr/users/${login}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={indicatorClassName}>
        <div className={indicatorBorderClassName}>
          <div className={indicatorDotClassName} />
        </div>
      </div>
      <Image
        className={imageStyles["profileimage__image"]}
        src={imageSrc}
        width={imageSize}
        height={imageSize}
        alt={login + "'s profile image"}
        onError={imageErrorHandler}
        unoptimized={true}
      />
    </Link>
  );
};

export default ProfileImage;
