import SingleSeat from '@/components/seat/SingleSeat';
import { SeatInfo } from '@/types/Seat';

export default function SingleRow({ seats, pad }: { seats: SeatInfo[]; pad?: boolean }) {
  const reversedSeats = [...seats].reverse();
  return (
    <div className={`flex flex-col items-center justify-center gap-10 ${pad && 'pb-[52px]'}`}>
      {reversedSeats.map((s) => (
        <SingleSeat key={s.seat} seatNumber={s.seat} user={s.user} />
      ))}
    </div>
  );
}
