import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
          <Link href='/v3/group' className='hidden sm:block'>
            <Button className='rounded-full bg-[#132743]' size='xlg'>
              L O G I N
            </Button>
          </Link>
        </div>
      </div>
      <div className='relative w-full min-h-[50vh] sm:hidden flex flex-col items-center justify-center'>
        <Image src='/bottom.png' alt='bottom' layout='fill' />
        <Link href='/v3/group' className='absolute z-auto'>
          <Button className='rounded-full bg-[#4A6282]' size='xlg'>
            L O G I N
          </Button>
        </Link>
      </div>
    </main>
  );
}
