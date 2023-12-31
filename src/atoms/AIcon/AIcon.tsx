import Icon from "@ant-design/icons/lib/components/Icon";

import { Size } from "@/types/enums";
import React from "react";

type AIconProps = {
  icon: React.FC<any>;
  onClick?: React.MouseEventHandler;
  size: Size;
};

const AIcon: React.FC<AIconProps> = ({ icon, onClick, size = "medium" }) => {
  const length =
    size === "small" ? "1rem" : size === "medium" ? "1.5rem" : "2rem";
  return (
    <Icon
      style={{ fontSize: length }}
      className={onClick ? "cursor-pointer" : ""}
      component={icon}
      onClick={onClick}
    />
  );
};

export default AIcon;
