import { Size } from "@/types/enums";

import styles from "./ProfileSkeleton.module.scss";

const ProfileSkeleton: React.FC<{ size: Size }> = ({ size }) => {
  const skeletonStyle = styles["skeleton"] + " " + styles["skeleton--" + size];
  const skeletonImageStyle =
    styles["skeleton__image"] + " " + styles["skeleton__image--" + size];
  const skeletonTextWrapperStyle =
    styles["skeleton__text-box"] + " " + styles["skeleton__text-box--" + size];
  const skeletonTextStyle =
    styles["skeleton__text"] + " " + styles["skeleton__text--" + size];

  return (
    <div className={skeletonStyle}>
      <div className={skeletonImageStyle} />
      <div className={skeletonTextWrapperStyle}>
        <div className={skeletonTextStyle} />
        <div className={skeletonTextStyle} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
