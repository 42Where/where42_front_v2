import Block from '@/components/seat/nonX/Block';
import { OddCluster, EvenCluster } from '@/types/Cluster';

export default function ClusterComponent({
  clusterData,
}: {
  clusterData: OddCluster | EvenCluster;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {Object.keys(clusterData).map((row) => (
        <Block
          key={row}
          selectedRow={row as keyof typeof clusterData}
          row={clusterData[row as keyof typeof clusterData]}
        />
      ))}
    </div>
  );
}
