import Block from '@/components/seat/X/XBlock';
import HalfXBlock from '@/components/seat/X/HalfXBlock';
import { CX1Cluster } from '@/types/Cluster';

export default function CX1ClusterComp({ clusterData }: { clusterData: CX1Cluster }) {
  return (
    <div className="flex flex-col items-start justify-center gap-4 md:flex-row md:items-end md:gap-16">
      <HalfXBlock selectedRow="r3" row={clusterData.r3} />
      <div className="flex flex-row gap-16 md:flex-col-reverse">
        <HalfXBlock selectedRow="r2" row={clusterData.r2} />
        <Block selectedRow="r5" row={clusterData.r5} />
      </div>
      <div className="flex flex-row gap-16 md:flex-col-reverse">
        <HalfXBlock selectedRow="r1" row={clusterData.r1} />
        <Block selectedRow="r4" row={clusterData.r4} />
      </div>
    </div>
  );
}
