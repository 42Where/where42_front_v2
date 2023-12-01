import React, { useCallback, useLayoutEffect, useState } from "react";
import { Input, Modal, ModalProps } from "antd";

type InputModalProps<T, U, V> = {
  onOk: ((value: string) => void) | ((value: string) => Promise<T>);
  onCancel?: (() => void) | (() => Promise<U>);
  onChange?: ((value: string) => void) | ((value: string) => Promise<V>);
  initialInputValue?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  component?: React.ReactNode;
  placeholder?: string;
  maskClosable?: boolean;
  count?: {
    show: boolean;
    max: number;
  };
  okText?: string;
  cancelText?: string;
  invalidInputText?: string;
  allowEmpty?: boolean;
};

/**
 * TODO: 임시구현이므로 개선 필요
 * component가 동적으로 크기가 바뀔경우 모달의 크기가 변하지 않음
 */
const useInputModal = <T, U, V>({
  onOk,
  onCancel,
  onChange,
  initialInputValue = "",
  icon,
  title,
  component,
  placeholder = "",
  maskClosable = true,
  count,
  okText,
  cancelText,
  invalidInputText,
  allowEmpty = false,
}: InputModalProps<T, U, V>) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(initialInputValue ?? "");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useLayoutEffect(() => {
    console.log("useLayoutEffect - Setting initial input value for", title);
    setInputValue(initialInputValue);
  }, [initialInputValue, title]);

  const handleOk = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (loading) {
        return; // 이미 처리 중인 경우 중복 호출 방지
      }
      setLoading(true);
      try {
        const result = onOk(inputValue);
        if (result instanceof Promise) {
          await result;
        }
        // 비동기 작업 완료 후에 상태 업데이트
        setLoading(false);
        setVisible(false);
      } catch (error) {
        console.error("Error in handleOk:", error);
        setLoading(false);
      }
    },
    [onOk, inputValue, setLoading, setVisible, loading]
  );

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (
        (count && count.show && e.target.value.length > count.max) ||
        (!allowEmpty && e.target.value === "")
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
      const result = onChange && onChange(e.target.value);
      if (result instanceof Promise) {
        result
          .then(() => {
            setInputValue(e.target.value);
          })
          .catch(() => {
            console.log("Error in handleChange");
            // setInputValue(e.target.value);
          });
        // TODO: await을 사용해 블로킹을 해야할지 고민 필요
      } else {
        setInputValue(e.target.value);
      }
    },
    [onChange, count, allowEmpty, setInputValue, setIsValid]
  );

  const handleCancel = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const result = onCancel && onCancel();
      setLoading(true);
      if (result instanceof Promise) {
        result
          .then(() => {
            setLoading(false);
            setVisible(false);
          })
          .catch((err) => {
            console.log("Error in handleCancel", err);
            setLoading(false);
            setVisible(false);
          });
      } else {
        setLoading(false);
        setVisible(false);
      }
    },
    [onCancel, setVisible, setLoading]
  );

  const modalProps: ModalProps = {
    open: visible,
    title: (
      <>
        {icon}
        {title}
      </>
    ),
    children: (
      <>
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          count={count}
          disabled={loading}
        />
        {!isValid && <div>{invalidInputText}</div>}
        {component}
      </>
    ),
    onCancel: handleCancel,
    onOk: handleOk,
    confirmLoading: loading,
    maskClosable: maskClosable,
    okText: okText,
    cancelText: cancelText,
    destroyOnClose: true,
    okButtonProps: { disabled: !isValid || loading },
    cancelButtonProps: { disabled: loading },
  };
  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hideModal = useCallback(handleCancel, [handleCancel]);

  return { modal: <Modal {...modalProps} />, showModal, hideModal };
};

export default useInputModal;
