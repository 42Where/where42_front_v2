import { Row, RowName } from '@/types/Cluster';
import RowHeader from '@/components/seat/RowHeader';
import HalfXImage from '@/components/seat/X/HalfXImage';
import CX2XRow from '@/components/seat/X/CX2Row';

function ResponsiveHalfXImage({ isRotated }: { isRotated: boolean }) {
  return (
    <>
      <div className="md:hidden">
        <HalfXImage rot={isRotated} />
      </div>
      <div className="hidden md:block">
        <HalfXImage rot={!isRotated} />
      </div>
    </>
  );
}

export default function XBlock({ selectedRow, row }: { selectedRow: RowName; row: Row }) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 md:flex-col-reverse">
      <RowHeader rowName={selectedRow} />
      <div className="flex flex-row md:flex-col">
        <div className="relative size-fit">
          <ResponsiveHalfXImage isRotated />
          <CX2XRow row={row} left={false} />
        </div>
        <div className="relative size-fit">
          <ResponsiveHalfXImage isRotated={false} />
          <CX2XRow row={row} left />
        </div>
      </div>
    </div>
  );
}
