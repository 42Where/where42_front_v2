import Image from 'next/image';
import HeaderMenu from '@/components/header/HeaderMenu';
import { useRouter } from 'next/router';
import logoAdmin from '@/assets/logo/logoAdmin.svg';
import logoC from '@/assets/logo/logoC.svg';

export default function Header({
  isAdmin,
  isAdminPage,
  isClusterPage,
}: {
  isAdmin: boolean;
  isAdminPage?: boolean;
  isClusterPage?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="flex w-full flex-row items-center justify-between p-2 pb-0 md:p-4">
      <Image
        src={isAdminPage ? logoAdmin : logoC}
        alt="logo"
        className="h-8 w-fit cursor-pointer lg:h-16"
        onClick={() => router.push('/')}
      />
      <HeaderMenu isAdmin={isAdmin} isAdminPage={isAdminPage} isClusterPage={isClusterPage} />
    </header>
  );
}
