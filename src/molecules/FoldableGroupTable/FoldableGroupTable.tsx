import { MenuInfo } from "rc-menu/lib/interface";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, MenuProps, Modal } from "antd";

import PencilIcon from "&/Icons/pencil.svg";
import CrossIconsmall from "&/Icons/crossSmall.svg";
import CheckIcon from "&/Icons/Checkbox/check.svg";
import UncheckIcon from "&/Icons/Checkbox/uncheck.svg";
import FoldAngleUp from "&/Icons/foldAngleUp.svg";
import FoldAngleDown from "&/Icons/foldAngleDown.svg";

import User from "@/types/User";
import Group from "@/types/Group";
import { Size } from "@/types/enums";
import useMyDataStore from "@/stores/useMyDataStore";
import useGroupStore from "@/stores/useGroupStore";
import useInputModal from "@/hooks/useInputModal";

import UserTable from "@/molecules/UserTable/UserTable";
import AIcon from "@/atoms/AIcon/AIcon";

import styles from "./FoldableGroupTable.module.scss";

import demoApi from "../../../test/DemoApi";
import useConfirmModal from "@/hooks/useConfirmModal";

type FoldableGroupTableProps = {
  userGroup: Group;
  size: Size;
};

const FoldableGroupTable: React.FC<FoldableGroupTableProps> = ({
  userGroup,
  size,
}) => {
  const { finishEditGroup } = useGroupStore((state) => state);
  const attendanceOnly = useMyDataStore(
    (state) => state.myData?.attendanceOnly
  );
  const [isFolded, setIsFolded] = useState(
    userGroup.name !== "친구"
    // 기본 그룹인 테이블은 접혀있지 않게
    // 기본그룹 이름 바뀔수도 있음
  );
  const [isCheckedRecord, setIsCheckedRecord] = useState<
    Record<string, boolean>
  >(
    userGroup.users.reduce(
      (acc, user) => {
        acc[user.login] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );
  useEffect(() => {
    if (userGroup.isInEdit) {
      setIsFolded(false);
    } else {
      setIsCheckedRecord(
        userGroup.users.reduce(
          (acc, user) => {
            acc[user.login] = false;
            return acc;
          },
          {} as Record<string, boolean>
        )
      );
    }
  }, [userGroup.isInEdit, userGroup.users]);
  const foldGroup = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsFolded(!isFolded);
    },
    [isFolded, setIsFolded]
  );

  const FoldButton = isFolded ? (
    <AIcon icon={FoldAngleDown} size={"medium"} onClick={foldGroup} />
  ) : (
    <AIcon icon={FoldAngleUp} size={"medium"} onClick={foldGroup} />
  );
  const userList = userGroup.users
    .filter((user) => {
      // 출석한 친구만 표시할때는 필터
      if (attendanceOnly) {
        return user.location;
      } else {
        return true;
      }
    })
    .map((user) => {
      // 수정중일 경우에는 체크박스를 표시합니다.
      if (userGroup.isInEdit) {
        return {
          ...user,
          Icon: isCheckedRecord[user.login] ? (
            <AIcon icon={CheckIcon} size={"medium"} />
          ) : (
            <AIcon icon={UncheckIcon} size={"medium"} />
          ),
          // 프로필카드 클릭시 체크박스 체크/해제
          // TODO: 수정중에는 프로필사진 클릭시 프로필보기로 이동하는 기능 제거 필요
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setIsCheckedRecord({
              ...isCheckedRecord,
              [user.login]: !isCheckedRecord[user.login],
            });
          },
        };
      } else {
        return user;
      }
    });

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
          <FoldableGroupEditButton userGroup={userGroup} />
          {FoldButton}
        </div>
      </div>
      {/* TODO: CSS로 접는것을 구현할지 리액트 조건부 렌더링으로 구현할지 논의 필요 */}
      <div className={isFolded ? styles.fold : styles.unfold}>
        <UserTable users={userList} parentGroup={userGroup} size={size} />
      </div>
    </div>
  );
};

type FoldableGroupEditButtonProps = { userGroup: Group };

const FoldableGroupEditButton: React.FC<FoldableGroupEditButtonProps> = ({
  userGroup,
}) => {
  const { setEditGroup, removeGroup, setGroupName, finishEditGroup } =
    useGroupStore((state) => state);

  const renameGroupModal = useInputModal({
    title: "그룹 이름 변경",
    initialInputValue: userGroup.name,
    onOk: async (inputValue) => {
      return demoApi(() => {
        setGroupName(userGroup.id, inputValue);
      });
    },
    placeholder: "변경할 그룹 이름을 입력하세요",
    okText: "변경",
    cancelText: "취소",
    count: {
      show: true,
      max: 10,
    },
    maskClosable: false,
  });

  const removeGroupModal = useConfirmModal({
    onOk: async () => {
      return demoApi(() => {
        removeGroup(userGroup.id);
      });
    },
    title: "그룹 삭제",
    component: `그룹 "${userGroup.name}"을(를) 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const onRenameGroup = useCallback(
    (e: MenuInfo) => {
      e.domEvent.preventDefault();
      renameGroupModal.showModal();
    },
    [renameGroupModal]
  );

  const onEditGroupUser = useCallback(
    (e: MenuInfo) => {
      e.domEvent.preventDefault();
      setEditGroup(userGroup.id);
    },
    [setEditGroup, userGroup]
  );

  const onRemoveGroup = useCallback(
    (e: MenuInfo) => {
      e.domEvent.preventDefault();
      removeGroupModal.showModal();
    },
    [removeGroupModal]
  );

  const menuProps: MenuProps = {
    items: [
      {
        key: "renameGroup",
        label: "그룹 이름 변경",
        onClick: onRenameGroup,
      },
      {
        key: "editGroupUser",
        label: "그룹 인원 수정",
        onClick: onEditGroupUser,
      },
      {
        key: "deleteGroup",
        label: "그룹 삭제",
        onClick: onRemoveGroup,
        danger: true,
      },
    ],
  };

  const EditButton = userGroup.isInEdit ? (
    <AIcon icon={CrossIconsmall} size={"medium"} onClick={finishEditGroup} />
  ) : (
    <>
      <Dropdown menu={menuProps} trigger={["click"]}>
        <AIcon icon={PencilIcon} size={"medium"} />
      </Dropdown>
      {renameGroupModal.modal}
      {removeGroupModal.modal}
    </>
  );
  return EditButton;
};

export default FoldableGroupTable;
