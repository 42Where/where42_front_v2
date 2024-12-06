import SearchModal from '@/components/modals/SearchModal';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import Announcement from '@/components/announcement/Announcement';
import AdminLinkBtn from '@/components/buttons/AdminLinkBtn';

export default function HeaderMenu({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="flex flex-row gap-2">
      {isAdmin && <AdminLinkBtn />}
      <Announcement />
      <SearchModal />
      <LogoutBtn />
    </div>
  );
}
