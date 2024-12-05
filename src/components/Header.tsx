import Image from 'next/image';
import SearchModal from '@/components/modals/SearchModal';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import Announcement from '@/components/announcement/Announcement';
import AdminLinkBtn from '@/components/buttons/AdminLinkBtn';

export default function Header({ isAdmin }: { isAdmin: boolean }) {
  return (
    <header className="flex flex-row items-center justify-between p-2 pb-0 md:p-4">
      <Image
        src="/image/logo/logoC.svg"
        alt="logo"
        width={200}
        height={100}
        className="h-[75px] w-[150px] lg:h-[100px] lg:w-[200px]"
      />
      <div className="flex flex-row gap-2">
        {isAdmin && <AdminLinkBtn />}
        <Announcement />
        <SearchModal />
        <LogoutBtn />
      </div>
    </header>
  );
}
