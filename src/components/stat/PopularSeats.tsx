import { PopularSeat } from '@/types/Stat';
import { Title, SubTitle, StatContainer } from '@/components/stat/utils';
import { PopularSeatSkeletonContainer } from '@/components/stat/utils/PopularSeatSkeleton';

type Props = {
  popularSeatsRes: PopularSeat[] | undefined;
};

export function PopularSeats({ popularSeatsRes }: Props) {
  return (
    <div className="flex min-h-72 w-full flex-col items-start justify-center gap-2 xl:gap-6">
      <Title title="42Seoul 인기 자리" />
      <StatContainer>
        <SubTitle title="인기있는 자리 순위" />
        <div className="flex w-full flex-col items-center justify-center gap-5 text-darkblue">
          {!popularSeatsRes && <PopularSeatSkeletonContainer />}
          {popularSeatsRes &&
            popularSeatsRes.map((s, idx) => (
              <span
                key={s.seat}
                className="flex w-[310px] flex-row items-center justify-between gap-3 md:text-lg xl:text-2xl"
              >
                <h2>{idx + 1}</h2>
                <h2>{s.seat}</h2>
                <p className="text-[10px] text-baseblue md:text-xs xl:text-sm">
                  {s.usingUserCount}명/{s.usingTimeHour}시간
                </p>
              </span>
            ))}
        </div>
      </StatContainer>
    </div>
  );
}
