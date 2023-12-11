import React from "react";

import TermData from "&/terms";

import styles from "./Terms.module.scss";
import Button from "../buttons/Button/Button";

// type TermsProps = {
//   accept: () => void;
//   reject: () => void;
// };

/**
 * @description
 * 약관 동의 컴포넌트
 * @param accept 동의 버튼 클릭 시 실행되는 함수
 * @param reject 거절 버튼 클릭 시 실행되는 함수
 * @returns 약관 동의 컴포넌트
 * TODO: 버튼없이 보여주기만 할 수 있도록 수정해야할수도 있음
 */
const Terms: React.FC = () => {
  return (
    <div className={styles.terms}>
      <div className={styles.terms__title}>{TermData.title}</div>
      <div className={styles.terms__description}>{TermData.description}</div>
      <div className={styles.terms__body}>
        <div className={styles.terms__content}>
          <div className={styles.terms__title}>
            {TermData.content.purpose.title}
          </div>
          <div className={styles.terms__description}>
            {TermData.content.purpose.content.join(", ")}
          </div>
        </div>
        <div className={styles.terms__content}>
          <div className={styles.terms__title}>
            {TermData.content.collectInfo.title}
          </div>
          <div className={styles.terms__description}>
            {TermData.content.collectInfo.content.join(", ")}
          </div>
        </div>
        <div className={styles.terms__content}>
          <div className={styles.terms__title}>
            {TermData.content.retentionPeriod.title}
          </div>
          <div className={styles.terms__description}>
            {TermData.content.retentionPeriod.content.join(" - ")}
          </div>
        </div>
        <div className={styles.terms__content}>
          <div className={styles.terms__title}>
            {TermData.content.refusalAndConsequences.title}
          </div>
          <div className={styles.terms__description}>
            {TermData.content.refusalAndConsequences.content.join(" ")}
          </div>
        </div>
      </div>
      <div className={styles.terms__buttonbox}>
        <Button onClick={reject}>거절</Button>
        <Button onClick={accept}>동의</Button>
      </div>
    </div>
  );
};

export default Terms;
