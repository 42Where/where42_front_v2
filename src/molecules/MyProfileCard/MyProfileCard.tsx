import React, { useCallback } from "react";
import { Dropdown, MenuProps } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";

import SettingIcon from "&/Icons/setting.svg";
import NewGroupIcon from "&/Icons/newGroup.svg";
import CheckedBox from "&/Icons/Checkbox/check.svg";
import UncheckedBox from "&/Icons/Checkbox/uncheck.svg";

import useMyDataStore from "@/stores/useMyDataStore";
import { Size } from "@/types/enums";
import { DefaultCustomLocation } from "@/types/CascaderOption";

import useInputModal from "@/hooks/useInputModal";
import useCascaderModal from "@/hooks/useCascaderModal";
import IconTextButton from "@/atoms/buttons/IconButton/IconTextButton";
import ProfileImage from "@/atoms/ProfileImage/ProfileImage";
import ProfileText from "@/molecules/ProfileCard/ProfileText";
import ProfileSkeleton from "../ProfileSkeleton/ProfileSkeleton";
import AIcon from "@/atoms/AIcon/AIcon";

import styles from "./MyProfileCard.module.scss";

import demoApi from "../../../test/DemoApi";

type MyProfileCardProps = {
  /**
   * 컴포넌트의 크기입니다.
   */
  size: Size;
  /**
   * 새 그룹 생성 함수
   * 비즈니스 로직은 따로 구현 후 바로 임포트해서 사용할수도 있음
   */
  newGroup?: () => void;
  // TODO: api 구현 이후에 자기자신을 의미하는 타입 정의 필요
};

const MyProfileCard: React.FC<MyProfileCardProps> = ({
  size,
  newGroup = () => {},
}) => {
  const { myData, setMyData } = useMyDataStore((state) => state);
  const profileImageOnClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://profile.intra.42.fr", "_blank");
  }, []);

  const toggleAttendanceOnly = (e: React.MouseEvent) => {
    e.preventDefault();
    setMyData({ ...myData, attendanceOnly: !myData.attendanceOnly });
  };

  // TODO: api 연결 후에 로딩 구분 명확하게 정의 필요
  if (myData.id == 0) {
    return <ProfileSkeleton size={size} />;
  }
  const myProfileCardStyle =
    styles["my-profile-card"] + " " + styles["my-profile-card--" + size];
  const contentStyle =
    styles["profile-card__content"] +
    " " +
    styles["profile-card__content--" + size];
  const iconsStyle =
    styles["my-profile-card__icons"] +
    " " +
    styles["my-profile-card__icons--" + size];

  return (
    <div className={myProfileCardStyle}>
      <div className={contentStyle}>
        <ProfileImage user={myData} size={size} onClick={profileImageOnClick} />
        <ProfileText user={myData} size={size} />
      </div>
      <MyProfileCardSettingDropdown />
      <div className={iconsStyle}>
        <IconTextButton
          text="출근한 친구만 보기"
          size="small"
          onClick={toggleAttendanceOnly}
        >
          {myData.attendanceOnly ? (
            <AIcon icon={CheckedBox} size="small" />
          ) : (
            <AIcon icon={UncheckedBox} size="small" />
          )}
        </IconTextButton>
        <IconTextButton text="새 그룹" size="small" onClick={newGroup}>
          <AIcon icon={NewGroupIcon} size="small" />
        </IconTextButton>
      </div>
    </div>
  );
};

const MyProfileCardSettingDropdown: React.FC = () => {
  const { myData, setComment, setMyLocation } = useMyDataStore(
    (state) => state
  );

  const renameModal = useInputModal({
    title: "상태메시지 수정",
    initialInputValue: myData.comment,
    onOk: async (inputValue) => {
      return demoApi(() => {
        setComment(inputValue);
      });
    },
    // onOk: setComment,
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
    onOk: async (inputValue) => {
      return demoApi(() => {
        setMyLocation(
          inputValue.length == 4
            ? inputValue.join(" ")
            : inputValue.join(" ") + " 어딘가"
        );
      });
    },
    optionData: DefaultCustomLocation,
    defaultValue: myData.location?.split(" ") ?? ["개포"],
    maskClosable: false,
    okText: "설정",
    cancelText: "취소",
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
  const onSetAwayClick = useCallback((e: MenuInfo) => {
    e.domEvent.preventDefault();
    // TODO: 대충 자리비움 설정하는 모달 띄우는 함수 연결
    // 없애거나 안쓸듯?
  }, []);

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
      {
        label: "자리비움(deprecated)",
        key: "setAway(deprecated)",
        onClick: onSetAwayClick,
      },
    ],
  };

  return (
    <>
      <Dropdown menu={menuProps} trigger={["click"]} placement="bottomRight">
        <AIcon icon={SettingIcon} size={"large"} />
      </Dropdown>
      {renameModal.modal}
      {setCustomLocationModal.modal}
    </>
  );
};

export default MyProfileCard;
