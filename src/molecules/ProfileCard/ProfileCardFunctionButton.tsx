import React, { useCallback } from "react";
import { Dropdown } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";

import FunctionButtonIcon from "&/Icons/functionButton.svg";

import User from "@/types/User";
import Group from "@/types/Group";
import AIcon from "@/atoms/AIcon/AIcon";
import { useSize } from "@/utils/MediaQuary";
import groupApi from "@/api/groupApi";

import useUserStore from "@/stores/useUserStore";
import useGroupStore from "@/stores/useGroupStore";
import useConfirmModal from "@/hooks/useConfirmModal";
import useGroupSelectModal from "@/hooks/useGroupSelectModal";

const ProfileCardFunctionButton: React.FC<{
  user: User;
  parentGroup?: Group;
}> = ({ user, parentGroup }) => {
  const self = useUserStore((state) => state.user);
  const { groups } = useGroupStore((state) => state);
  const { addUserToGroup, removeUserFromGroup, removeUserFromAllGroup } =
    useGroupStore((state) => state);
  const IconSize = useSize();

  const addFriendToOtherGroupModal = useGroupSelectModal({
    onOk: async (selectedGroups) => {
      try {
        const respoonseList = await Promise.all(
          selectedGroups.map((group) =>
            groupApi.addMemberAtGroup({
              groupId: group.groupId,
              members: [user.intraId],
            })
          )
        );
        console.log(respoonseList);
        // 업데이트 해야됨
      } catch (error) {}
    },
    title: `${user.intraName}님을 추가할 그룹을 선택해주세요.`,
    groupList: groups,
    targetUserList: [user],
    okText: "추가",
    cancelText: "취소",
  });

  const removeFriendFromGroupModal = useConfirmModal({
    onOk: async () => {
      if (parentGroup && parentGroup.groupId === self?.defaultGroupId) {
        try {
          const response = await groupApi.removeMembersFromGroup({
            groupId: parentGroup.groupId,
            members: [user.intraId],
          });
          console.log(response);
        } catch (error) {}
      }
    },
    title: "그룹에서 친구 삭제",
    // TODO: 유저, 그룹 이름 텍스트에 볼드처리 구현 필요
    component: `"${user.intraName}"님을 ${"ㅁㄴㅇㄹ"}에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const removeFriendModal = useConfirmModal({
    onOk: async () => {},
    title: "친구 삭제",
    // TODO: 유저, 그룹 이름 텍스트에 볼드처리 구현 필요
    component: `"${user.intraName}"님을 모든 그룹과 친구목록에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const onAddFriendToOtherGroup = useCallback(
    (menuInfo: MenuInfo) => {
      menuInfo.domEvent.preventDefault();
      addFriendToOtherGroupModal.showModal();
      // 대충 모달창 띄워서 추가할 그룹 선택하게 하는 함수
    },
    [addFriendToOtherGroupModal]
  );

  const onRemoveFriendFromGroup = useCallback(
    (menuInfo: MenuInfo) => {
      menuInfo.domEvent.preventDefault();
      removeFriendFromGroupModal.showModal();
      // 대충 모달창 띄워서 이 그룹에서 삭제하시겠습니까? 물어보는 함수
    },
    [removeFriendFromGroupModal]
  );

  const menuProps = {
    items: [
      // 친구 그룹에 속하지 않은 경우
      {
        label: "다른 그룹에 추가하기",
        key: "addFriendToOtherGroup",
        onClick: onAddFriendToOtherGroup,
      },
      {
        label: "그룹에서 삭제하기",
        key: "removeFriendFromGroup",
        onClick: onRemoveFriendFromGroup,
        danger: true,
      },
    ],
  };

  return (
    <>
      <Dropdown menu={menuProps} trigger={["click"]} placement="bottomRight">
        <AIcon icon={FunctionButtonIcon} size={IconSize} />
      </Dropdown>
      {addFriendToOtherGroupModal.modal}
      {removeFriendFromGroupModal.modal}
      {removeFriendModal.modal}
    </>
  );
};

export default ProfileCardFunctionButton;
