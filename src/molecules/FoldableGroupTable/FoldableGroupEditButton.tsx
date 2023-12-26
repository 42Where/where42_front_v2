import { MenuInfo } from "rc-menu/lib/interface";
import React, { use, useCallback } from "react";
import { ButtonProps, Dropdown, MenuProps } from "antd";

import PencilIcon from "&/Icons/pencil.svg";
import CrossIconsmall from "&/Icons/crossSmall.svg";

import User from "@/types/User";
import Group from "@/types/Group";

import useUserStore from "@/stores/useUserStore";
import useGroupStore from "@/stores/useGroupStore";
import useInputModal from "@/hooks/useInputModal";
import useConfirmModal from "@/hooks/useConfirmModal";
import useGroupSelectModal from "@/hooks/useGroupSelectModal";
import useAFloatButton from "../AFloatButton/AFloatButton";
import { useSize } from "@/utils/MediaQuary";

import AIcon from "@/atoms/AIcon/AIcon";

import demoApi from "../../../test/DemoApi";

type FoldableGroupEditButtonProps = {
  userGroup: Group;
  isCheckedSet: Set<number>;
  setIsCheckedSet: React.Dispatch<React.SetStateAction<Set<number>>>;
};

const FoldableGroupEditButton: React.FC<FoldableGroupEditButtonProps> = ({
  userGroup,
  isCheckedSet,
  setIsCheckedSet,
}) => {
  const {
    setEditGroup,
    removeGroup,
    setGroupName,
    finishEditGroup,
    addUserToGroup,
    removeUserFromAllGroup,
    removeUserFromGroup,
  } = useGroupStore((state) => state);

  const IconSize = useSize();

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

  const removeFriendFromGroupModal = useConfirmModal({
    onOk: async () => {
      return demoApi(() => {
        removeUserFromGroup(Array.from(isCheckedSet), [userGroup.id]);
        setIsCheckedSet(new Set());
        finishEditGroup();
      });
    },
    title: "그룹에서 친구 삭제",
    component: `"${isCheckedSet.size}"명의 친구를 그룹 "${userGroup.name}"에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const removeFriendFromAllGroupModal = useConfirmModal({
    onOk: async () => {
      return demoApi(() => {
        removeUserFromAllGroup(Array.from(isCheckedSet));
        setIsCheckedSet(new Set());
        finishEditGroup();
      });
    },
    title: "모든 그룹에서 친구 삭제",
    component: `"${isCheckedSet}"을 그룹 "${userGroup.name}"모든 그룹에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const addFriendToOtherGroupModal = useGroupSelectModal({
    onOk: async (selectedGroupIds) => {
      return demoApi(() => {
        addUserToGroup(
          userGroup.users.filter((user) => isCheckedSet.has(user.id)),
          selectedGroupIds
        );
        setIsCheckedSet(new Set());
        finishEditGroup();
      });
    },
    groupList: useGroupStore((state) => state.groups).filter(
      (group) =>
        group.name !== "친구" &&
        group.users.find((u) => u.id === userGroup.id) === undefined
    ),
    targetUserList: userGroup.users.filter((user) => isCheckedSet.has(user.id)),
    title: "다른 그룹에 추가",
    component: `친구 ${isCheckedSet.size}명을 추가할 그룹을 선택해주세요`,
    okText: "추가",
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

  const onRemoveFriendFromGroup = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      removeFriendFromGroupModal.showModal();
    },
    [removeFriendFromGroupModal]
  );

  const onRemoveFriendFromAllGroup = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      removeFriendFromAllGroupModal.showModal();
    },
    [removeFriendFromAllGroupModal]
  );

  const onAddFriendToOtherGroup = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      addFriendToOtherGroupModal.showModal();
    },
    [addFriendToOtherGroupModal]
  );

  const menuProps: MenuProps = {
    items: [
      {
        key: "renameGroup",
        label: "그룹명 변경",
        onClick: onRenameGroup,
      },
      {
        key: "editGroupUser",
        label: "그룹 수정",
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

  const floatButtonProps: ButtonProps[] = [
    isCheckedSet.size > 0
      ? {
          name: "cancelSelect",
          children: "선택 취소",
          onClick: (e) => {
            e.preventDefault();
            setIsCheckedSet(new Set());
          },
        }
      : {
          name: "selectAll",
          children: "전체 선택",
          onClick: (e) => {
            e.preventDefault();
            setIsCheckedSet(new Set(userGroup.users.map((user) => user.id)));
          },
        },
    {
      name: "deleteFromGroup",
      children: "삭제",
      danger: true,
      onClick: onRemoveFriendFromGroup,
    },
    {
      name: "addToGroup",
      children: "그룹에 추가",
      type: "primary",
      onClick: onAddFriendToOtherGroup,
    },
  ];

  const floatButtonWrapper = useAFloatButton({
    isVisible: userGroup.isInEdit,
    buttonProps: floatButtonProps,
  });

  const EditButton = (
    <>
      {floatButtonWrapper}
      {userGroup.isInEdit ? (
        <AIcon
          icon={CrossIconsmall}
          size={IconSize}
          onClick={() => {
            finishEditGroup();
            setIsCheckedSet(new Set());
          }}
        />
      ) : (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Dropdown menu={menuProps} trigger={["click"]}>
            <AIcon icon={PencilIcon} size={IconSize} />
          </Dropdown>
        </div>
      )}
      {renameGroupModal.modal}
      {removeGroupModal.modal}
      {removeFriendFromGroupModal.modal}
      {removeFriendFromAllGroupModal.modal}
      {addFriendToOtherGroupModal.modal}
    </>
  );
  return EditButton;
};

export default FoldableGroupEditButton;
