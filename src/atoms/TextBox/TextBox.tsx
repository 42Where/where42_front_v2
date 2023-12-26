import styles from "./TextBox.module.css";

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
};

const TextBox: React.FC<TextBoxProps> = ({ text, primary }) => {
  const boxStyle =
    styles.text_wrapper +
    " " +
    (primary ? styles.text_wrapper__primary : styles.text_wrapper__border);
  const textStyle =
    styles.text + " " + (primary ? styles.text__primary : styles.text__border);

  return (
    <div className={boxStyle}>
      <div className={textStyle}>{text}</div>
    </div>
  );
};

export default TextBox;
