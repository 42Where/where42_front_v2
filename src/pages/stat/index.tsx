import Header from '@/components/header/Header';
import { useClusterUsage, useImacUsage, useMyFavoriteSeats, usePopularSeats } from '@/hooks';
import useInfoSet from '@/hooks/useInfoSet';
import { Usage, MyStat, PopularSeats } from '@/components/stat';

export default function StatPage() {
  // TODO: Optimization - need to store intraName in localStorage
  // TODO: Reduce CLS - need to use skeleton loading
  const { userRes, adminStatusRes } = useInfoSet();
  const isAdmin = adminStatusRes.data?.admin;
  const clusterUsageRes = useClusterUsage().data;
  const imacUsageRes = useImacUsage().data;
  const popularSeatsRes = usePopularSeats().data;
  const myFavoriteSeatsRes = useMyFavoriteSeats().data;

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-start px-1 pb-20 md:px-10">
      <Header isAdmin={!!isAdmin} isClusterPage />
      <div className="flex h-full w-[1280px] flex-col gap-10">
        <Usage clusterUsage={clusterUsageRes} imacUsage={imacUsageRes} />
        <div className="flex w-full flex-row items-start justify-center gap-3 md:gap-10">
          <MyStat intraName={userRes.data?.intraName} myFavoriteSeatsRes={myFavoriteSeatsRes} />
          <PopularSeats popularSeatsRes={popularSeatsRes} />
        </div>
      </div>
    </main>
  );
}
