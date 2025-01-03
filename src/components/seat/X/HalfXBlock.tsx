import XRow from '@/components/seat/X/Row';
import { Row, RowName } from '@/types/Cluster';
import RowHeader from '@/components/seat/RowHeader';
import HalfXImage from '@/components/seat/X/HalfXImage';

export default function HalfXBlock({ selectedRow, row }: { selectedRow: RowName; row: Row }) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 md:flex-col-reverse">
      <RowHeader rowName={selectedRow} />
      <div className="relative size-fit">
        <HalfXImage />
        <XRow seats={[row[2], row[1]]} position="top" pad />
        <XRow seats={[row[3], row[0]]} position="bottom" />
      </div>
    </div>
  );
}
