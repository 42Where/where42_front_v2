import React, { useCallback, useEffect, useState } from "react";

import CheckIcon from "&/Icons/Checkbox/check.svg";
import UncheckIcon from "&/Icons/Checkbox/uncheck.svg";
import FoldAngleUp from "&/Icons/foldAngleUp.svg";
import FoldAngleDown from "&/Icons/foldAngleDown.svg";

// import User from "@/types/User";
import Group from "@/types/Group";
import { Size } from "@/types/enums";
import useUserStore from "@/stores/useUserStore";
import useGroupStore from "@/stores/useGroupStore";

import AIcon from "@/atoms/AIcon/AIcon";
import UserTable from "@/molecules/UserTable/UserTable";
import FoldableGroupEditButton from "./FoldableGroupEditButton";

import styles from "./FoldableGroupTable.module.css";
import { useSize } from "@/utils/MediaQuary";

type FoldableGroupTableProps = {
  userGroup: Group;
};

const FoldableGroupTable: React.FC<FoldableGroupTableProps> = ({
  userGroup,
}) => {
  const { finishEditGroup, openGroup, closeGroup } = useGroupStore(
    (state) => state
  );
  const attendanceOnly = useUserStore((state) => state.attendanceOnly);
  const [isCheckedSet, setIsCheckedSet] = useState<Set<number>>(new Set());
  const IconSize = useSize();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finishEditGroup();
        setIsCheckedSet(new Set());
      }
    };

    if (userGroup.isInEdit) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [userGroup.isInEdit, finishEditGroup]);

  const foldGroup = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (userGroup.isFolded) openGroup(userGroup.groupId);
      else closeGroup(userGroup.groupId);
    },
    [userGroup.groupId, userGroup.isFolded, openGroup, closeGroup]
  );

  const userList = userGroup.members
    // 타입 변경하면 로직 변경 필요
    .filter((user) => (attendanceOnly ? user.location : true))
    .map((user) =>
      userGroup.isInEdit
        ? {
            ...user,
            Icon: (
              <AIcon
                icon={isCheckedSet.has(user.intraId) ? CheckIcon : UncheckIcon}
                size={IconSize}
              />
            ),
            // 프로필카드 클릭시 체크박스 체크/해제
            // TODO: 수정중에는 프로필사진 클릭시 프로필보기로 이동하는 기능 제거 필요
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              if (isCheckedSet.has(user.intraId)) {
                setIsCheckedSet((isCheckedSet) => {
                  isCheckedSet.delete(user.intraId);
                  return new Set(isCheckedSet);
                });
              } else {
                setIsCheckedSet((isCheckedSet) => {
                  isCheckedSet.add(user.intraId);
                  return new Set(isCheckedSet);
                });
              }
            },
          }
        : user
    );

  return (
    <div className={styles.foldable_table}>
      <div className={styles.header}>
        <div className={styles.textbox}>
          <span className={styles.name}>{userGroup.groupName}</span>
          <span className={styles.count}>
            {userGroup.members.filter((user) => user.inCluster).length}/
            {userGroup.members.length}
          </span>
        </div>
        <div className={styles.buttonbox}>
          <FoldableGroupEditButton
            userGroup={userGroup}
            isCheckedSet={isCheckedSet}
            setIsCheckedSet={setIsCheckedSet}
          />
          <AIcon
            icon={userGroup.isFolded ? FoldAngleDown : FoldAngleUp}
            size={IconSize}
            onClick={foldGroup}
          />
        </div>
      </div>
      <div className={userGroup.isFolded ? styles.fold : styles.unfold}>
        <UserTable users={userList} parentGroup={userGroup} />
      </div>
    </div>
  );
};

export default FoldableGroupTable;
