import SingleSeat from '@/components/seat/SingleSeat';
import { SeatInfo } from '@/types/Seat';

export default function SingleRow({ seats, pad }: { seats: SeatInfo[]; pad?: boolean }) {
  return (
    <div className="flex flex-row items-center justify-center lg:gap-10">
      {pad && <div className="w-[52px]" />}
      {seats.map((s) => (
        <SingleSeat key={s.seat} seatNumber={s.seat} />
      ))}
    </div>
  );
}
