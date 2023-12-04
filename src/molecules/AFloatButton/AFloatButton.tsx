import React from "react";

import { Button, ButtonProps } from "antd";

type AFloatButtonProps = {
  isVisible: boolean;
  buttonProps: ButtonProps[];
};

const AFloatButton = ({ buttonProps, isVisible }: AFloatButtonProps) => {
  const buttonWrapper = isVisible ? (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      {buttonProps.map((props) => {
        return (
          <Button
            key={props.name}
            {...props}
            style={{
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            }}
          />
        );
      })}
    </div>
  ) : null;

  return buttonWrapper;
};

export default AFloatButton;
