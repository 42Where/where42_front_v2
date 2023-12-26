import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import DefaultProfileImage from "&/Common/defaultProfileImageLarge.svg";

import User from "@/types/User";

import styles from "./ProfileImage.module.css";

type ProfileImageProps = {
  user: Pick<User, "id" | "login" | "profileImgSrc" | "location">;
  onClick?: React.MouseEventHandler;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  user: { login, profileImgSrc, location },
  onClick,
}) => {
  const [imageComponent, setImageComponent] = useState<React.ReactNode>(<></>);

  const defaultOnClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.open(`https://profile.intra.42.fr/users/${login}`, "_blank");
    },
    [login]
  );

  const imageErrorHandler = useCallback(() => {
    setImageComponent(<DefaultProfileImage width={"100%"} height={"100%"} />);
  }, []);

  useEffect(() => {
    setImageComponent(
      <Image
        className={styles.profile_image + " " + styles.image}
        src={profileImgSrc}
        width={128}
        height={128}
        alt={login}
        placeholder="empty"
        onError={imageErrorHandler}
        priority={true}
      />
    );
  }, [profileImgSrc, login, imageErrorHandler]);

  return (
    <div
      className={styles.profile_image + " " + styles.wrapper}
      onClick={onClick ?? defaultOnClick}
    >
      {location ? (
        <div className={styles.profile_image + " " + styles.indicator} />
      ) : null}
      {imageComponent}
    </div>
  );
};

export default ProfileImage;
