import SingleSeat from '@/components/seat/SingleSeat';
import { SeatInfo } from '@/types/Seat';

export default function SingleRow({ seats }: { seats: SeatInfo[] }) {
  console.log('SEATS: ', seats);
  return (
    <div className="flex flex-row items-center justify-center lg:gap-10">
      {seats.map((s) => (
        <SingleSeat key={s.seat} seatNumber={s.seat} />
      ))}
    </div>
  );
}
