import { DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteGroup } from '@/hooks';
import Group from '@/types/Group';

type DeleteModalContentProps = {
  groups: Group[];
  curGroup: Group;
};

export function GroupDeleteContent({ groups, curGroup }: DeleteModalContentProps) {
  const deleteMutate = useDeleteGroup().mutate;

  function deleteClickHandler() {
    deleteMutate(curGroup);
  }

  return (
    <>
      <DialogTitle>그룹 삭제</DialogTitle>
      <span className=" inline">
        <h3 style={{ display: 'inline', margin: '0' }}>
          &quot; {groups.find((group) => group.groupId === curGroup.groupId)?.groupName}
          &quot;{' '}
        </h3>
        그룹을 삭제하시겠습니까?
      </span>
      <div className="flex flex-row items-center justify-between">
        <div />
        <div className="flex flex-row gap-2">
          <Button variant="destructive" onClick={() => deleteClickHandler()}>
            삭제
          </Button>
          <DialogClose asChild>
            <Button className="bg-darkblue">취소</Button>
          </DialogClose>
        </div>
      </div>
    </>
  );
}
