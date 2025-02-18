import PieChart from '@/components/charts/PieChart';
import { ImacUsage, ClusterUsageArr } from '@/types/Stat';

type Props = {
  clusterUsage: ClusterUsageArr | undefined;
  imacUsage: ImacUsage | undefined;
};

function ClusterUsageComp({ clusterUsage }: { clusterUsage: ClusterUsageArr | undefined }) {
  if (!clusterUsage) return null;
  return (
    <div className="flex w-1/2 flex-col items-start justify-center gap-6 rounded-xl border-2 border-darkblue p-6">
      <h4 className="text-2xl text-darkblue">클러스터별 이용율</h4>
      <div className="grid w-full grid-flow-col grid-rows-2 flex-row items-center justify-center gap-3 md:gap-10">
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
    </div>
  );
}

function ImacUsageComp({ imacUsage }: { imacUsage: ImacUsage | undefined }) {
  if (!imacUsage) return null;
  return (
    <div className="flex min-w-[48%] flex-col items-start justify-center gap-6 rounded-xl border-2 border-darkblue p-6">
      <h4 className="text-2xl text-darkblue">클러스터 맥 사용 현황</h4>
      <div className="flex w-full items-center justify-center gap-3 md:gap-10">
        <PieChart
          data={[
            imacUsage.usingImacUserCount,
            imacUsage.totalUserCount - imacUsage.usingImacUserCount,
          ]}
          labels={['아이맥 사용 인원', '개포 전체 인원']}
          rate={[imacUsage.usingImacUserCount, imacUsage.totalUserCount]}
        />
      </div>
    </div>
  );
}

export function Usage({ clusterUsage, imacUsage }: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-6">
      <h1 className="text-4xl text-darkblue">클러스터 현황</h1>
      <ClusterUsageComp clusterUsage={clusterUsage} />
      <ImacUsageComp imacUsage={imacUsage} />
    </div>
  );
}
