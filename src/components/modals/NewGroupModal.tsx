import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGroupsStore } from '@/lib/stores';
import groupApi from '@/api/groupApi';
import Group from '@/types/Group';

export default function NewGroupModal() {
  const { groups, setGroups } = useGroupsStore();
  const [resultMessage, setResultMessage] = React.useState<string>('');
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState<string>('');
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setResultMessage('');
            formRef.current?.reset();
            setSearchValue('');
          }, 100);
        } else {
          setResultMessage('');
          formRef.current?.reset();
          setSearchValue('');
        }
      }}
    >
      <DialogTrigger>
        <Button
          className='rounded-full bg-white border-2 border-[#132743] py-1 px-3
          text-l lg:text-xl text-[#132743] font-gsansMd hover:bg-gray-200 gap-2 w-30 h-8 lg:w-30 lg:h-10'
        >
          <Image
            src='/icons/newGroup.svg'
            alt='newGroup'
            width={20}
            height={20}
          />
          새 그룹
        </Button>
      </DialogTrigger>
      <DialogContent className='transition-all ease-out duration-500 max-w-[425px]'>
        <DialogHeader className='gap-2'>
          <DialogTitle>새로운 그룹 생성</DialogTitle>
          <div className='flex flex-row items-center gap-2 p-2  w-full border border-gray-400 rounded-xl shadow-lg'>
            <form
              className='flex flex-row items-center gap-2 w-full'
              ref={formRef}
              onSubmit={async (e) => {
                e.preventDefault();
                const inputValue = inputRef.current?.value;
                if (!inputValue) return;
                formRef.current?.reset();
                setSearchValue('');
                setResultMessage('설정 되었습니다.');
                groupApi
                  .createGroup({ groupName: inputValue })
                  .then((res) => {
                    const newGroup = {
                      groupId: res.groupId,
                      groupName: res.groupName,
                      members: [],
                      isFolded: false,
                      isInEdit: false,
                    } as Group;
                    const temp = groups;
                    temp.push(newGroup);
                    setGroups(temp);
                  })
                  .catch((error) => {
                    console.error(error);
                    setResultMessage(
                      '설정 중 오류가 발생했습니다. 다시 시도해 주세요.'
                    );
                  });
              }}
            >
              <input
                ref={inputRef}
                className='w-full bg-transparent outline-none placeholder:text-gray-500 dark:text-gray-700 text-l font-gsansMd text-[#132743]'
                placeholder='생성할 그룹의 이름을 입력하세요.'
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            {searchValue && (
              <X
                className='size-6'
                onClick={() => {
                  formRef.current?.reset();
                  setSearchValue('');
                }}
              />
            )}
          </div>
          <p className='text-l font-gsansMd text-[#132743]'>{resultMessage}</p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
