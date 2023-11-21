import React, { useCallback, useState } from "react";
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
  onClick,
}) => {
  const [imageSrc, setImageSrc] = useState(profileImgSrc);

  const imageErrorHandler = () => {
    setImageSrc(DefaultProfileImage);
  };

  const defaultOnClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.open(`https://profile.intra.42.fr/users/${login}`, "_blank");
    },
    [login]
  );

  const imageSize = size === "small" ? 64 : size === "medium" ? 96 : 128;

  const ProfileImageClassName =
    styles["profile-image"] + " " + styles[`profile-image--${size}`];
  const indicatorClassName =
    styles["profile-image__indicator"] +
    " " +
    styles[`profile-image__indicator--${size}`];
  const ImageClassName =
    styles["profile-image__image"] +
    " " +
    styles[`profile-image__image--${size}`];

  return (
    <div className={ProfileImageClassName} onClick={onClick ?? defaultOnClick}>
      {location ? <div className={indicatorClassName} /> : null}
      <Image
        className={ImageClassName}
        src={imageSrc}
        width={imageSize}
        height={imageSize}
        alt={login}
        placeholder="empty"
        onError={imageErrorHandler}
        unoptimized={true}
        priority={true}
      />
    </div>
  );
};

export default React.memo(ProfileImage, (prevProps, nextProps) => {
  return (
    prevProps.user.login === nextProps.user.login &&
    prevProps.user.profileImgSrc === nextProps.user.profileImgSrc &&
    prevProps.user.location === nextProps.user.location &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.size === nextProps.size
  );
});
