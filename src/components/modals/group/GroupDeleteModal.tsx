import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Group } from '@/types';
import { useCheckedUsersStore } from '@/lib/stores';
import { useDeleteGroupMember, useMyInfo } from '@/hooks';

export default function GroupDeleteModal({ curGroup }: { curGroup: Group }) {
  const { checkedUsers } = useCheckedUsersStore();
  const { mutate } = useDeleteGroupMember();
  const user = useMyInfo().data;

  function clickHandler() {
    mutate({ groupId: curGroup.groupId, deleteMembers: checkedUsers });
  }

  if (!user) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-5 rounded-full border-2 border-red-700 bg-white
          px-2 text-xs text-red-700 hover:bg-gray-200 md:h-8 md:px-3 lg:text-xl"
        >
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] text-darkblue transition-all duration-500  ease-out">
        <DialogTitle>그룹 삭제</DialogTitle>
        <p>선택한 카뎃들을 삭제하시겠습니까?</p>
        {curGroup.groupId === user.defaultGroupId && (
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
