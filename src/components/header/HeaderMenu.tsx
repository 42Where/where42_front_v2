import SearchModal from '@/components/modals/SearchModal';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import Announcements from '@/components/announcement/Announcements';
import AdminLinkBtn from '@/components/buttons/AdminLinkBtn';
import ClusterLinkBtn from '@/components/buttons/ClusterLinkBtn';
import HomeLinkBtn from '@/components/buttons/HomeLinkBtn';

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
      {isAdmin && <AdminLinkBtn />}
      {isClusterPage || isAdminPage ? <HomeLinkBtn /> : <ClusterLinkBtn />}
      <Announcements />
      <SearchModal />
      <LogoutBtn />
    </div>
  );
}
