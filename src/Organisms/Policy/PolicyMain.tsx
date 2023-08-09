import styles from './PolicyMain.module.css';
import PolicyContent from '@/Molecules/Policy/PolicyContent';

function PolicyMain() {
  return (
    <div className={styles.main}>
      <div className={styles.policyTitle}>
        <h1 className={styles.policyTitleText}>
          어디있니 개인정보 이용 동의서
        </h1>
      </div>
      <PolicyContent />
    </div>
  );
};

export default PolicyMain;
