import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchModal from '@/components/Modals/SearchModal';
import LogoutBtn from '@/components/Buttons/LogoutBtn';

export default function Header() {
  const router = useRouter();
  return (
    <header className='flex flex-row justify-between items-center p-2 pb-0 md:p-4'>
      <Image
        src='/Icons/logoC.svg'
        alt='logo'
        width={200}
        height={100}
        className='lg:w-[200px] lg:h-[100px] w-[150px] h-[75px]'
      />
      <div className='flex flex-row gap-2'>
        <SearchModal />
        <LogoutBtn />
      </div>
    </header>
  );
}
