import { DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useDeleteGroupMember } from '@/hooks';
import { Button } from '@/components/ui/button';
import { User, Group } from '@/types';

type UserDeleteContentProps = {
  targUser: User;
  targGroup: Group;
  user: User;
};

export function UserDeleteContent({ targUser, targGroup, user }: UserDeleteContentProps) {
  const deleteMutate = useDeleteGroupMember().mutate;
  const targGroupId = targGroup.groupId;
  function deleteClickHandler() {
    deleteMutate({
      deleteMembers: [targUser],
      groupId: targGroupId,
      isDefaultGroup: targGroup.groupId === user.defaultGroupId,
    });
  }
  return (
    <>
      <DialogTitle>그룹에서 삭제</DialogTitle>
      {/* 한 줄에 나타내려고 inline */}
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
      {targGroup.groupId === user.defaultGroupId && (
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
    </>
  );
}
