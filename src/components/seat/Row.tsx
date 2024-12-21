import Seat from '@/components/seat/Seat';
import { SeatInfo } from '@/types/Seat';

type RowPositionType = 'top' | 'bottom';

export default function Row({
  seats,
  position,
  pad,
}: {
  seats: SeatInfo[];
  position: RowPositionType;
  pad?: boolean;
}) {
  return (
    <div
      className={`absolute flex w-full flex-row items-center ${position !== 'top' ? 'bottom-0' : 'top-0'} 
      ${pad ? 'justify-center' : 'justify-between'}`}
    >
      {seats.map((s) => (
        <Seat key={s.seat} seatNumber={s.seat} user={s.user} />
      ))}
    </div>
  );
}
