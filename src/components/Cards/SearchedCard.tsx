import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import User from '@/types/User';
import groupApi from '@/api/groupApi';
import {
  useUserStore,
  useAddedMembersStore,
  useGroupsStore,
} from '@/lib/stores';
import LocationBtn from '../Buttons/LocationBtn';
import { useToast } from '@/components/ui/use-toast';

export default function SearchedCard({
  member,
  onClick,
  isAddingUser,
}: {
  member: User;
  onClick?: () => void;
  isAddingUser?: boolean;
}) {
  const { user } = useUserStore();
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  const { groups, setGroups } = useGroupsStore();
  const [isAlreadyAdded, setIsAlreadyAdded] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    addedMembers.forEach((addedMember) => {
      if (addedMember === member.intraId) {
        setIsAlreadyAdded(true);
      }
    });
  }, [addedMembers]);

  return (
    <div
      className={`flex flex-row justify-between items-center p-2 rounded-2xl border-2 ${
        isAddingUser &&
        'cursor-pointer hover:border-[#FFB5B5] transition-transform transform active:scale-95'
      }`}
      onClick={() => onClick && onClick()}
    >
      <div className='flex flex-row items-center gap-4 md:gap-4'>
        <Avatar
          className={`size-16 md:size-20 ${
            member.location || member.inCluster || member.inOrOut
              ? 'border-[#FFB5B5]'
              : ''
          } border-4`}
        >
          <AvatarImage src={member.image} />
          <AvatarFallback />
        </Avatar>
        <div className='flex flex-col items-start gap-1'>
          <LocationBtn user={member} searchedUser={member} />
          <h3 className='text-xl md:text-2xl font-gsansLg text-[#132743]'>
            {member.intraName}
          </h3>
          <p className='font-gsansMd text-[#4A6282] text-sm md:text-md'>
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
            groupApi
              .addMemberAtGroup({
                groupId: user?.defaultGroupId as number,
                members: [member.intraId],
              })
              .then(() => {
                toast({
                  title: `'${member.intraName}'님을 친구 목록에 추가했습니다.`,
                });
              });
          }}
        >
          <Image
            src='/Icons/userAdd.svg'
            alt='userAdd'
            width={30}
            height={30}
            className='hover:bg-gray-200'
          />
        </div>
      )}
    </div>
  );
}
