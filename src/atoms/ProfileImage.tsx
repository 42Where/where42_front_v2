import { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ProfileImage.module.css";

import DefaultProfileImage from "../../public/Common/DefaultProfileImageLarge.svg";

/**
- 사용자의 프로필사진과 출석여부를 표시하는 컴포넌트입니다.
- src가 주어지지 않으면 기본 프로필사진을 표시합니다.
- active가 true이면 테두리를 표시합니다.
- size가 medium이면 96x96, large이면 128x128 크기로 표시합니다.
**/

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

ProfileImage.propTypes = {
  /**
   *프로필사진의 URL입니다.
   */
  src: PropTypes.string,
  /**
   *사용자의 출석여부를 표시합니다.
   */
  active: PropTypes.bool,
  /**
   *프로필사진의 크기입니다.
   */
  size: PropTypes.oneOf(["medium", "large", undefined, null]),
};

export default ProfileImage;
