import React, { useState, useCallback, useEffect } from "react";
import { Modal, ModalProps, Menu, MenuProps } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";

import User from "@/types/User";
import Group from "@/types/Group";

type GroupSelectModalProps<T, U> = {
  onOk: ((value: number[]) => void) | ((value: number[]) => Promise<T>);
  onCancel?: (() => void) | (() => Promise<U>);
  icon?: React.ReactNode;
  title: React.ReactNode;
  groupList: Group[];
  targetUserList: User[];
  component?: React.ReactNode;
  danger?: boolean;
  maskClosable?: boolean;
  okText?: string;
  cancelText?: string;
};

const useGroupSelectModal = <T, U>({
  onOk,
  onCancel,
  icon,
  title,
  groupList,
  targetUserList,
  component,
  danger = false,
  maskClosable = true,
  okText,
  cancelText,
}: GroupSelectModalProps<T, U>) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);

  useEffect(() => {
    // setSelectedGroups([]);
    setSelectedGroupIds([]);
  }, []);

  const handleSelect = useCallback(
    (menuInfo: MenuInfo) => {
      menuInfo.domEvent.preventDefault();
      const selectedGroupId = parseInt(menuInfo.key as string);
      setSelectedGroupIds([...selectedGroupIds, selectedGroupId]);
    },
    [setSelectedGroupIds, selectedGroupIds]
  );

  const handleDeselect = useCallback(
    (menuInfo: MenuInfo) => {
      menuInfo.domEvent.preventDefault();
      const selectedGroupId = parseInt(menuInfo.key as string);
      setSelectedGroupIds(
        selectedGroupIds.filter((id) => id !== selectedGroupId)
      );
    },
    [setSelectedGroupIds, selectedGroupIds]
  );

  const handleOk = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (loading) {
        return; // 이미 처리 중인 경우 중복 호출 방지
      }

      setLoading(true);
      try {
        const result = onOk(selectedGroupIds);
        if (result instanceof Promise) {
          await result;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setVisible(false);
        setSelectedGroupIds([]);
      }
    },
    [onOk, loading, setLoading, setVisible, selectedGroupIds]
  );

  const handleCancel = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (loading) {
        return; // 이미 처리 중인 경우 중복 호출 방지
      }
      setLoading(true);
      try {
        if (onCancel) {
          const result = onCancel();
          if (result instanceof Promise) {
            await result;
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSelectedGroupIds([]);
        setLoading(false);
        setVisible(false);
      }
    },
    [onCancel, loading, setLoading, setVisible, setSelectedGroupIds]
  );

  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hideModal = useCallback(handleCancel, [handleCancel]);

  const modalProps: ModalProps = {
    open: visible,
    title: (
      <>
        {icon}
        {title}
      </>
    ),
    onOk: handleOk,
    onCancel: handleCancel,
    confirmLoading: loading,
    maskClosable: maskClosable,
    okText: okText,
    cancelText: cancelText,
    destroyOnClose: true,
    okButtonProps: {
      danger: danger,
      disabled: loading || selectedGroupIds.length === 0,
    },
    cancelButtonProps: { disabled: loading },
  };

  const itemProps: MenuProps["items"] = groupList.map((group) => ({
    key: group.id,
    label: (
      <>
        {group.name} {group.users.filter((user) => user.location).length}/
        {group.users.length}
      </>
    ),
  }));

  return {
    modal: (
      <Modal {...modalProps}>
        <>
          {groupList.length === 0 ? (
            // TODO: 사용자 아이디는 볼드처리 필요
            // TODO: 추가할 그룹이 없을때 Empty를 띄울지 모달을 띄우지않고 메시지를 띄울지 결정 필요
            <>{`선택한 사용자들이 이미 모든 그룹에 포함되어있습니다`}</>
          ) : (
            <>
              {component}
              <Menu
                multiple={true}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                selectedKeys={selectedGroupIds.map((id) => id.toString())}
                items={itemProps}
              />
            </>
          )}
        </>
      </Modal>
    ),
    showModal,
    hideModal,
  };
};

export default useGroupSelectModal;
