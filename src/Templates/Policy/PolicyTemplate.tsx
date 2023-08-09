import React, { ReactNode } from 'react';
import style from './PolicyTemplate.module.css';

interface PolicyTemplateProps {
  // headerComponent: () => ReactNode; - 추후 구현 필요
  mainComponent: () => ReactNode;
  // footerComponent: () => ReactNode; - 추후 구현 필요
}

const PolicyTemplate: React.FC<PolicyTemplateProps> = ({
  // headerComponent,
  mainComponent,
  // footerComponent,
}) => {
  return (
    <div className={style['policy-template']}>
      {/* headerComponent 추후 구현 필요 */}
      <div className={style['policy-template-main']}>{mainComponent()}</div>
      {/* footerComponent 추후 구현 필요 */}
    </div>
  );
};

export default PolicyTemplate;
