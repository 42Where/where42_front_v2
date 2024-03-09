import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className='flex items-center p-6 pt-2 gap-2'>
      <Skeleton className='size-16 md:size-28 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-[30px] w-[200px] md:w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
}
