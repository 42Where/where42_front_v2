import React, { useCallback, useEffect, useRef } from "react";

import useDropdownStore from "@/stores/useDropdownStore";
import DropdownCell from "./DropdownCell";

import styles from "./DropdownMenu.module.scss";

// TODO: 일단 구현은 했는데 모달창 위에서 드롭다운이 떠야할경우 어떻게 할지 생각 필요
const DropdownMenu: React.FC = () => {
  const { isOpen, cellArgs, position, size, closeDropdown } =
    useDropdownStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    },
    [closeDropdown, menuRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const menuClassName =
    styles["dropdown-menu"] + " " + styles["dropdown-menu--" + size];

  return (
    <>
      {isOpen ? (
        <div
          className={menuClassName}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
          }}
          ref={menuRef}>
          <ul>
            {cellArgs.map(({ text, isDanger, onClick }, index) => (
              <DropdownCell
                key={index}
                text={text}
                isDanger={isDanger}
                onClick={onClick}
                size={size}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default DropdownMenu;
