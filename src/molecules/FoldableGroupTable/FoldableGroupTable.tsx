import React, { useState } from "react";
import PencilIcon from "&/Icons/pencil.svg";
import FoldAngleUp from "&/Icons/foldAngleUp.svg";
import FoldAngleDown from "&/Icons/foldAngleDown.svg";

import User from "@/types/User";
import { Size } from "@/types/enums";
import UserTable from "../UserTable/UserTable";
import IconButton from "@/atoms/buttons/IconButton/IconButton";
import useToggle from "@/atoms/Hooks/useToggle/useToggle";

import styles from "./FoldableGroupTable.module.scss";

type FoldableGroupTableProps = {
  groupTitle: string;
  users?: (User & { isChecked?: boolean })[];
  size: Size;
};

const FoldableGroupTable: React.FC<FoldableGroupTableProps> = ({
  groupTitle,
  users,
  size,
}) => {
  const [isFolded, toggleIsFolded] = useToggle(true);
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);

  const FoldClickHandler = () => {
    (toggleIsFolded as () => void)();
    // 임시구현
    // TODO: onClick 구조변경 반영후에 이벤트도 여기서 처리해야함
  };
  const EditClickHandler = () => {
    (toggleIsInEditMode as () => void)();
    // 임시구현
    // TODO: onClick 구조변경 반영후에 이벤트도 여기서 처리해야함
    // 클릭시 드롭다운창 열기 구현 필요
    // 드롭다운 메뉴에서 수정 선택시 자동으로 열리는 기능 구현 필요
  };
  return (
    <div className={styles.group}>
      <div className={styles.group__header}>
        <div className={styles.group__textbox}>
          <span className={styles.group__name}>{groupTitle}</span>
          <span className={styles.group__count}>
            {users?.filter((user) => user?.isFriend ?? false).length}/
            {users?.length}
          </span>
        </div>
        <div className={styles.group__buttonbox}>
          <IconButton
            Icon={PencilIcon}
            size={"medium"}
            onClick={EditClickHandler}
          />
          <IconButton
            Icon={isFolded ? FoldAngleDown : FoldAngleUp}
            size={"medium"}
            onClick={FoldClickHandler}
          />
        </div>
      </div>
      {/* {isFolded ? null : (
        <UserTable
          users={users}
          isInEditMode={isInEditMode as boolean}
          size={size}
        />
      )} */}
      {/* TODO: CSS로 접는것을 구현할지 리액트 State로 구현할지 논의 필요 */}
      <div className={isFolded ? styles.fold : styles.unfold}>
        <UserTable
          users={users}
          isInEditMode={isInEditMode as boolean}
          size={size}
        />
      </div>
    </div>
  );
};

export default FoldableGroupTable;
