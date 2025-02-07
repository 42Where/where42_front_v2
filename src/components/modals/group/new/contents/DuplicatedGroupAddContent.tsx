import { useCreateGroup } from '@/hooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DuplicatedContentProps = {
  newGroupName: string;
  setSearchValue: (value: string) => void;
  setIsDuplicated: (value: boolean) => void;
  setIsAddingUser: (value: boolean) => void;
  setGroupId: (value: number) => void;
  isDuplicated: boolean;
};

export function DuplicatedGroupAddContent({
  newGroupName,
  setSearchValue,
  setIsDuplicated,
  setIsAddingUser,
  setGroupId,
  isDuplicated,
}: DuplicatedContentProps) {
  const newGroupMutate = useCreateGroup().mutateAsync;

  async function addDuplicatedGroupClickHandler() {
    const { groupId: newGroupId } = await newGroupMutate(newGroupName);
    setGroupId(newGroupId);
    setIsAddingUser(true);
    setIsDuplicated(false);
  }

  return (
    <AlertDialog open={isDuplicated}>
      <AlertDialogContent className="max-w-[425px] text-darkblue transition-all duration-500  ease-out">
        <AlertDialogHeader>
          <AlertDialogTitle>중복 그룹 확인</AlertDialogTitle>
          <AlertDialogDescription>
            현재
            <h3 style={{ display: 'inline', margin: '0' }}>
              &quot; {newGroupName}
              &quot;{' '}
            </h3>
            그룹이 이미 존재합니다. 같은 이름의 그룹을 생성하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.preventDefault();
              setSearchValue('');
              setIsDuplicated(false);
            }}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => addDuplicatedGroupClickHandler()}>
            계속 생성
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
