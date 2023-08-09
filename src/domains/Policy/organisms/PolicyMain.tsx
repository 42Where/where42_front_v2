import styles from "./PolicyMain.module.css";
import PolicyContent from "@/domains/Policy/organisms/PolicyContent";

function PolicyMain() {
  return (
    <div className={styles["policy-main"]}>
      <div className={styles["policy-title"]}>
        <h1 className={styles["policy-title-text"]}>
          어디있니 개인정보 이용 동의서
        </h1>
      </div>
      <PolicyContent />
    </div>
  );
}

export default PolicyMain;
