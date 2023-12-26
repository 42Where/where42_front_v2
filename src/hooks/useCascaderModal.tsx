import React, { useCallback, useEffect, useState } from "react";
import { TreeSelect, Modal, ModalProps, Cascader } from "antd";

import { CascaderOption } from "@/types/CascaderOption";
import useUserStore from "@/stores/useUserStore";

type CascaderModalProps<T, U, V> = {
  onOk: ((value: string[]) => void) | ((value: string[]) => Promise<T>);
  onCancel?: (() => void) | (() => Promise<U>);
  onChange?: ((value: string[]) => void) | ((value: string[]) => Promise<V>);
  icon?: React.ReactNode;
  title: React.ReactNode;
  optionData: CascaderOption[];
  defaultValue?: string[];
  maskClosable?: boolean;
  okText?: string;
  cancelText?: string;
  children?: React.ReactNode;
};

/**
 * TODO: 임시구현이므로 개선 필요
 * component가 동적으로 크기가 바뀔경우 모달의 크기가 변하지 않음
 */
const useCascaderModal = <T, U, V>({
  onOk,
  onCancel,
  onChange,
  icon,
  title,
  optionData,
  defaultValue = [],
  maskClosable,
  okText,
  cancelText,
  children,
}: CascaderModalProps<T, U, V>) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string[]>(defaultValue);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log("useEffect - Setting initial input value");
  //   setInputValue(location?.split(" ") ?? []);
  // }, [location]);

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
    async (value: (string | number)[]) => {
      const result = onChange && onChange(value as string[]);
      if (result instanceof Promise) {
        result
          .then(() => {
            setInputValue(value as string[]);
          })
          .catch(() => {
            console.log("Error in handleChange");
            // setInputValue(e.target.value);
          });
        // TODO: await을 사용해 블로킹을 해야할지 고민 필요
      } else {
        setInputValue(value as string[]);
      }
    },
    [onChange, setInputValue]
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
        {/* <TreeSelect
          treeData={treeData}
          onChange={handleChange}
          value={inputValue}
          style={{ width: "100%" }}
          // prefixCls={prefixCls}
        /> */}
        <Cascader
          options={optionData}
          onChange={handleChange}
          value={inputValue}
          changeOnSelect={true}
          style={{ width: "100%" }}
          disabled={loading}
        />
        {children}
      </>
    ),
    onCancel: handleCancel,
    onOk: handleOk,
    confirmLoading: loading,
    maskClosable: maskClosable,
    okText: okText,
    cancelText: cancelText,
    destroyOnClose: true,
  };
  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);
  const hideModal = useCallback(handleCancel, [handleCancel]);

  return { modal: <Modal {...modalProps} />, showModal, hideModal };
};

export default useCascaderModal;
