import SearchModal from '@/components/modals/SearchModal';
import { LogoutBtn } from '@/components/buttons';
import Announcements from '@/components/announcement/Announcements';
import { AdminLink, ClusterLink, HomeLink } from '@/components/links';

export default function HeaderMenu({
  isAdmin,
  isAdminPage,
  isClusterPage,
}: {
  isAdmin: boolean;
  isAdminPage?: boolean;
  isClusterPage?: boolean;
}) {
  return (
    <div className="flex flex-row gap-2">
      {isAdmin && <AdminLink />}
      {isClusterPage || isAdminPage ? <HomeLink /> : <ClusterLink />}
      <Announcements />
      <SearchModal />
      <LogoutBtn />
    </div>
  );
}
