import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import User from '@/types/User';
import { useCheckedUsersStore } from '@/lib/stores';
import { Checkbox } from './ui/checkbox';
import UserSettingModal from './modals/UserSettingModal';
import Group from '@/types/Group';

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
  const [isPinkBorder, setIsPinkBorder] = React.useState(false); // 분홍색 테두리 상태

  // 로케이션 정보에 따라 분홍색 또는 회색 테두리 설정
  React.useEffect(() => {
    setIsPinkBorder(user.location !== null); // 유저의 로케이션이 있는지 여부에 따라 분홍색 테두리 설정
  }, [user.location]);

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
          className={`size-16 md:size-28 ${
            isPinkBorder ? 'border-[#FFB5B5]' : ''
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
        <div className='flex flex-col items-start gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <h3 className='text-l md:text-3xl font-gsansLg text-[#132743]'>
              {user.intraName}
            </h3>
            <Button
              className={`rounded-full md:h-8 h-6 px-2 md:px-3 lg:text-xl text-l font-gsansMd
              ${
                user.location
                  ? 'bg-[#132743] text-white'
                  : 'bg-white hover:bg-white  border-2 border-[#132743]'
              }`}
            >
              {user.location ? user.location : '퇴근'}
            </Button>
          </div>
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
