import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import DefaultProfileImage from "&/Common/defaultProfileImageLarge.svg";

import User from "@/types/User";

import styles from "./ProfileImage.module.css";

type ProfileImageProps = {
  user: Pick<User, "intraId" | "intraName" | "image" | "location">;
  onClick?: React.MouseEventHandler;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  user: { intraName, image, location },
  onClick,
}) => {
  const [imageComponent, setImageComponent] = useState<React.ReactNode>(<></>);

  const defaultOnClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.open(`https://profile.intra.42.fr/users/${intraName}`, "_blank");
    },
    [intraName]
  );

  const imageErrorHandler = useCallback(() => {
    setImageComponent(<DefaultProfileImage width={"100%"} height={"100%"} />);
  }, []);

  useEffect(() => {
    setImageComponent(
      // TODO: image에 null이 들어올 경우에 이미지 사이즈 깨지는것 수정
      <Image
        className={styles.profile_image + " " + styles.image}
        src={image ?? DefaultProfileImage}
        width={128}
        height={128}
        alt={intraName}
        placeholder="empty"
        onError={imageErrorHandler}
        priority={true}
      />
    );
  }, [image, intraName, imageErrorHandler]);

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
