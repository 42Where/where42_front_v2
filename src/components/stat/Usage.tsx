import PieChart from '@/components/charts/PieChart';
import { ImacUsage, ClusterUsageArr } from '@/types/Stat';
import { Title, SubTitle, StatContainer } from '@/components/stat/utils';

type Props = {
  clusterUsage: ClusterUsageArr | undefined;
  imacUsage: ImacUsage | undefined;
};

function ClusterUsageComp({ clusterUsage }: { clusterUsage: ClusterUsageArr | undefined }) {
  if (!clusterUsage) return null;
  return (
    <StatContainer>
      <SubTitle title="클러스터별 이용율" />
      <div className="grid w-full grid-flow-col grid-rows-3 flex-row items-center justify-center gap-6 md:grid-rows-2 md:gap-10">
        {clusterUsage.map(
          (cluster) =>
            cluster.name !== 'c3' &&
            cluster.name !== 'c4' && (
              <PieChart
                data={[cluster.usingImacCount, cluster.totalImacCount - cluster.usingImacCount]}
                labels={[`사용 중인 자리`, '빈 자리']}
                clusterName={cluster.name}
                rate={[cluster.usingImacCount, cluster.totalImacCount]}
                key={cluster.name}
              />
            ),
        )}
      </div>
    </StatContainer>
  );
}

function ImacUsageComp({ imacUsage }: { imacUsage: ImacUsage | undefined }) {
  if (!imacUsage) return null;
  return (
    <StatContainer>
      <SubTitle title="클러스터 맥 사용 현황" />
      <div className="flex w-full items-center justify-center gap-3 md:gap-10">
        <PieChart
          data={[
            imacUsage.usingImacUserCount,
            imacUsage.totalUserCount - imacUsage.usingImacUserCount,
          ]}
          labels={['아이맥 사용 인원', '아이맥 미사용 인원']}
          rate={[imacUsage.usingImacUserCount, imacUsage.totalUserCount]}
        />
      </div>
    </StatContainer>
  );
}

export function Usage({ clusterUsage, imacUsage }: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 xl:gap-6">
      <Title title="클러스터 현황" />
      <ClusterUsageComp clusterUsage={clusterUsage} />
      <ImacUsageComp imacUsage={imacUsage} />
    </div>
  );
}
