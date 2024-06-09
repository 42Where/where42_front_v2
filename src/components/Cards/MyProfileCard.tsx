import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import User from '@/types/User';
import { useCheckedStore } from '@/lib/stores';
import NewGroupModal from '../Modals/NewGroupModal';
import MySettingModal from '../Modals/MySettingModal';
import CustomLocationModal from '../Modals/CustomLocationModal';

export default function MyProfileCard({ user }: { user: User }) {
  useEffect(() => {
    console.log(localStorage.getItem('checked'));
    if (localStorage.getItem('checked') === 'true') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);
  const { checked, setChecked } = useCheckedStore();
  return (
    <div className='flex flex-row justify-between items-center pb-12 lg:px-8 pt-0 relative'>
      <div className='flex flex-row items-center gap-2 lg:gap-6'>
        <Avatar
          className={`size-24 lg:size-28 border-[${
            user.location ? '#FFB5B5' : '#7F848D'
          }] border-4`}
        >
          <AvatarImage src={user.image} />
          <AvatarFallback />
        </Avatar>
        <div className='flex flex-col items-start gap-2'>
          <CustomLocationModal />
          <h3 className='text-xl lg:text-3xl font-gsansLg text-[#132743]'>
            {user.intraName}
          </h3>
          <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
            {user.comment}
          </p>
        </div>
      </div>
      <MySettingModal />
      <div className='flex flex-row justify-center gap-2 absolute right-0 lg:right-10 bottom-0'>
        <Button
          className='gap-1 p-2 lg:p-4 lg:gap-2 rounded-full
           bg-white border-2 border-[#132743]
           text-l lg:text-xl text-[#132743] font-gsansMd hover:bg-gray-200 w-40 h-8 lg:w-52 lg:h-10'
          onClick={() => {
            setChecked(!checked);
            localStorage.setItem('checked', JSON.stringify(!checked));
            console.log(localStorage.getItem('checked'));
          }}
        >
          <Checkbox checked={checked} className='size-4 border-2' size={12} />
          출근한 친구만 보기
        </Button>
        <NewGroupModal />
      </div>
    </div>
  );
}
