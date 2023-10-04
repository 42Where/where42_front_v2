import { Size } from "@/types/enums";

import styles from "./TextBox.module.scss";

type TextBoxProps = {
  /**
   * 표시할 텍스트
   */
  text: string;
  /**
   * primary일 경우에는 기본 스타일을 적용합니다.
   * 아닐경우 border 스타일을 적용합니다.
   * 기본값은 false입니다.
   */
  primary?: boolean;
  /**
   * 컴포넌트의 크기입니다.
   */
  size: Size;
};

const TextBox: React.FC<TextBoxProps> = ({ text, primary, size }) => {
  const BoxStyle =
    styles["text-box"] +
    " " +
    styles["text-box--" + size] +
    (primary ? "" : " " + styles["text-box--border"]);
  const TextStyle =
    styles["text-box__text"] + " " + styles["text-box__text--" + size];

  return (
    <div className={BoxStyle}>
      <div className={TextStyle}>{text}</div>
    </div>
  );
};

export default TextBox;
