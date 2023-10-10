import { useCallback } from "react";

import styles from "./IconTextButton.module.scss";

interface IconTextButtonProps {
  /**
   * 표시할 텍스트
   */
  text: string;
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
   * 아이콘으로 사용할 자식 컴포넌트
   */
  children?: React.ReactNode;
}

/**
 * TODO: size를 한번에 변경할 방법 필요할수도 있음
 * 어떻게 에러 감지할지 논의 필요 - 구조를 바꿔야할수도 있음
 * 자주 사용하므로 useMemo 적용 필요할수도 있음
 */
const IconTextButton: React.FC<IconTextButtonProps> = ({
  text,
  size,
  onClick,
  children,
}) => {
  const ContainerStyle =
    styles.icontextbutton + " " + styles["icontextbutton--" + size];

  return (
    <div className={ContainerStyle} onClick={onClick}>
      {children}
      {text}
    </div>
  );
};

export default IconTextButton;
