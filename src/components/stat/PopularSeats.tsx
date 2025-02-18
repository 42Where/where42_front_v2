import { PopularSeat } from '@/types/Stat';

type Props = {
  popularSeatsRes: PopularSeat[] | undefined;
};

export function PopularSeats({ popularSeatsRes }: Props) {
  return (
    <div className="flex min-h-72 w-full flex-col items-start justify-center gap-6">
      <h1 className="text-4xl text-darkblue">42Seoul 인기 자리</h1>
      <div className="flex w-full flex-col items-start justify-center gap-6 rounded-xl border-2 border-darkblue p-6">
        <h4 className="text-2xl text-darkblue">인기있는 자리 순위</h4>
        <div className="flex w-full flex-col items-center justify-center gap-5 text-darkblue">
          {popularSeatsRes &&
            popularSeatsRes.map((seat, idx) => (
              <div
                key={seat.seat}
                className="flex w-[310px] flex-row items-center justify-between gap-3 text-2xl"
              >
                <h2>{idx + 1}</h2>
                <h2>{seat.seat}</h2>
                <p className="text-sm text-baseblue">
                  {seat.usingUserCount}명/{seat.usingTimeHour}시간
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
