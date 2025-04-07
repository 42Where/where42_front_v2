import { useState } from 'react';
import { DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAddGroupMember } from '@/hooks';
import { User, Group } from '@/types';

type UserAddContentProps = {
  targUser: User;
  user: User;
  groups: Group[];
};

export function UserAddContent({ targUser, user, groups }: UserAddContentProps) {
  const [checkedGroups, setCheckedGroups] = useState<number[]>([]);
  const addMutate = useAddGroupMember().mutate;

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
      addMutate({ groupId, addMembers: [targUser] });
    });
  }

  return (
    <>
      <DialogTitle>추가할 그룹을 선택하세요</DialogTitle>
      <div className="flex flex-col gap-2">
        {groups.map(
          (g) =>
            g.groupId !== user.defaultGroupId && (
              <Button
                key={g.groupId}
                className={`gap-2 rounded-2xl px-3 py-1 text-xl ${
                  checkedGroups.includes(g.groupId)
                    ? 'bg-darkblue text-white hover:bg-gray-700'
                    : 'bg-white text-darkblue hover:bg-gray-200'
                }`}
                onClick={() => {
                  if (checkedGroups.includes(g.groupId))
                    setCheckedGroups(checkedGroups.filter((groupId) => groupId !== g.groupId));
                  else setCheckedGroups([...checkedGroups, g.groupId]);
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
    </>
  );
}
