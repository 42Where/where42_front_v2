import React, { useCallback } from "react";
import { Dropdown, MenuProps } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";

import SettingIcon from "&/Icons/setting.svg";
import NewGroupIcon from "&/Icons/newGroup.svg";
import CheckedBox from "&/Icons/Checkbox/check.svg";
import UncheckedBox from "&/Icons/Checkbox/uncheck.svg";

import useUserStore from "@/stores/useUserStore";
import { useIsMobile, useIsTablet } from "@/utils/MediaQuary";
import { DefaultCustomLocation } from "@/types/CascaderOption";

import useInputModal from "@/hooks/useInputModal";
import useCascaderModal from "@/hooks/useCascaderModal";
import IconTextButton from "@/atoms/buttons/IconButton/IconTextButton";
import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileText from "@/molecules/ProfileCard/ProfileText";
import AIcon from "@/atoms/AIcon/AIcon";

import styles from "./UserProfileCard.module.css";
import groupApi from "@/api/groupApi";
import useGroupStore from "@/stores/useGroupStore";

const MyProfileCard: React.FC = () => {
  const { user } = useUserStore((state) => state);

  const profileImageOnClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://profile.intra.42.fr", "_blank");
  }, []);

  return (
    <>
      {
        user ? (
          <div className={styles.my_profile_card}>
            <div className={styles.content}>
              <ProfileImage user={user} onClick={profileImageOnClick} />
              <ProfileText user={user} />
            </div>
            <MyProfileCardButtons />
          </div>
        ) : null
        // TODO: 스켈레톤 구현
      }
    </>
  );
};

const MyProfileCardButtons: React.FC = () => {
  const { user, attendanceOnly, setLocation, setComment, setAttendanceOnly } =
    useUserStore((state) => state);
  const { addGroup } = useGroupStore((state) => state);
  const isMoBile = useIsMobile();
  const isTablet = useIsTablet();

  const renameModal = useInputModal({
    title: "상태메시지 수정",
    initialInputValue: user?.comment ?? "",
    onOk: async (inputValue) => {},
    placeholder: "상태메시지를 입력하세요",
    okText: "변경",
    cancelText: "취소",
    count: {
      show: true,
      max: 15,
    },
    allowEmpty: true,
  });

  // TODO: 클러스터 안애 있지 않을경우 아예 안보이거나 사용하지 못하게 해야함
  const setCustomLocationModal = useCascaderModal({
    title: "수동 위치 설정",
    onOk: async (inputValue) => {},
    optionData: DefaultCustomLocation,
    defaultValue: user?.location?.split(" ") ?? ["개포"],
    maskClosable: false,
    okText: "설정",
    cancelText: "취소",
  });

  const createGroupModal = useInputModal({
    title: "새 그룹 만들기",
    initialInputValue: "",
    onOk: async (inputValue) => {
      try {
        const newGroup = await groupApi.createGroup({
          groupName: inputValue,
        });
        addGroup(newGroup as any);
        // 백엔드 스키마 만들어질때까지 대기
      } catch (error) {
        console.error(error);
      }
    },
    placeholder: "생성할 그룹 이름을 입력해주세요",
    okText: "생성",
    cancelText: "취소",
    allowEmpty: false,
  });

  const onEditCommentClick = useCallback(
    (e: MenuInfo) => {
      e.domEvent.preventDefault();
      renameModal.showModal();
    },
    [renameModal]
  );

  const onSetCustomLocationClick = useCallback(
    (e: MenuInfo) => {
      e.domEvent.preventDefault();
      setCustomLocationModal.showModal();
    },
    [setCustomLocationModal]
  );

  const toggleAttendanceOnly = (e: React.MouseEvent) => {
    e.preventDefault();
    setAttendanceOnly(!attendanceOnly);
  };

  const menuProps: MenuProps = {
    items: [
      {
        label: "상태메시지 수정",
        key: "editComment",
        onClick: onEditCommentClick,
      },
      {
        label: "수동 위치 설정",
        key: "setCustomLocation",
        onClick: onSetCustomLocationClick,
      },
    ],
  };

  const mobileProps: MenuProps = {
    items: [
      ...(menuProps.items as any),
      {
        label: "새 그룹 만들기",
        key: "newGroup",
        onClick: (e: MenuInfo) => {
          e.domEvent.preventDefault();
          createGroupModal.showModal();
        },
      },
      {
        label: attendanceOnly ? "모든 친구 보기" : "출근한 친구만 보기",
        key: "toggleAttendanceOnly",
        onClick: (e: MenuInfo) => {
          e.domEvent.preventDefault();
          setAttendanceOnly(!attendanceOnly);
        },
      },
    ],
  };

  return (
    <>
      <Dropdown
        menu={isMoBile || isTablet ? mobileProps : menuProps}
        trigger={["click"]}
        placement="bottomRight"
      >
        <AIcon icon={SettingIcon} size={"large"} />
      </Dropdown>
      <div className={styles.icons}>
        <IconTextButton
          text="출근한 친구만 보기"
          size="small"
          onClick={toggleAttendanceOnly}
        >
          {attendanceOnly ? (
            <AIcon icon={CheckedBox} size="small" />
          ) : (
            <AIcon icon={UncheckedBox} size="small" />
          )}
        </IconTextButton>
        <IconTextButton
          text="새 그룹"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            createGroupModal.showModal();
          }}
        >
          <AIcon icon={NewGroupIcon} size="small" />
        </IconTextButton>
      </div>
      {renameModal.modal}
      {setCustomLocationModal.modal}
      {createGroupModal.modal}
    </>
  );
};

export default MyProfileCard;
