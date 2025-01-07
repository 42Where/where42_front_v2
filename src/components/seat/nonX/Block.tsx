import Col from '@/components/seat/Col';
import { Row, RowName } from '@/types/Cluster';
import RowHeader from '@/components/seat/RowHeader';

export default function Block({ selectedRow, row }: { selectedRow: RowName; row: Row }) {
  // TODO: 지그재그로 배치할까? 그러려면 absoulte로 배치해야할듯.. 레이아웃 생각을 나중에 더 해보자고
  // const oddSeats = row.filter((_, i) => i % 2 === 0);
  // const evenSeats = row.filter((_, i) => i % 2 === 1);
  return (
    <div className="flex flex-row items-center justify-end gap-4 md:flex-col">
      {/* <div className="hidden flex-row items-end justify-center lg:flex">
        <Col seats={oddSeats} gap />
        <Col seats={evenSeats} pb gap />
      </div> */}
      <RowHeader rowName={selectedRow} />
      <Col seats={row} />
    </div>
  );
}
