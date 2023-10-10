import Image from "next/image";
import React, { useCallback } from "react";

import styles from "./IconButton.module.scss";

const BlurImage =
  "ata:image/gif;iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+R8AArcB2pIvCSwAAAAASUVORK5CYII=";
// 로딩중에 보여줄 이미지 - 1x1 gray-2 gif
// TODO?: type과같은 디렉토리에 옮겨서 전역적으로 관리할지 고민해볼것

interface IconButtonProps {
  /**
   * 표시할 아이콘
   * - import한 내부 이미지 사용
   * - **외부 이미지 사용시 정상 작동하지 않을 수도 있음**
   */
  Icon?: any;
  /**
   * size
   * small/medium/large
   */
  size: "small" | "medium" | "large";
  /**
   * 상위 컴포넌트에서 전달받는 onClick 함수
   */
  onClick?: React.MouseEventHandler;
  /**
   * 자식 컴포넌트
   */
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon = undefined,
  size,
  onClick,
  children,
}) => {
  const IconStyle = styles.iconbutton + " " + styles[`iconbutton--${size}`];
  const IconSize = size === "small" ? 16 : size === "medium" ? 24 : 32;

  switch (Icon) {
    case undefined:
      return (
        <div className={IconStyle} onClick={onClick}>
          {children}
        </div>
      );
    default:
      return (
        <Image
          className={IconStyle}
          src={Icon}
          width={IconSize}
          height={IconSize}
          alt={"아이콘버튼"}
          placeholder="empty"
          onClick={onClick}
        />
      );
  }
};

export default IconButton;
