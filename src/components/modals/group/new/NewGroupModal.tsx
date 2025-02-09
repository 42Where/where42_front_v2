import { useState, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { XBtn } from '@/components/buttons';
import { useToast } from '@/components/ui/use-toast';
import { useCreateGroup, useGroupList } from '@/hooks';
import newGroup from '@/assets/newGroup.svg';
import { DuplicatedGroupAddContent } from '@/components/modals/group/new/contents/DuplicatedGroupAddContent';
import { GroupAddMembersContent } from '@/components/modals/group/new/contents/GroupAddMembersContent';

export default function NewGroupModal() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [groupId, setGroupId] = useState(0);
  const newGroupMutate = useCreateGroup().mutateAsync;
  const groups = useGroupList().data;
  const { toast } = useToast();

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue || !groups) return;
    formRef.current?.reset();
    setSearchValue('');
    if (groups.some((group) => group.groupName === inputValue)) {
      setIsDuplicated(true);
      return;
    }
    try {
      const { groupId: newGroupId } = await newGroupMutate(inputValue);
      setGroupId(newGroupId);
      setIsAddingUser(true);
    } catch {
      toast({
        title: '그룹 생성중 문제가 발생했습니다.',
      });
    }
  }

  if (!groups) return null;
  return (
    // 그룹 생성 후 친구 추가를 하지 않고 닫았을 때 clean up이 되도록
    <Dialog onOpenChange={(isOpen) => !isOpen && setIsAddingUser(false)}>
      <DialogTrigger>
        <Button
          className="h-6 gap-2 rounded-full border-2 border-darkblue
          bg-white px-3 py-1  text-xs text-darkblue hover:bg-gray-200 md:h-8 lg:h-10 lg:text-xl"
        >
          <Image src={newGroup} alt="newGroup" width={20} height={20} />새 그룹
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-full max-w-[800px] flex-col items-center justify-center gap-2 transition-all duration-500 ease-out">
        <DuplicatedGroupAddContent
          newGroupName={newGroupName}
          setSearchValue={setSearchValue}
          setIsDuplicated={setIsDuplicated}
          setIsAddingUser={setIsAddingUser}
          setGroupId={setGroupId}
          isDuplicated={isDuplicated}
        />
        <DialogTitle>새로운 그룹 생성</DialogTitle>
        {!isAddingUser && (
          <div className="flex w-full flex-row items-center gap-2  rounded-xl border border-gray-400 p-2 shadow-lg">
            <form
              className="flex w-full flex-row items-center gap-2"
              ref={formRef}
              onSubmit={async (e) => submitHandler(e)}
            >
              <input
                ref={inputRef}
                className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
                placeholder="생성할 그룹의 이름을 입력하세요."
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </form>
            {searchValue && <XBtn onClick={() => formRef.current?.reset()} />}
          </div>
        )}
        {isAddingUser && (
          <GroupAddMembersContent
            setIsAddingUser={setIsAddingUser}
            groupId={groupId}
            groups={groups}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
