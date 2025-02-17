import Header from '@/components/header/Header';
import { useClusterUsage, useImacUsage, useMyFavoriteSeats, usePopularSeats } from '@/hooks';
import useInfoSet from '@/hooks/useInfoSet';
import PieChart from '@/components/charts/PieChart';

export default function StatPage() {
  const { userRes, adminStatusRes } = useInfoSet();
  const isAdmin = adminStatusRes.data?.admin;
  const clusterUsageRes = useClusterUsage().data;
  const imacUsageRes = useImacUsage().data;
  const popularSeatsRes = usePopularSeats().data;
  const myFavoriteSeatsRes = useMyFavoriteSeats().data;
  console.log('popularSeatsRes', popularSeatsRes);

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-start px-1 pb-20 md:px-10">
      <Header isAdmin={!!isAdmin} isClusterPage />
      <div className="flex h-full w-[1280px] flex-col gap-10">
        <div className="flex w-full flex-col items-start justify-center gap-6">
          <h1 className="text-4xl text-darkblue">클러스터 현황</h1>
          <div className="flex w-1/2 flex-col items-start justify-center gap-6 rounded-xl border-2 border-darkblue p-6">
            <h4 className="text-2xl text-darkblue">클러스터별 이용율</h4>
            <div className="grid w-full grid-flow-col grid-rows-2 flex-row items-center justify-center gap-3 md:gap-10">
              {clusterUsageRes?.map(
                (cluster) =>
                  cluster.name !== 'c3' &&
                  cluster.name !== 'c4' && (
                    <PieChart
                      data={[
                        cluster.usingImacCount,
                        cluster.totalImacCount - cluster.usingImacCount,
                      ]}
                      labels={[`사용 중인 자리`, '빈 자리']}
                      clusterName={cluster.name}
                      rate={[cluster.usingImacCount, cluster.totalImacCount]}
                      key={cluster.name}
                    />
                  ),
              )}
            </div>
          </div>
          <div className="flex min-w-[48%] flex-col items-start justify-center gap-6 rounded-xl border-2 border-darkblue p-6">
            <h4 className="text-2xl text-darkblue">클러스터 맥 사용 현황</h4>
            <div className="flex w-full items-center justify-center gap-3 md:gap-10">
              {imacUsageRes && (
                <PieChart
                  data={[
                    imacUsageRes.usingImacUserCount,
                    imacUsageRes.totalUserCount - imacUsageRes.usingImacUserCount,
                  ]}
                  labels={['아이맥 사용 인원', '개포 전체 인원']}
                  rate={[imacUsageRes.usingImacUserCount, imacUsageRes.totalUserCount]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-start justify-center gap-3 md:gap-10">
          <div className="flex w-full flex-col items-start justify-center gap-6">
            <h1 className="text-4xl text-darkblue">{userRes?.data?.intraName}님의 정보</h1>
            <div className="flex w-full flex-col items-start justify-start gap-6 rounded-xl border-2 border-darkblue p-6">
              <h4 className="text-2xl text-darkblue">내가 제일 자주 앉는 자리</h4>
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                <h2>{myFavoriteSeatsRes?.length !== 0 && myFavoriteSeatsRes?.[0]}</h2>
                <p className="text-xl">최근 이용 기록이 없어요 😶‍🌫️</p>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </main>
  );
}
