import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
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
            <h3 className='text-2xl sm:text-3xl font-gsansLg'>
              이 페이지는 존재하지 않습니다.
            </h3>
          </span>
          <Link href='/'>
            <Button className={`${'bg-[#132743]'} rounded-full `} size='xlg'>
              메인으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
      <div className='relative w-full min-h-[50vh] sm:hidden flex flex-col items-center justify-center'>
        <Image src='/bottom.png' alt='bottom' layout='fill' />
      </div>
    </main>
  );
}
