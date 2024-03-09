import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import groupApi from '@/api/groupApi';
import Group from '@/types/Group';
import {
  useCheckedUsersStore,
  useGroupsStore,
  useUserStore,
} from '@/lib/stores';

export default function GroupDeleteModal({ curGroup }: { curGroup: Group }) {
  const { checkedUsers } = useCheckedUsersStore();
  const { groups, setGroups } = useGroupsStore();
  const { user } = useUserStore();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='rounded-full bg-white border-2 border-red-700  font-gsansMd
          md:h-8 h-6 px-2 md:px-3 lg:text-xl text-l hover:bg-gray-200 gap-2 text-red-700'
        >
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent className='transition-all ease-out duration-500 max-w-[425px] font-gsansMd text-[#132743]'>
        <DialogTitle>그룹 삭제</DialogTitle>
        <p className='font-gsansMd'>선택한 카뎃들을 삭제하시겠습니까?</p>
        {curGroup.groupId === user?.defaultGroupId && (
          <p className='font-gsansMd text-red-700'>
            * 기본 그룹에서 삭제할 시 모든 그룹에서 삭제됩니다.
          </p>
        )}
        <div className='flex flex-row items-center justify-between'>
          <div />
          <div className='flex flex-row gap-2'>
            <DialogClose asChild>
              <Button
                variant='destructive'
                onClick={() => {
                  let temp = groups;
                  const myGroup = temp.find(
                    (g) => g.groupId === curGroup.groupId
                  );
                  if (myGroup) {
                    myGroup.isInEdit = false;
                    setGroups(temp);
                  }
                  const tempGroup = temp.find(
                    (g) => g.groupId === curGroup.groupId
                  );
                  if (tempGroup) {
                    tempGroup.members = tempGroup.members.filter(
                      (member) => !checkedUsers.includes(member)
                    );
                    setGroups(temp);
                  }
                  if (curGroup.groupId === user?.defaultGroupId) {
                    temp = groups;
                    temp.forEach((g) => {
                      g.members = g.members.filter(
                        (member) => !checkedUsers.includes(member)
                      );
                    });
                    setGroups(temp);
                  }
                  const checkedUsersId = checkedUsers.map(
                    (user) => user.intraId
                  );
                  groupApi.removeMembersFromGroup({
                    groupId: curGroup.groupId,
                    members: checkedUsersId,
                  });
                }}
              >
                삭제
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className='bg-[#132743]'>취소</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
