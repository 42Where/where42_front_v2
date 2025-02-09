import Column from '@/components/seat/Col';
import { CX2Cluster, RowName } from '@/types/Cluster';
import RowHeader from '@/components/seat/RowHeader';
import Block from '@/components/seat/nonX/Block';

function CX2Block({ reversed, clusterData }: { reversed: boolean; clusterData: CX2Cluster }) {
  const seatColumns = reversed
    ? [clusterData.r5, clusterData.r6, clusterData.r7, clusterData.r8]
    : [clusterData.r1, clusterData.r2, clusterData.r3, clusterData.r4];

  return (
    <>
      <div className="hidden flex-row items-center justify-center gap-4 md:flex">
        {seatColumns.map((seats, index) => (
          <Column
            key={Object.keys(clusterData)[index]}
            seats={seats}
            slanted
            reversed={reversed || false}
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:hidden">
        {seatColumns.map((seats, index) => (
          <Block
            key={Object.keys(clusterData)[index]}
            selectedRow={
              reversed
                ? (`r${index + seatColumns.length + 1}` as RowName)
                : (`r${index + 1}` as RowName)
            }
            row={seats}
          />
        ))}
      </div>
    </>
  );
}

export function CX2ClusterComp({ clusterData }: { clusterData: CX2Cluster }) {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 md:flex-col-reverse">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <CX2Block reversed={false} clusterData={clusterData} />
        <CX2Block reversed clusterData={clusterData} />
      </div>
      <div className="hidden w-full items-center justify-between px-6 md:flex md:flex-row">
        {Object.keys(clusterData).map(
          (row) => row.length > 0 && <RowHeader key={row} rowName={row as RowName} />,
        )}
      </div>
    </div>
  );
}
