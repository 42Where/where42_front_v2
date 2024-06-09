import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
        <Avatar
          className={`size-20 md:size-28 ${
            user.inOrOut || user.location || user.inCluster
              ? 'border-[#FFB5B5]'
              : ''
          } border-4 hover:border-[#bfb5ff]`}
          onClick={() => {
            if (!isEdit) {
              window.open(`https://profile.intra.42.fr/users/${user.intraId}`);
            }
          }}
        >
          <AvatarImage src={user.image} />
          <AvatarFallback />
        </Avatar>
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
