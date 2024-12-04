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
import { useCheckedUsersStore, useGroupsStore, useUserStore } from '@/lib/stores';
import { useToast } from '@/components/ui/use-toast';

export default function GroupDeleteModal({ curGroup }: { curGroup: Group }) {
  const { checkedUsers } = useCheckedUsersStore();
  const { groups, setGroups } = useGroupsStore();
  const { user } = useUserStore();
  const { toast } = useToast();

  function clickHandler() {
    const temp = [...groups];
    const myGroup = temp.find((g) => g.groupId === curGroup.groupId);
    if (myGroup) {
      myGroup.isInEdit = false;
      setGroups(temp);
    }
    const tempGroup = temp.find((g) => g.groupId === curGroup.groupId);
    if (tempGroup) {
      tempGroup.members = tempGroup.members.filter((member) => !checkedUsers.includes(member));
      setGroups(temp);
    }
    if (curGroup.groupId === user?.defaultGroupId) {
      temp.forEach((g) => {
        const updatedGroup = {
          ...g,
          members: g.members.filter((member) => !checkedUsers.includes(member)),
        };
        return updatedGroup;
      });
      setGroups(temp);
    }
    const checkedUsersId = checkedUsers.map((u) => u.intraId);
    groupApi
      .removeMembersFromGroup({
        groupId: curGroup.groupId,
        members: checkedUsersId,
      })
      .then(() => toast({ title: '삭제되었습니다.' }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-l h-6 gap-2 rounded-full
          border-2 border-red-700 bg-white px-2 text-red-700 hover:bg-gray-200 md:h-8 md:px-3 lg:text-xl"
        >
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] text-darkblue transition-all duration-500  ease-out">
        <DialogTitle>그룹 삭제</DialogTitle>
        <p>선택한 카뎃들을 삭제하시겠습니까?</p>
        {curGroup.groupId === user?.defaultGroupId && (
          <p className=" text-red-700">* 기본 그룹에서 삭제할 시 모든 그룹에서 삭제됩니다.</p>
        )}
        <div className="flex flex-row items-center justify-between">
          <div />
          <div className="flex flex-row gap-2">
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => clickHandler()}>
                삭제
              </Button>
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
