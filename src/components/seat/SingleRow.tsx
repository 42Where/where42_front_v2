import SingleSeat from '@/components/seat/SingleSeat';
import { SeatInfo } from '@/types/Seat';

export default function SingleRow({ seats }: { seats: SeatInfo[] }) {
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      {seats.map((s) => (
        <SingleSeat key={s.seat} seatNumber={s.seat} />
      ))}
    </div>
  );
}
