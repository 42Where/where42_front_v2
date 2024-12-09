import SearchModal from '@/components/modals/SearchModal';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import Announcements from '@/components/announcement/Announcements';
import AdminLinkBtn from '@/components/buttons/AdminLinkBtn';

export default function HeaderMenu({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="flex flex-row gap-2">
      {isAdmin && <AdminLinkBtn />}
      <Announcements />
      <SearchModal />
      <LogoutBtn />
    </div>
  );
}
