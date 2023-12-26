import React from "react";
import { Button, ButtonProps } from "antd";

import styles from "./AFloatButton.module.css";

type AFloatButtonProps = {
  isVisible: boolean;
  buttonProps: ButtonProps[];
};

const AFloatButton: React.FC<AFloatButtonProps> = ({
  buttonProps,
  isVisible,
}) => {
  const buttonWrapper = isVisible ? (
    <div className={styles.wrapper}>
      {buttonProps.map((props) => (
        <Button key={props.name} {...props} className="shadow-md bg-white" />
      ))}
    </div>
  ) : null;

  return buttonWrapper;
};

export default AFloatButton;
