import React, { ReactNode } from "react";
import styles from "./MainTemplate.module.css";

/**
 * MainTemplate
 * header component 와 body component 를 props 로 전달받아 rendering 한다.
 */
interface MainTemplateProps {
  Header: React.FC;
  Footer: React.FC;
  children?: ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({
  Header,
  Footer,
  children,
}) => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>{children}</div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MainTemplate;
