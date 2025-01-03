import { Row, ActiveClusterUser } from '@/types/Cluster';
import RenderSeat from '@/components/seat/RenderSeat';

export default function Column({
  seats,
  pb,
  slanted,
  reversed,
  gap,
}: {
  seats: Row;
  pb?: boolean;
  slanted?: boolean;
  reversed?: boolean;
  gap?: boolean;
}) {
  // const reversedSeats = [...seats].reverse();
  const firstSeat = seats[0];
  const lastSeat = seats[seats.length - 1];
  const middleSeats = seats.slice(1, seats.length - 1);
  const getSeatKey = (seat: number | ActiveClusterUser) =>
    typeof seat === 'number' ? seat : seat.intraId;

  return (
    <div
      className={`flex h-full flex-row justify-center md:flex-col ${gap ? 'gap-10' : 'md:gap-2'}
        ${reversed ? 'items-end' : 'items-start'} ${pb && 'pb-24'} ${slanted && 'relative w-20 py-[60px]'}`}
    >
      {!slanted && seats.map((seat) => <RenderSeat key={getSeatKey(seat)} seat={seat} />)}
      {slanted && (
        <>
          {middleSeats.map((seat) => (
            <RenderSeat key={getSeatKey(seat)} seat={seat} />
          ))}
          <div
            className={`absolute ${reversed ? 'left-0' : 'right-0'} top-0 h-fit md:bottom-0 md:top-auto`}
          >
            <RenderSeat seat={lastSeat} />
          </div>
          <div
            className={`absolute ${reversed ? 'left-0' : 'right-0'} bottom-0 h-fit md:bottom-auto md:top-0`}
          >
            <RenderSeat seat={firstSeat} />
          </div>
        </>
      )}
    </div>
  );
}
