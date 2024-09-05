import React from 'react';
import ProfilePic from '@/components/ProfilePic';
import User from '@/types/User';
import { useCheckedUsersStore } from '@/lib/stores';
import { Checkbox } from '../ui/checkbox';
import UserSettingModal from '../Modals/UserSettingModal';
import Group from '@/types/Group';
import LocationBtn from '../Buttons/LocationBtn';

export default function ProfileCard({
  user,
  isEdit,
  isCheck,
  group,
}: {
  user: User;
  isEdit: boolean;
  isCheck: boolean;
  group: Group;
}) {
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  return (
    <div
      className='flex flex-row justify-between p-4 md:p-6 rounded-2xl border-2 hover:border-[#FFB5B5] items-center'
      role='button'
      tabIndex={0}
      onClick={() => {
        if (isEdit) {
          const temp = checkedUsers;
          if (isCheck) {
            temp.splice(temp.indexOf(user), 1);
            setCheckedUsers(temp);
          } else {
            temp.push(user);
            setCheckedUsers(temp);
          }
        }
      }}
    >
      <div className='flex flex-row items-center gap-4 md:gap-6'>
        <ProfilePic user={user} type='userCard' />
        <div className='flex flex-col items-start gap-1 md:gap-2'>
          <LocationBtn user={user} />
          <h3 className='text-xl md:text-3xl font-gsansLg text-[#132743]'>
            {user.intraName}
          </h3>
          <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
            {user.comment}
          </p>
        </div>
      </div>
      {isEdit ? (
        <Checkbox className='size-8 border-4 rounded-lg' checked={isCheck} />
      ) : (
        <UserSettingModal targUser={user} targGroup={group} />
      )}
    </div>
  );
}
