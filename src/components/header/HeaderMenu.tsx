import SearchModal from '@/components/modals/SearchModal';
import { LogoutBtn } from '@/components/buttons';
import Announcements from '@/components/announcement/Announcements';
import { AdminLink, ClusterLink, HomeLink, StatLink } from '@/components/links';
import { useRouter } from 'next/router';

export default function HeaderMenu({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const isClusterPage = router.pathname.includes('cluster');
  const isStatPage = router.pathname.includes('stat');
  const isAdminPage = router.pathname.includes('admin');
  return (
    <div className="flex flex-row gap-2">
      {isAdmin && <AdminLink />}
      {isClusterPage || isAdminPage ? <HomeLink /> : <ClusterLink />}
      {isStatPage ? <HomeLink /> : <StatLink />}
      <Announcements />
      <SearchModal />
      <LogoutBtn />
    </div>
  );
}
