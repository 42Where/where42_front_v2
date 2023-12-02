import React, { useState, useCallback } from "react";
import { Modal, ModalProps } from "antd";

type ConfirmModalProps<T, U, V> = {
  onOk: (() => void) | (() => Promise<T>);
  onCancel?: (() => void) | (() => Promise<U>);
  icon?: React.ReactNode;
  title: React.ReactNode;
  component?: React.ReactNode;
  danger?: boolean;
  maskClosable?: boolean;
  okText?: string;
  cancelText?: string;
};

const useConfirmModal = <T, U, V>({
  onOk,
  onCancel,
  icon,
  title,
  component,
  danger = false,
  maskClosable = true,
  okText,
  cancelText,
}: ConfirmModalProps<T, U, V>) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (loading) {
        return; // 이미 처리 중인 경우 중복 호출 방지
      }

      setLoading(true);
      try {
        const result = onOk();
        if (result instanceof Promise) {
          await result;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setVisible(false);
      }
    },
    [onOk, loading, setLoading, setVisible]
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
        setLoading(false);
        setVisible(false);
      }
    },
    [onCancel, loading, setLoading, setVisible]
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
    okButtonProps: { danger: danger },
    cancelButtonProps: { disabled: loading },
  };
  return {
    modal: <Modal {...modalProps}>{component}</Modal>,
    showModal,
    hideModal,
  };
};

export default useConfirmModal;
