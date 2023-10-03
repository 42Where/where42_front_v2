import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  /**
   * Is primary or secondary
   *
   * true: Primary
   * false: Secondary
   *
   * default: Primary
   */
  primary?: boolean;
  /**
   * size
   *
   * Small Medium Large
   *
   * default: Medium
   */
  size?: "Small" | "Medium" | "Large";
  /**
   * Optional Icon
   *
   * public/Common 에 존재하는 모든 icon 을 사용할 수 있어야합니다.
   * 향후에 enum 으로 만들면 좋을 것 같기도?!
   */
  icon?: string;
  /**
   * Optional click event handler
   */
  onClick?: () => void;
  /**
   * children
   */
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  primary = true,
  size = "Medium",
  children,
  ...props
}) => {
  const mode = primary ? styles["button-primary"] : styles["button-secondary"];

  const classNames = [styles["button"], styles[`button-${size}`], mode].join(
    " ",
  );

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
