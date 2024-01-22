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
import groupApi from "@/api/groupApi";

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
  const { user } = useUserStore((state) => state);
  const {
    groups,
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
    initialInputValue: userGroup.groupName,
    onOk: async (inputValue) => {
      try {
        const renamedGroup = await groupApi.renameGroup({
          groupId: userGroup.groupId,
          groupName: inputValue,
        });
        setGroupName(renamedGroup.groupId, inputValue);
      } catch (error) {}
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
      try {
        const removedGroupId = await groupApi.removeGroup({
          groupId: userGroup.groupId,
        });
        removeGroup(removedGroupId.groupId);
      } catch (error) {}
    },
    title: "그룹 삭제",
    component: `그룹 "${userGroup.groupName}"을(를) 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const removeFriendFromGroupModal = useConfirmModal({
    onOk: async () => {
      try {
        const removedUserList = await groupApi.removeMembersFromGroup({
          groupId: userGroup.groupId,
          members: Array.from(isCheckedSet),
        });
        removeUserFromGroup(removedUserList, [userGroup.groupId]);
        setIsCheckedSet(new Set());
      } catch (error) {}
    },
    title: "그룹에서 친구 삭제",
    component: `"${isCheckedSet.size}"명의 친구를 그룹 "${userGroup.groupName}"에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const removeFriendFromAllGroupModal = useConfirmModal({
    onOk: async () => {
      try {
        const removedUserList = await groupApi.removeMembersFromGroup({
          groupId: userGroup.groupId,
          members: Array.from(isCheckedSet),
        });
        removeUserFromAllGroup(removedUserList);
        setIsCheckedSet(new Set());
      } catch (error) {}
    },
    title: "모든 그룹에서 친구 삭제",
    component: `"${isCheckedSet}"을 모든 그룹에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const addFriendToOtherGroupModal = useGroupSelectModal({
    // 수정해야됨
    onOk: async (groups) => {
      try {
        const responseList = await Promise.all(
          groups.flatMap((group) =>
            Array.from(isCheckedSet).map((userId) =>
              groupApi.addMemberAtGroup({
                groupId: group.groupId,
                intraId: userId,
              })
            )
          )
        );
        setIsCheckedSet(new Set());
      } catch (error) {}
    },
    groupList: groups,
    targetUserList: userGroup.members.filter((user) =>
      isCheckedSet.has(user.intraId)
    ),
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
      setEditGroup(userGroup.groupId);
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
    items:
      user?.defaultGroupId === userGroup.groupId
        ? [
            {
              key: "editGroupUser",
              label: "그룹 수정",
              onClick: onEditGroupUser,
            },
          ]
        : [
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
            setIsCheckedSet(
              new Set(userGroup.members.map((user) => user.intraId))
            );
          },
        },
    {
      name: "deleteFromGroup",
      children: "삭제",
      danger: true,
      onClick:
        userGroup.groupId === user?.defaultGroupId
          ? onRemoveFriendFromAllGroup
          : onRemoveFriendFromGroup,
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
