import React from "react";

import useDropdownStore, { DropdownCellArg } from "@/stores/useDropdownStore";
import styles from "./DropdownCell.module.scss";

type DropdownCellProps = DropdownCellArg & {
  isDisable?: boolean;
  setIsDisable?: (isDisable: boolean) => void;
  size: "small" | "medium" | "large";
};

const DropdownCell: React.FC<DropdownCellProps> = ({
  text,
  isDanger = false,
  size,
  onClick,
}) => {
  const { isDisable, setIsDisable } = useDropdownStore();

  const className =
    styles["dropdown-cell"] +
    " " +
    styles[`dropdown-cell--${size}`] +
    " " +
    (isDanger ? styles["dropdown-cell--danger"] : "") +
    " " +
    (isDisable ? styles["dropdown-cell--disable"] : "");

  return (
    <li className={className} onClick={isDisable ? undefined : onClick}>
      {text}
    </li>
  );
};

export default DropdownCell;
