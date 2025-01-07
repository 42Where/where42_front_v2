import XRow from '@/components/seat/X/Row';
import { Row } from '@/types/Cluster';

export default function CX2Row({ row, left }: { row: Row; left: boolean }) {
  return (
    <>
      <div className="hidden md:block">
        <XRow seats={left ? [row[5], row[1]] : [row[7], row[3]]} position="top" pad={!left} />
        <XRow seats={left ? [row[4], row[0]] : [row[6], row[2]]} position="bottom" pad={left} />
      </div>
      <div className="block md:hidden">
        <XRow seats={left ? [row[7], row[3]] : [row[5], row[1]]} position="top" pad={left} />
        <XRow seats={left ? [row[6], row[2]] : [row[4], row[0]]} position="bottom" pad={!left} />
      </div>
    </>
  );
}
