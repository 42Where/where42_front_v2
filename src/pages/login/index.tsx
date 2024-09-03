import React from 'react';
import Image from 'next/image';
import LoginBtn from '@/components/Buttons/LoginBtn';

export default function LoginPage() {
  return (
    <main className='min-h-[100vh] w-full flex flex-col sm:flex-row text-[#132743]'>
      <div className='sm:relative sm:w-1/2 pt-8 sm:min-h-[50vh]'>
        <Image
          src='/Icons/left.png'
          alt='left'
          layout='fill'
          className='hidden sm:block'
        />
      </div>
      <div className='w-full sm:w-1/2 bg-white'>
        <div className='flex flex-col min-h-[50vh] justify-center items-center gap-8 sm:gap-12 h-full'>
          <Image
            src='/Icons/logo.svg'
            alt='logo'
            width={100}
            height={100}
            priority
            className='size-28 sm:size-32'
          />
          <span className='flex flex-col gap-4 items-center'>
            <h3 className='text-l sm:text-2xl font-gsansMd'>
              42Seoul 위치 정보 검색 서비스
            </h3>
            <h1 className='text-4xl sm:text-6xl font-gsansLg'>어디있니?</h1>
          </span>
          <LoginBtn />
        </div>
      </div>
      <div className='relative w-full min-h-[50vh] sm:hidden flex flex-col items-center justify-center'>
        <Image src='/Icons/bottom.png' alt='bottom' layout='fill' />
        <LoginBtn isMobile={true} />
      </div>
    </main>
  );
}
