import React, { useCallback } from "react";
import { Dropdown, MenuProps } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";

import FunctionButtonIcon from "&/Icons/functionButton.svg";
import UserAddIcon from "&/Icons/userAdd.svg";

import User from "@/types/User";
import Group from "@/types/Group";
import { Size } from "@/types/enums";
import AIcon from "@/atoms/AIcon/AIcon";
import { useSize } from "@/utils/MediaQuary";

import useGroupStore from "@/stores/useGroupStore";
import useConfirmModal from "@/hooks/useConfirmModal";
import useGroupSelectModal from "@/hooks/useGroupSelectModal";

import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileText from "./ProfileText";
import styles from "./ProfileCard.module.css";

import demoApi from "../../../test/DemoApi";

type ProfileCardProps = {
  /**
   * 사용자 정보
   * undefined일 경우에는 스켈레톤 표시
   */
  user: User;
  /**
   * 사용자 선택 등 기능에 사용할 onClick 함수입니다.
   */
  onClick?: React.MouseEventHandler;
  /**
   * 기능버튼 클릭시 실행할 함수입니다.
   */
  onFunctionButtonClick?: React.MouseEventHandler;
  parentGroup?: Group;
  /**
   * 기능버튼
   * 친구가 아닐경우 친구추가 아이콘을 표시합니다.
   * 친구일 경우 기능버튼을 표시합니다.
   * 체크박스를 표시할 수도 있습니다.
   * 관련 로직이 변경될 수도 있습니다
   */
  children?: React.ReactNode;
};

// TODO: 체크했을때 border표시하는 기능 구현 필요
const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onClick,
  parentGroup,
  children,
}) => {
  const onProfileImageClick =
    children === undefined
      ? undefined
      : (e: React.MouseEvent) => {
          e.preventDefault();
          // 자식 컴포넌트가 있을때에는 프로필 클릭 이벤트 x
        };
  const IconSize = useSize();

  const Icon =
    children ??
    (user.isFriend ? (
      <ProfileCardFunctionButton user={user} parentGroup={parentGroup} />
    ) : (
      <AIcon
        icon={UserAddIcon}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
        }}
        size={IconSize}
      />
    ));

  return (
    <div className={styles.profile_card} onClick={onClick}>
      <div className={styles.profile_content}>
        <ProfileImage user={user} onClick={onProfileImageClick} />
        <ProfileText user={user} />
      </div>
      {Icon}
    </div>
  );
};

const ProfileCardFunctionButton: React.FC<{
  user: User;
  parentGroup?: Group;
}> = ({ user, parentGroup }) => {
  const { groups } = useGroupStore((state) => state);
  const { addUserToGroup, removeUserFromGroup, removeUserFromAllGroup } =
    useGroupStore((state) => state);
  const IconSize = useSize();

  const addFriendToOtherGroupModal = useGroupSelectModal({
    onOk: async (selectedGroupIds) => {
      return demoApi(async () => {
        await Promise.all(
          selectedGroupIds.map(async (groupId) => {
            addUserToGroup([user], [groupId]);
          })
        );
      });
    },
    title: `${user.login}님을 추가할 그룹을 선택해주세요.`,
    groupList: groups.filter(
      (group) =>
        group.name !== "친구" &&
        group.users.find((u) => u.id === user.id) === undefined
    ),
    targetUserList: [user],
    // component: ,
    okText: "추가",
    cancelText: "취소",
  });

  const removeFriendFromGroupModal = useConfirmModal({
    onOk: async () => {
      return demoApi(() => {
        removeUserFromGroup([user.id], [parentGroup?.id ?? 0]);
      });
    },
    title: "그룹에서 친구 삭제",
    // TODO: 유저, 그룹 이름 텍스트에 볼드처리 구현 필요
    component: `"${user.login}"님을 그룹 "${
      parentGroup?.name ?? "친구"
    }"에서 삭제하시겠습니까?`,
    danger: true,
    okText: "삭제",
    cancelText: "취소",
  });

  const removeFriendModal = useConfirmModal({
    onOk: async () => {
      return demoApi(() => {
        removeUserFromAllGroup([user.id]);
      });
    },
    title: "친구 삭제",
    // TODO: 유저, 그룹 이름 텍스트에 볼드처리 구현 필요
    component: `"${user.login}"님을 모든 그룹과 친구목록에서 삭제하시겠습니까?`,
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

  const onRemoveFriend = useCallback(
    (menuInfo: MenuInfo) => {
      menuInfo.domEvent.preventDefault();
      removeFriendModal.showModal();
      // 대충 모달창 띄워서 친구를 삭제하시겠습니까? 물어보는 함수
    },
    [removeFriendModal]
  );

  const menuProps = {
    items:
      parentGroup?.name ?? "친구" === "친구"
        ? [
            // 친구 그룹에 속한 경우
            // 친구인 경우만 사용하므로 그룹이 주어지지 않은 경우에는 친구 그룹에 속한 경우로 간주
            {
              label: "다른 그룹에 추가하기",
              key: "addFriendToOtherGroup",
              onClick: onAddFriendToOtherGroup,
            },
            {
              label: "친구 삭제하기",
              key: "removeFriend",
              onClick: onRemoveFriend,
              danger: true,
            },
          ]
        : [
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
            {
              label: "친구 삭제하기",
              key: "removeFriend",
              onClick: onRemoveFriend,
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

export default ProfileCard;
