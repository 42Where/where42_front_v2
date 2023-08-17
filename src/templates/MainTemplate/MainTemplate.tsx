import { ReactNode } from "react";
import styles from "./MainTemplate.module.css";

/**
 * MainTemplate
 * header component 와 body component 를 props 로 전달받아 rendering 한다.
 */
interface MainTemplateProps {
  headerComponent: () => ReactNode;
  bodyComponent: () => ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({
  headerComponent,
  bodyComponent,
}) => {
  return (
    <div className={styles["main-template"]}>
      {headerComponent()}
      {bodyComponent()}
    </div>
  );
};

export default MainTemplate;
