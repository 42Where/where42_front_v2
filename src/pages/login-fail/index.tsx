import React from 'react';
import Image from 'next/image';
import LoginBtn from '@/components/Buttons/LoginBtn';

export default function LoginFailPage() {
  return (
    <main className='min-h-[100vh] w-full flex flex-col sm:flex-row text-[#132743]'>
      <div className='sm:relative sm:w-1/2 pt-8 sm:min-h-[50vh]'>
        <Image
          src='/left.png'
          alt='left'
          layout='fill'
          className='hidden sm:block'
        />
      </div>
      <div className='w-full sm:w-1/2 bg-white'>
        {/* <Image
          src='/Icons/help.svg'
          alt='help'
          width={80}
          height={80}
          priority
          className='absolute top-2 right-2 size-10 sm:top-4 sm:right-4 sm:size-16'
        /> */}
        <div className='flex flex-col min-h-[50vh] justify-center items-center gap-8 sm:gap-8 h-full'>
          <Image
            src='/Icons/logo.svg'
            alt='logo'
            width={100}
            height={100}
            priority
            className='size-28 sm:size-32'
          />
          <span className='flex flex-col gap-4 items-center'>
            <h1 className='text-4xl sm:text-6xl font-gsansLg'>
              로그인에 실패했습니다.😢
            </h1>
            <h3 className='text-l sm:text-2xl font-gsansMd'>
              아래 버튼을 눌러 다시 시도해주세요.
            </h3>
            <h3 className='text-l sm:text-2xl font-gsansMd'>
              오류가 계속 반복될 경우 관리자에게 문의해주세요.
            </h3>
          </span>
          <LoginBtn />
        </div>
      </div>
      <div className='relative w-full min-h-[50vh] sm:hidden flex flex-col items-center justify-center'>
        <Image src='/bottom.png' alt='bottom' layout='fill' />
        <LoginBtn isMobile={true} />
      </div>
    </main>
  );
}
