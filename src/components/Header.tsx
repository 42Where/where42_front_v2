import React from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import SearchModal from './Modals/SearchModal';

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
        <div
          className='size-10 lg:size-14 rounded-lg flex justify-center items-center hover:bg-gray-200'
          role='button'
          tabIndex={0}
          onClick={() => {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            router.push('/login');
          }}
        >
          <Image
            src='/Icons/signOut.svg'
            alt='search'
            width={40}
            height={40}
            className='rounded-lg hover:bg-gray-200 lg:size-[40px] size-[30px]'
          />
        </div>
      </div>
    </header>
  );
}
