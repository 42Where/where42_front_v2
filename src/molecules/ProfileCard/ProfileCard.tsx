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

import ProfileCardFunctionButton from "./ProfileCardFunctionButton";
import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileText from "./ProfileText";
import styles from "./ProfileCard.module.css";

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
    (user.inCluster ? (
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

export default ProfileCard;
