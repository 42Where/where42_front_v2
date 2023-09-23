import Image from "next/image";

import styles from "./IconButton.module.scss";

interface IconButtonProps {
  /**
   * 표시할 아이콘
   * 이미지 아이콘을 사용할 경우는 string, object
   * 컴포넌트 아이콘을 사용할 경우는 React.FC<any>
   */
  Icon: React.FC<any> | any;
  /**
   * 아이콘에서 나타낼 값이 필요할 경우 사용하는 인자
   * 단순 이미지 아이콘을 사용할 경우는 생략 가능
   */
  value?: boolean;
  /**
   * size
   * small/medium/large
   * default: medium
   */
  size?: "small" | "medium" | "large";
  /**
   * 상위 컴포넌트에서 전달받는 onClick 함수
   */
  onClick?: () => void;
  /**
   * 버튼에 표시할 텍스트
   */
  text?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  value = false,
  size = "medium",
  onClick,
  text,
}) => {
  const IconButtonStyle =
    styles.iconbutton + " " + styles[`iconbutton--${size}`];
  const IconButtonTextStyle =
    styles["iconbutton__text"] + " " + styles[`iconbutton__text--${size}`];
  let iconSize;

  switch (size) {
    case "small":
      iconSize = 16;
      break;
    case "medium":
      iconSize = 24;
      break;
    case "large":
      iconSize = 32;
      break;
  }

  switch (text) {
    case undefined:
    case "":
      if (typeof Icon === "string" || typeof Icon === "object") {
        return (
          <Image
            src={Icon}
            width={iconSize}
            height={iconSize}
            alt="icon"
            onClick={onClick}
          />
        );
      } else if (typeof Icon === "function") {
        return <Icon value={value} size={size} onClick={onClick} />;
      }
    default:
      let IconComponent;

      if (typeof Icon === "string" || typeof Icon === "object") {
        IconComponent = (
          <Image src={Icon} width={iconSize} height={iconSize} alt="icon" />
        );
      } else if (typeof Icon === "function") {
        IconComponent = <Icon value={value} size={size} />;
      }

      return (
        <div className={IconButtonStyle} onClick={onClick}>
          {IconComponent}
          <div className={IconButtonTextStyle}>{text}</div>
        </div>
      );
  }
};

export default IconButton;
