import { Row } from '@/types/Cluster';
import RenderSeat from '@/components/seat/RenderSeat';

type RowPositionType = 'top' | 'bottom';

export default function XRow({
  seats,
  position,
  pad,
}: {
  seats: Row;
  position: RowPositionType;
  pad?: boolean;
}) {
  return (
    <div
      className={`absolute flex h-full flex-col items-center gap-2 md:h-fit md:w-full md:flex-row ${position !== 'top' ? 'left-0 top-0 md:bottom-1 md:top-auto' : 'bottom-0 right-0 md:top-1'} 
      ${pad ? 'justify-center' : 'justify-between'}`}
    >
      {seats.map((seat) => (
        <RenderSeat key={typeof seat === 'number' ? seat : seat.intraId} seat={seat} />
      ))}
    </div>
  );
}
