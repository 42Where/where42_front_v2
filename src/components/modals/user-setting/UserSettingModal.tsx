import { useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { DialogTrigger, Dialog, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useMyInfo, useGroupList } from '@/hooks';
import { useCheckedUsersStore } from '@/lib/stores';
import { User, Group } from '@/types';
import functionButton from '@/assets/functionButton.svg';
import { UserAddContent, UserDeleteContent } from './contents';

export default function UserSettingModal({
  targUser,
  targGroup,
}: {
  targUser: User;
  targGroup: Group;
}) {
  const [isDelete, setIsDelete] = useState<boolean>(true);
  const { setCheckedUsers } = useCheckedUsersStore();
  const queryClient = useQueryClient();
  const user = useMyInfo().data;
  const groups = useGroupList().data;

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
      queryClient.setQueryData(['groupList'], temp);
    }
  }

  if (!user || !groups) return null;
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={functionButton}
            alt="function"
            width={30}
            height={30}
            className="size-[40px] rounded-2xl p-2 hover:bg-gray-200 md:size-[50px]"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="min-w-50 text-darkblue">
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
      <DialogContent className="text-darkblue transition-all duration-500 ease-out">
        {!isDelete && <UserAddContent targUser={targUser} user={user} groups={groups} />}
        {isDelete && <UserDeleteContent targUser={targUser} targGroup={targGroup} user={user} />}
      </DialogContent>
    </Dialog>
  );
}
