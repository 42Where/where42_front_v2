import Header from '@/components/header/Header';
import {
  useClusterUsage,
  useImacUsage,
  useMyFavoriteSeats,
  usePopularSeats,
  useAdminStatus,
} from '@/hooks';

export default function StatPage() {
  const adminStatusRes = useAdminStatus();
  const isAdmin = adminStatusRes.data?.admin;
  const clusterUsageRes = useClusterUsage().data;
  const imacUsageRes = useImacUsage().data;
  const popularSeatsRes = usePopularSeats().data;
  const myFavoriteSeatsRes = useMyFavoriteSeats().data;
  console.log('clusterUsageRes', clusterUsageRes);
  console.log('imacUsageRes', imacUsageRes);
  console.log('popularSeatsRes', popularSeatsRes);
  console.log('myFavoriteSeatsRes', myFavoriteSeatsRes);

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-start px-1 pb-20 md:px-10">
      <Header isAdmin={!!isAdmin} isClusterPage />
      <div className="flex flex-col items-center justify-center gap-4 md:gap-10" />
    </main>
  );
}
