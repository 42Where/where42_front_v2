import Col from '@/components/seat/Col';
import { Row, RowName } from '@/types/Cluster';
import RowHeader from '@/components/seat/RowHeader';

export default function Block({ selectedRow, row }: { selectedRow: RowName; row: Row }) {
  return (
    <div className="flex flex-row items-center justify-end gap-4 md:flex-col">
      <RowHeader rowName={selectedRow} />
      <Col seats={row} />
    </div>
  );
}
