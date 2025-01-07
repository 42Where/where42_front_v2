import Image from 'next/image';
import HeaderMenu from '@/components/header/HeaderMenu';
import { useRouter } from 'next/router';

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
        src={`${isAdminPage ? '/image/logo/logoAdmin.svg' : '/image/logo/logoC.svg'}`}
        alt="logo"
        width={200}
        height={100}
        className={`${isAdmin && 'h-[50px] w-[100px] lg:h-[100px] lg:w-[300px]'} h-[50px] w-[100px] cursor-pointer lg:h-[100px] lg:w-[200px]`}
        onClick={() => router.push('/')}
      />
      <HeaderMenu isAdmin={isAdmin} isAdminPage={isAdminPage} isClusterPage={isClusterPage} />
    </header>
  );
}
