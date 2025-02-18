import { Title, SubTitle, StatContainer } from '@/components/stat/utils';

type Props = {
  intraName: string | undefined;
  myFavoriteSeatsRes: string[] | undefined;
};

export function MyStat({ intraName, myFavoriteSeatsRes }: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2 xl:gap-6">
      <Title title={`${intraName}님의 정보`} />
      <StatContainer>
        <SubTitle title="내가 제일 자주 앉는 자리" />
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-base xl:text-xl">
          <h2>{myFavoriteSeatsRes?.length !== 0 && myFavoriteSeatsRes?.[0]}</h2>
          <p>최근 이용 기록이 없어요 😶‍🌫️</p>
        </div>
      </StatContainer>
    </div>
  );
}
