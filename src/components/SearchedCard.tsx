import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import User from '@/types/User';
import groupApi from '@/api/groupApi';
import {
  useUserStore,
  useAddedMembersStore,
  useGroupsStore,
} from '@/lib/stores';

export default function SearchedCard({ member }: { member: User }) {
  const { user } = useUserStore();
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  const { groups, setGroups } = useGroupsStore();
  const [isAlreadyAdded, setIsAlreadyAdded] = React.useState(false);
  React.useEffect(() => {
    addedMembers.forEach((addedMember) => {
      if (addedMember === member.intraId) setIsAlreadyAdded(true);
    });
  }, [addedMembers]);
  return (
    <div className='flex flex-row justify-between p-2 rounded-2xl border-2'>
      <div className='flex flex-row items-center gap-1 md:gap-2'>
        <Avatar
          className={`size-14 border-[${
            member.location ? '#FFB5B5' : '#7F848D'
          }] border-4`}
        >
          <AvatarImage src={member.image} />
          <AvatarFallback />
        </Avatar>
        <div className='flex flex-col items-start gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <h3 className='text-l md:text-xl font-gsansLg text-[#132743]'>
              {member.intraName}
            </h3>
            <Button
              className={`rounded-full ${
                member.location
                  ? 'bg-[#132743]'
                  : 'bg-white hover:bg-white text-[#132743] border-2 border-[#132743]'
              } md:h-8 h-6 px-2 md:px-3 lg:text-xl text-l font-gsansMd`}
            >
              {member.location ? member.location : '퇴근'}
            </Button>
          </div>
          <p className='font-gsansMd text-[#4A6282] text-xl'>
            {member.comment}
          </p>
        </div>
      </div>
      {isAlreadyAdded ? null : (
        <div
          className='size-14 rounded-lg flex justify-center items-center right-[110px] hover:bg-gray-200'
          role='button'
          tabIndex={0}
          onClick={() => {
            groupApi.addMemberAtGroup({
              groupId: user?.defaultGroupId as number,
              members: [member.intraId],
            });
            setAddedMembers([...addedMembers, member.intraId]);
            const updatedGroups = groups.map((group) => {
              if (group.groupId === user?.defaultGroupId) {
                return {
                  ...group,
                  members: [...group.members, member],
                };
              }
              return group;
            });
            setGroups(updatedGroups);
            setIsAlreadyAdded(true);
          }}
        >
          <Image
            src='/icons/userAdd.svg'
            alt='userAdd'
            width={30}
            height={30}
            className='rounded-lg hover:bg-gray-200'
          />
        </div>
      )}
    </div>
  );
}
