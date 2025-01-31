import { useState } from 'react';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useCheckedUsersStore, useAddedMembersStore } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import { User } from '@/types/User';
import Group from '@/types/Group';
import useMyInfo from '@/hooks/useMyInfo';
import useGroupList from '@/hooks/useGroupList';
import { useQueryClient } from '@tanstack/react-query';
import { useAddGroupMember, useDeleteGroupMember } from '@/hooks/useMutateGroups';

export default function UserSettingModal({
  targUser,
  targGroup,
}: {
  targUser: User;
  targGroup: Group;
}) {
  const [isDelete, setIsDelete] = useState<boolean>(true);
  const [checkedGroups, setCheckedGroups] = useState<number[]>([]);
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  const { setCheckedUsers } = useCheckedUsersStore();
  const { setQueryData } = useQueryClient();
  const user = useMyInfo().data;
  const groups = useGroupList().data;
  const targGroupId = targGroup.groupId;
  const addMutate = useAddGroupMember().mutate;
  const deleteMutate = useDeleteGroupMember().mutate;

  function selectClickHandler() {
    if (!groups) return;
    setCheckedUsers([targUser]);
    const temp = [...groups];
    const tempGroup = temp.find((g) => g.groupId === targGroup.groupId);
    if (tempGroup) {
      tempGroup.isInEdit = true;
      temp.map((g) => {
        const buf = g;
        if (g.groupId !== targGroup.groupId) buf.isInEdit = false;
        return buf;
      });
      setQueryData(['groupList'], temp);
    }
  }
  function addClickHandler() {
    if (!groups) return;
    checkedGroups.forEach((groupId) => {
      const temp = [...groups];
      const tempGroup = temp.find((g) => g.groupId === groupId);
      if (!tempGroup) return;
      let isExist = false;
      tempGroup.members.forEach((member) => {
        if (targUser.intraId === member.intraId) {
          isExist = true;
        }
      });
      if (isExist) return;
      addMutate({ groupId, members: tempGroup.members });
    });
  }
  function deleteClickHandler() {
    if (!groups) return;
    const buf = addedMembers.filter((addedMember) => addedMember !== targUser.intraId);
    setAddedMembers(buf);
    deleteMutate({ members: [targUser], groupId: targGroupId });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src="/image/functionButton.svg"
            alt="function"
            width={30}
            height={30}
            className="size-[40px] rounded-2xl p-2 hover:bg-gray-200 md:size-[50px]"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="min-w-50  text-darkblue">
          <DialogTrigger asChild onClick={() => setIsDelete(false)}>
            <DropdownMenuItem className="md:text-xl">다른 그룹에 추가하기</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="md:text-xl" onClick={() => selectClickHandler()}>
            유저 선택하기
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={() => setIsDelete(true)}>
            <DropdownMenuItem className="text-red-700 md:text-xl">
              그룹에서 삭제하기
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {!isDelete ? (
        <DialogContent className=" text-darkblue transition-all duration-500 ease-out">
          <DialogTitle>추가할 그룹을 선택하세요</DialogTitle>
          <div className="flex flex-col gap-2">
            {groups?.map(
              (g) =>
                g.groupId !== user?.defaultGroupId && (
                  <Button
                    key={g.groupId}
                    className={`rounded-2xl ${
                      checkedGroups.includes(g.groupId)
                        ? 'bg-darkblue text-white hover:bg-gray-500'
                        : 'border-2 border-darkblue bg-white text-darkblue hover:bg-gray-200'
                    } gap-2 border-0 border-darkblue px-3 py-1  text-xl`}
                    onClick={() => {
                      if (checkedGroups.includes(g.groupId)) {
                        setCheckedGroups(checkedGroups.filter((groupId) => groupId !== g.groupId));
                      } else setCheckedGroups([...checkedGroups, g.groupId]);
                    }}
                  >
                    {g.groupName}
                  </Button>
                ),
            )}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div />
            <div className="flex flex-row gap-2">
              <DialogClose asChild>
                <Button onClick={() => addClickHandler()}>그룹에 추가</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-darkblue">취소</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-[425px]  text-darkblue transition-all duration-500 ease-out">
          <DialogTitle>그룹 삭제</DialogTitle>
          <span className="inline">
            <h3 style={{ display: 'inline', margin: '0' }}>
              &quot;
              {targUser.intraName}
              &quot;{' '}
            </h3>
            <p style={{ display: 'inline', margin: '0' }}>님을</p>
            <h3 style={{ display: 'inline', margin: '0' }}>
              {' '}
              &quot;{targGroup.groupName}
              &quot;{' '}
            </h3>
            그룹으로부터 삭제하시겠습니까?
          </span>
          {targGroup.groupId === user?.defaultGroupId && (
            <p className=" text-red-700">* 기본 그룹에서 삭제할 시 모든 그룹에서 삭제됩니다.</p>
          )}
          <div className="flex flex-row items-center justify-between">
            <div />
            <div className="flex flex-row gap-2">
              <DialogClose asChild>
                <Button variant="destructive" onClick={() => deleteClickHandler()}>
                  삭제
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-darkblue">취소</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
