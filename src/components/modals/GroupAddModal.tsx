import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Group from '@/types/Group';
import { useCheckedUsersStore } from '@/lib/stores';
import { useAddGroupMember, useMyInfo, useGroupList } from '@/hooks';

export default function GroupAddModal() {
  const user = useMyInfo().data;
  const groups = useGroupList().data;
  const { checkedUsers } = useCheckedUsersStore();
  const [checkedGroups, setCheckedGroups] = useState<number[]>([]);
  const { mutate } = useAddGroupMember();
  if (!user || !groups) return null;

  function groupSelectClickHandler(g: Group) {
    if (checkedGroups.includes(g.groupId)) {
      setCheckedGroups(checkedGroups.filter((groupId) => groupId !== g.groupId));
    } else {
      setCheckedGroups([...checkedGroups, g.groupId]);
    }
  }

  function groupAddClickHandler() {
    checkedGroups.forEach((groupId) => mutate({ groupId, addMembers: [...checkedUsers] }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-5 gap-2 rounded-full border-2
          border-darkblue bg-white px-2 text-xs text-darkblue hover:bg-gray-200  md:h-8  md:px-3 lg:text-xl"
        >
          다른 그룹에 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="text-darkblue transition-all duration-500  ease-out">
        <DialogTitle>추가할 그룹을 선택하세요</DialogTitle>
        <div className="flex flex-col gap-2">
          {groups.map(
            (g) =>
              g.groupId !== user.defaultGroupId && (
                <Button
                  key={g.groupId}
                  className={`rounded-2xl ${
                    checkedGroups.includes(g.groupId)
                      ? 'bg-darkblue text-white hover:bg-gray-500'
                      : 'border-2 border-darkblue bg-white text-darkblue hover:bg-gray-200'
                  } gap-2 border-0 border-darkblue px-3 py-1  text-xl`}
                  onClick={() => groupSelectClickHandler(g)}
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
              <Button onClick={() => groupAddClickHandler()}>그룹에 추가</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-darkblue">취소</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
