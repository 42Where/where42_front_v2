import React from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useGroupsStore, useUserStore } from '@/lib/stores';
import { Button } from '../ui/button';
import groupApi from '@/api/groupApi';
import User from '@/types/User';
import Group from '@/types/Group';
import { useCheckedUsersStore } from '@/lib/stores';

export default function UserSettingModal({
  targUser,
  targGroup,
}: {
  targUser: User;
  targGroup: Group;
}) {
  const { user } = useUserStore();
  const [isDelete, setIsDelete] = React.useState<boolean>(true);
  const { groups, setGroups } = useGroupsStore();
  const [checkedGroups, setCheckedGroups] = React.useState<number[]>([]);
  const targGroupId = targGroup.groupId;
  const { setCheckedUsers } = useCheckedUsersStore();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src='/Icons/functionButton.svg'
            alt='function'
            width={30}
            height={30}
            className='rounded-2xl hover:bg-gray-200 size-[40px] md:size-[50px] p-2'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='bottom'
          className='font-gsansMd min-w-50 text-[#132743]'
        >
          <DialogTrigger asChild onClick={() => setIsDelete(false)}>
            <DropdownMenuItem className='text-xl'>
              다른 그룹에 추가하기
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className='text-xl'
            onClick={() => setCheckedUsers([targUser])}
          >
            유저 선택하기
          </DropdownMenuItem>
          <DialogTrigger asChild onClick={() => setIsDelete(true)}>
            <DropdownMenuItem className='text-xl text-red-700'>
              그룹에서 삭제하기
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {!isDelete ? (
        <DialogContent className='transition-all ease-out duration-500 font-gsansMd text-[#132743]'>
          <DialogTitle>추가할 그룹을 선택하세요</DialogTitle>
          <div className='flex flex-col gap-2'>
            {groups.map(
              (g) =>
                g.groupId !== user?.defaultGroupId && (
                  <Button
                    key={g.groupId}
                    className={`rounded-2xl ${
                      checkedGroups.includes(g.groupId)
                        ? 'bg-[#132743] text-white hover:bg-gray-500'
                        : 'bg-white border-2 border-[#132743] text-[#132743] hover:bg-gray-200'
                    } border-0 border-[#132743] py-1 px-3 text-xl font-gsansMd gap-2`}
                    onClick={() => {
                      if (checkedGroups.includes(g.groupId)) {
                        setCheckedGroups(
                          checkedGroups.filter(
                            (groupId) => groupId !== g.groupId
                          )
                        );
                      } else {
                        setCheckedGroups([...checkedGroups, g.groupId]);
                      }
                    }}
                  >
                    {g.groupName}
                  </Button>
                )
            )}
          </div>
          <div className='flex flex-row items-center justify-between'>
            <div />
            <div className='flex flex-row gap-2'>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    checkedGroups.forEach((groupId) => {
                      const temp = groups;
                      const tempGroup = temp.find((g) => g.groupId === groupId);
                      if (!tempGroup) return;
                      let isExist = false;
                      tempGroup.members.forEach((member) => {
                        if (targUser.intraId === member.intraId) {
                          isExist = true;
                        }
                      });
                      if (isExist) return;
                      groupApi
                        .addMemberAtGroup({
                          groupId,
                          members: [targUser.intraId],
                        })
                        .then(() => {
                          if (tempGroup?.members) {
                            tempGroup.members = [
                              ...tempGroup.members,
                              targUser,
                            ];
                            setGroups(temp);
                          }
                        });
                    });
                  }}
                >
                  그룹에 추가
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className='bg-[#132743]'>취소</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className='transition-all ease-out duration-500 max-w-[425px] font-gsansMd text-[#132743]'>
          <DialogTitle>그룹 삭제</DialogTitle>
          <span className='font-gsansMd inline'>
            <p
              className='font-gsansLg'
              style={{ display: 'inline', margin: '0' }}
            >
              &quot;{targUser.intraName}&quot;
            </p>
            <p style={{ display: 'inline', margin: '0' }}>님을</p>
            <p
              className='font-gsansLg'
              style={{ display: 'inline', margin: '0' }}
            >
              &quot;{targGroup.groupName}&quot;{' '}
            </p>
            그룹으로부터 삭제하시겠습니까?
          </span>
          {targGroup.groupId === user?.defaultGroupId && (
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
                    const tempGroup = temp.find(
                      (g) => g.groupId === targGroupId
                    );
                    if (tempGroup) {
                      tempGroup.members = tempGroup.members.filter(
                        (member) => member.intraId !== targUser.intraId
                      );
                      setGroups(temp);
                    }
                    if (targGroupId === user?.defaultGroupId) {
                      temp = groups;
                      temp.forEach((g) => {
                        g.members = g.members.filter(
                          (member) => member.intraId !== targUser.intraId
                        );
                      });
                      setGroups(temp);
                    }
                    groupApi.removeMembersFromGroup({
                      groupId: targGroupId,
                      members: [targUser.intraId],
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
      )}
    </Dialog>
  );
}
