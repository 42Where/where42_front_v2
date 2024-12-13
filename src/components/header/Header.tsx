import Image from 'next/image';
import HeaderMenu from '@/components/header/HeaderMenu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HomeLinkBtn from '@/components/buttons/HomeLinkBtn';

export default function Header({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const [inAdminPage, setInAdminPage] = useState(false);

  useEffect(() => {
    if (router.pathname === '/admin') setInAdminPage(true);
  }, [router, setInAdminPage]);

  return (
    <header className="flex flex-row items-center justify-between p-2 pb-0 md:p-4">
      <Image
        src={`${inAdminPage ? '/image/logo/logoAdmin.svg' : '/image/logo/logoC.svg'}`}
        alt="logo"
        width={200}
        height={100}
        className={`${isAdmin && 'h-[50px] w-[100px] lg:h-[100px] lg:w-[300px]'} h-[50px] w-[100px] lg:h-[100px] lg:w-[200px]`}
      />
      {inAdminPage ? <HomeLinkBtn /> : <HeaderMenu isAdmin={isAdmin} />}
    </header>
  );
}
