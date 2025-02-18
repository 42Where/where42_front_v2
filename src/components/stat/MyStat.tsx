type Props = {
  intraName: string | undefined;
  myFavoriteSeatsRes: string[] | undefined;
};

export function MyStat({ intraName, myFavoriteSeatsRes }: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-6">
      <h1 className="text-4xl text-darkblue">{intraName}님의 정보</h1>
      <div className="flex w-full flex-col items-start justify-start gap-6 rounded-xl border-2 border-darkblue p-6">
        <h4 className="text-2xl text-darkblue">내가 제일 자주 앉는 자리</h4>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <h2>{myFavoriteSeatsRes?.length !== 0 && myFavoriteSeatsRes?.[0]}</h2>
          <p className="text-xl">최근 이용 기록이 없어요 😶‍🌫️</p>
        </div>
      </div>
    </div>
  );
}
