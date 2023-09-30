import Image from "next/image";
import { Fragment } from "react";

import CheckImage from "&/Icons/Checkbox/check.svg";
import UncheckImage from "&/Icons/Checkbox/uncheck.svg";

// import styles from "./Checkbox.module.css";

interface CheckboxProps {
  /**
   * 체크 여부
   */
  isChecked: boolean;
  /**
   * size
   * small/medium/large
   * default: medium
   */
  size: "small" | "medium" | "large";
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, size }) => {
  // TODO: ts 파일 내에서도 성능문제 없이 rem값을 사용할수 있는지 확인 필요
  // recoil로 rem값을 관리하는 방법도 고려해볼것
  const imageSize = size === "small" ? 16 : size === "medium" ? 24 : 32;

  return (
    <Image
      src={isChecked ? CheckImage : UncheckImage}
      width={imageSize}
      height={imageSize}
      alt="checkbox"
    />
  );
};

export default Checkbox;
