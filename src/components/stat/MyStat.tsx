import { Title, SubTitle, StatContainer } from '@/components/stat/utils';
import { FavoriteSeat } from '@/types/Stat';

type Props = {
  intraName: string | undefined;
  myFavoriteSeatsRes: FavoriteSeat[] | undefined;
};

export function MyStat({ intraName, myFavoriteSeatsRes }: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 xl:gap-6">
      <Title title={`${intraName || '.........'}님의 정보`} />
      <StatContainer>
        <SubTitle title="내가 제일 자주 앉는 자리" />
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-base text-darkblue md:text-lg xl:text-2xl">
          {(!myFavoriteSeatsRes || myFavoriteSeatsRes.length === 0) && (
            <p className="text-baseblue">최근 이용 기록이 없어요 😶‍🌫️</p>
          )}
          {myFavoriteSeatsRes &&
            myFavoriteSeatsRes.length !== 0 &&
            myFavoriteSeatsRes.map((s, idx) => (
              <span
                key={s.seat}
                className="flex w-[310px] flex-row items-center justify-between gap-3 md:text-lg xl:text-2xl"
              >
                <h2>{idx + 1}</h2>
                <h2>{s.seat}</h2>
                <p className="text-[10px] text-baseblue md:text-xs xl:text-sm">
                  {s.usingCount}번/{s.usingTimeHour}시간
                </p>
              </span>
            ))}
        </div>
      </StatContainer>
    </div>
  );
}
