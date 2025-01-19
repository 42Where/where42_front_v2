import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import groupApi from '@/api/groupApi';
import Group from '@/types/Group';
import { useCheckedUsersStore, useGroupsStore } from '@/lib/stores';
import useMyInfo from '@/hooks/useMyInfo';

export default function GroupAddModal({ curGroup }: { curGroup: Group }) {
  const user = useMyInfo().data;
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  const { groups, setGroups } = useGroupsStore();
  const [checkedGroups, setCheckedGroups] = useState<number[]>([]);
  if (!user) return null;

  function groupSelectClickHandler(g: Group) {
    if (checkedGroups.includes(g.groupId)) {
      setCheckedGroups(checkedGroups.filter((groupId) => groupId !== g.groupId));
    } else {
      setCheckedGroups([...checkedGroups, g.groupId]);
    }
  }

  function groupAddClickHandler() {
    checkedGroups.forEach((groupId) => {
      const temp = [...groups];
      const myGroup = temp.find((g) => g.groupId === curGroup.groupId);
      if (myGroup) {
        myGroup.isInEdit = false;
        setGroups(temp);
      }
      const tempGroup = temp.find((g) => g.groupId === groupId);
      if (!tempGroup) return;
      const targUsers = [...checkedUsers];
      tempGroup.members.forEach((member) => {
        checkedUsers.forEach((u) => {
          if (u.intraId === member.intraId) {
            targUsers.splice(targUsers.indexOf(u), 1);
          }
        });
      });
      const targUserIds = targUsers.map((u) => u.intraId);
      groupApi.addMemberAtGroup({ groupId, members: targUserIds }).then(() => {
        if (tempGroup?.members) {
          tempGroup.members = [...tempGroup.members, ...targUsers];
          setGroups(temp);
          setCheckedUsers([]);
        }
      });
    });
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
