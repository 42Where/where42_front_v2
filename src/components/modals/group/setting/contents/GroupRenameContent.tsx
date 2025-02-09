import { useState, useRef, FormEvent } from 'react';
import { DialogTitle } from '@/components/ui/dialog';
import { XBtn } from '@/components/buttons';
import { useRenameGroup } from '@/hooks';
import Group from '@/types/Group';

type RenameModalContentProps = {
  curGroup: Group;
  groupName: string;
  setGroupName: (groupName: string) => void;
};

export function GroupRenameContent({ curGroup, groupName, setGroupName }: RenameModalContentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const renameMutate = useRenameGroup().mutate;
  const [resultMessage, setResultMessage] = useState<string>('');

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue || !formRef || typeof formRef === 'function') return;
    formRef.current?.reset();
    setGroupName('');
    setResultMessage('설정 되었습니다.');
    renameMutate(
      { groupId: curGroup.groupId, groupName: inputValue },
      {
        onError: () => setResultMessage('설정 중 오류가 발생했습니다. 다시 시도해 주세요.'),
      },
    );
  }

  return (
    <>
      <DialogTitle>그룹명 수정</DialogTitle>
      <div className="flex w-full flex-row items-center gap-2  rounded-xl border border-gray-400 p-2 shadow-lg">
        <form
          className="flex w-full flex-row items-center gap-2"
          ref={formRef}
          onSubmit={async (e) => submitHandler(e)}
        >
          <input
            ref={inputRef}
            className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
            placeholder="새로운 그룹명을 입력해주세요"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </form>
        {groupName && (
          <XBtn
            onClick={() => {
              if (!formRef || typeof formRef === 'function') return;
              formRef.current?.reset();
              setGroupName('');
            }}
          />
        )}
      </div>
      <p className="text-l  text-darkblue">{resultMessage}</p>
    </>
  );
}
