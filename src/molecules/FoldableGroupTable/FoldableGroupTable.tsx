import React, { useCallback, useEffect, useState } from "react";

import CheckIcon from "&/Icons/Checkbox/check.svg";
import UncheckIcon from "&/Icons/Checkbox/uncheck.svg";
import FoldAngleUp from "&/Icons/foldAngleUp.svg";
import FoldAngleDown from "&/Icons/foldAngleDown.svg";

// import User from "@/types/User";
import Group from "@/types/Group";
import { Size } from "@/types/enums";
import useMyDataStore from "@/stores/useMyDataStore";
import useGroupStore from "@/stores/useGroupStore";

import AIcon from "@/atoms/AIcon/AIcon";
import UserTable from "@/molecules/UserTable/UserTable";
import FoldableGroupEditButton from "./FoldableGroupEditButton";

import styles from "./FoldableGroupTable.module.scss";

type FoldableGroupTableProps = {
  userGroup: Group;
  size: Size;
};

const FoldableGroupTable: React.FC<FoldableGroupTableProps> = ({
  userGroup,
  size,
}) => {
  const { finishEditGroup, openGroup, closeGroup } = useGroupStore(
    (state) => state
  );
  const attendanceOnly = useMyDataStore(
    (state) => state.myData?.attendanceOnly
  );
  const [isCheckedSet, setIsCheckedSet] = useState<Set<number>>(new Set());

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
      if (userGroup.isFolded) openGroup(userGroup.id);
      else closeGroup(userGroup.id);
    },
    [userGroup.id, userGroup.isFolded, openGroup, closeGroup]
  );

  const userList = userGroup.users
    // 타입 변경하면 로직 변경 필요
    .filter((user) => (attendanceOnly ? user.location : true))
    .map((user) =>
      userGroup.isInEdit
        ? {
            ...user,
            Icon: (
              <AIcon
                icon={isCheckedSet.has(user.id) ? CheckIcon : UncheckIcon}
                size={"medium"}
              />
            ),
            // 프로필카드 클릭시 체크박스 체크/해제
            // TODO: 수정중에는 프로필사진 클릭시 프로필보기로 이동하는 기능 제거 필요
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              if (isCheckedSet.has(user.id)) {
                setIsCheckedSet((isCheckedSet) => {
                  isCheckedSet.delete(user.id);
                  return new Set(isCheckedSet);
                });
              } else {
                setIsCheckedSet((isCheckedSet) => {
                  isCheckedSet.add(user.id);
                  return new Set(isCheckedSet);
                });
              }
            },
          }
        : user
    );

  return (
    <div className={styles.group}>
      <div className={styles.group__header}>
        <div className={styles.group__textbox}>
          <span className={styles.group__name}>{userGroup.name}</span>
          <span className={styles.group__count}>
            {userGroup.users.filter((user) => user?.isFriend ?? false).length}/
            {userGroup.users.length}
          </span>
        </div>
        <div className={styles.group__buttonbox}>
          <FoldableGroupEditButton
            userGroup={userGroup}
            isCheckedSet={isCheckedSet}
            setIsCheckedSet={setIsCheckedSet}
          />
          <AIcon
            icon={userGroup.isFolded ? FoldAngleDown : FoldAngleUp}
            size={"medium"}
            onClick={foldGroup}
          />
        </div>
      </div>
      {/* TODO: CSS로 접는것을 구현할지 리액트 조건부 렌더링으로 구현할지 논의 필요 */}
      <div className={userGroup.isFolded ? styles.fold : styles.unfold}>
        <UserTable users={userList} parentGroup={userGroup} size={size} />
      </div>
    </div>
  );
};

export default FoldableGroupTable;
