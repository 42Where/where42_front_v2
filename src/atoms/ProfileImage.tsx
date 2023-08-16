import { useState } from "react";
import Image from "next/image";
import styles from "./ProfileImage.module.css";

import DefaultProfileImage from "../../../public/Common/DefaultProfileImageLarge.svg";

type ProfileImageProps = {
  /**
   *프로필사진의 URL입니다.
   */
  src?: string;
  /**
   *사용자의 출석여부를 표시합니다.
   */
  active?: boolean;
  /**
   *프로필사진의 크기입니다.
   * - 모바일용 small 구현 필요할수도 있음
   */
  size?: "medium" | "large";
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = undefined,
  active = false,
  size = "medium",
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const imageErrorHandler = () => {
    setImageSrc(DefaultProfileImage);
  };

  const mode = active ? "active" : "inactive";

  const borderClassNames = `${styles["profile-image-border"]} ${
    styles[`profile-image-border--${mode}`]
  } ${styles[`profile-image--${size}`]}`;
  const imageClassNames = `${styles["profile-image"]} ${
    styles[`profile-image--${size}`]
  }`;

  return (
    <div>
      <div className={borderClassNames}>
        <div className={styles["profile-image-border-inner"]} />
      </div>
      <Image
        className={imageClassNames}
        src={imageSrc ? imageSrc : DefaultProfileImage}
        width={size === "large" ? 128 : 96}
        height={size === "large" ? 128 : 96}
        alt={"ProfileImage"}
        onError={imageErrorHandler}
      />
    </div>
  );
};

export default ProfileImage;
