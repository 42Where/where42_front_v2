import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

import TermData from "&/terms";

import styles from "./Terms.module.css";

/**
 * @description
 * 약관 동의 컴포넌트
 * @param accept 동의 버튼 클릭 시 실행되는 함수
 * @param reject 거절 버튼 클릭 시 실행되는 함수
 * @returns 약관 동의 컴포넌트
 * TODO: 버튼없이 보여주기만 할 수 있도록 수정해야할수도 있음
 */
const Terms: React.FC = () => {
  const items: CollapseProps["items"] = [
    {
      key: "purpose",
      label: TermData.content.purpose.title,
      children: TermData.content.purpose.content.join(", "),
    },
    {
      key: "collectInfo",
      label: TermData.content.collectInfo.title,
      children: TermData.content.collectInfo.content.join(", "),
    },
    {
      key: "retentionPeriod",
      label: TermData.content.retentionPeriod.title,
      children: TermData.content.retentionPeriod.content.join(" - "),
    },
    {
      key: "refusalAndConsequences",
      label: TermData.content.refusalAndConsequences.title,
      children: TermData.content.refusalAndConsequences.content.join(" "),
    },
  ];

  return (
    <>
      <div className={styles.title}>{TermData.title}</div>
      <div className={styles.description}>{TermData.description}</div>
      <Collapse items={items} />
    </>
    // <div className={styles.terms}>
    //   <div className={styles.title}>{TermData.title}</div>
    //   <div className={styles.description}>{TermData.description}</div>
    //   <div className={styles.body}>
    //     <div className={styles.content}>
    //       <div className={styles.title}>{TermData.content.purpose.title}</div>
    //       <div className={styles.description}>
    //         {TermData.content.purpose.content.join(", ")}
    //       </div>
    //     </div>
    //     <div className={styles.content}>
    //       <div className={styles.title}>
    //         {TermData.content.collectInfo.title}
    //       </div>
    //       <div className={styles.description}>
    //         {TermData.content.collectInfo.content.join(", ")}
    //       </div>
    //     </div>
    //     <div className={styles.content}>
    //       <div className={styles.title}>
    //         {TermData.content.retentionPeriod.title}
    //       </div>
    //       <div className={styles.description}>
    //         {TermData.content.retentionPeriod.content.join(" - ")}
    //       </div>
    //     </div>
    //     <div className={styles.content}>
    //       <div className={styles.title}>
    //         {TermData.content.refusalAndConsequences.title}
    //       </div>
    //       <div className={styles.description}>
    //         {TermData.content.refusalAndConsequences.content.join(" ")}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Terms;
