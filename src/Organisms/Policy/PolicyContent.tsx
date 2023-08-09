import styles from './PolicyContent.module.css';

const PolicyContent: React.FC = () => {
  return (
    <div className={styles['policy-content']}>
      <p className={styles['policy-text']}>
        (재)이노베이션 아카데미는 『개인정보 보호법』 제15조 등 관련 법령에 따라
        서비스 이용자의 개인정보보호를 매우 중시하며, 서비스 제공에 반드시
        필요한 개인정보의 수집⦁이용을 위하여 귀하의 동의를 받고자 합니다.
      </p>
      <table className={styles['policy-table']}>
        <tbody>
          <tr>
            <th>개인정보의 수집 및 이용 목적:</th>
            <td>어디있니 현재 위치 확인 서비스 제공</td>
          </tr>
          <tr>
            <th>수집하는 개인정보 항목 (필수):</th>
            <td>
              인트라 로그인 아이디, 클러스터 출입 상태, 입실 시 현재 입실 한
              클러스터, 출입카드 마지막 태그 시간
            </td>
          </tr>
          <tr>
            <th>개인정보의 보유 및 이용기간:</th>
            <td>3년, 보유기간 경과 및 보유목적 달성 시 지체 없이 파기합니다</td>
          </tr>
          <tr>
            <th>
              동의 거부 권리 및 동의 거부에 따른 불이익 내용 또는 제한사항:
            </th>
            <td>
              귀하는 개인정보 수집 및 이용에 대해 동의를 거부할 권리가 있습니다.
              필수항목에 대한 동의 거부 시 어디있니 서비스 제공이 제한됨을
              알려드립니다.
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles['fixed-buttons-container']}>
        {/* TODO - 버튼을 테이블과 겹치지 않게 상위 div의 우하단에 고정시키려고 했는데 잘 모르겠음 버튼 작업하면서 추가작업 필요*/}
        <button>거절</button>
        <button>동의</button>
        {/* TODO - 공통으로 사용할 버튼 디자인 필요 */}
      </div>
    </div>
  );
};

export default PolicyContent;
