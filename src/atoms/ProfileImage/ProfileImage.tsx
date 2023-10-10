import { useState } from "react";
import Image from "next/image";

import DefaultProfileImage from "&/Common/defaultProfileImageLarge.svg";
import User from "@/types/User";
import { Size } from "@/types/enums";

import styles from "./ProfileImage.module.scss";

type ProfileImageProps = {
  user: User;
  size: Size;
  onClick?: React.MouseEventHandler;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  user: { login, profileImgSrc = DefaultProfileImage, location },
  size,
  onClick = () => {},
}) => {
  const [imageSrc, setImageSrc] = useState(profileImgSrc);

  const imageErrorHandler = () => {
    setImageSrc(DefaultProfileImage);
  };

  const imageSize = size === "small" ? 64 : size === "medium" ? 96 : 128;

  const ProfileImageClassName =
    styles["profile-image"] + " " + styles[`profile-image--${size}`];
  const indicatorClassName =
    styles["profile-image__indicator"] +
    " " +
    styles[`profile-image__indicator--${size}`];
  const ImageClassName = styles["profile-image__image"];

  return (
    <div className={ProfileImageClassName} onClick={onClick}>
      {location ? <div className={indicatorClassName} /> : null}
      <Image
        className={ImageClassName}
        src={imageSrc}
        width={imageSize}
        height={imageSize}
        alt={`${login}'s profile image`}
        placeholder="empty"
        onError={imageErrorHandler}
      />
    </div>
  );
};

export default ProfileImage;
