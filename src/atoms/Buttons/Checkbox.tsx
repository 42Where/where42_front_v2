import Image from "next/image";
import { Fragment } from "react";

import CheckImage from "&/Icons/Checkbox/check.svg";
import UncheckImage from "&/Icons/Checkbox/uncheck.svg";

// import styles from "./Checkbox.module.css";

interface CheckboxProps {
  /**
   * 체크 여부
   */
  value?: boolean;
  /**
   * size
   * small/medium/large
   * default: medium
   */
  size?: "small" | "medium" | "large";
  /**
   * 상위 컴포넌트에서 전달받는 onClick 함수
   */
  onClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value = false,
  size = "medium",
  onClick,
}) => {
  let imageSize;

  switch (size) {
    case "small":
      imageSize = 16;
      break;
    case "medium":
      imageSize = 24;
      break;
    case "large":
      imageSize = 32;
      break;
  }

  return (
    <Image
      src={value ? CheckImage : UncheckImage}
      width={imageSize}
      height={imageSize}
      alt="checkbox"
      onClick={onClick}
    />
  );
};

export default Checkbox;
