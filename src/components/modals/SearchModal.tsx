import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { z } from 'zod';
import SearchedCard from '@/components/SearchedCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import memberApi from '@/api/memberApi';
import { useUserStore } from '@/lib/stores';
import User from '@/types/User';
import { ScrollArea } from '@/components/ui/scroll-area';

const SearchInputSchema = z.string().regex(/^[a-zA-Z0-9-]*$/, {
  message: '영어, 숫자, -만 입력 가능합니다.',
});
export default function SearchModal() {
  const { user } = useUserStore();
  const [resultMessage, setResultMessage] = React.useState<string>('');
  const [searchedUsers, setSearchedUsers] = React.useState<User[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState<string>('');
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setSearchedUsers([]);
            setResultMessage('');
            formRef.current?.reset();
            setSearchValue('');
          }, 100);
        } else {
          setSearchedUsers([]);
          setResultMessage('');
          formRef.current?.reset();
          setSearchValue('');
        }
      }}
    >
      <DialogTrigger asChild>
        <div
          className='size-10 lg:size-14 rounded-lg flex justify-center items-center hover:bg-gray-200'
          role='button'
          tabIndex={0}
        >
          <Image
            src='/Icons/search.svg'
            alt='search'
            width={40}
            height={40}
            className='rounded-lg hover:bg-gray-200 lg:size-[40px] size-[30px]'
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className={`transition-all ease-out duration-500 ${
          searchedUsers?.length ? 'max-w-[800px]' : 'max-w-[425px]'
        }`}
      >
        <DialogHeader className='gap-2'>
          <DialogTitle>카뎃 검색</DialogTitle>
        </DialogHeader>
        <div className='flex flex-row items-center gap-2 p-2  w-full border border-gray-400 rounded-xl shadow-lg'>
          <Image src='/Icons/search.svg' width={20} height={20} alt='search' />
          <form
            className='flex flex-row items-center gap-2 w-full'
            ref={formRef}
            onSubmit={async (e) => {
              e.preventDefault();
              const inputValue = inputRef.current?.value;
              setSearchedUsers([]);
              if (!inputValue || inputValue.length < 3) {
                setResultMessage('3글자 이상 입력해주세요.');
                return;
              }
              try {
                SearchInputSchema.parse(inputValue); // Zod를 사용하여 입력값 검사
              } catch (error: any) {
                const errors = JSON.parse(error.message);
                setResultMessage(errors[0].message);
                return;
              }
              formRef.current?.reset();
              setSearchValue('');
              if (inputValue === user?.intraName) {
                setResultMessage(
                  '나는 우주를 여행하는 당신의 영원한 친구입니다.'
                );
                return;
              }
              setResultMessage('검색중입니다...');
              memberApi
                .searchMember({ keyWord: inputValue })
                .then((data) => {
                  if (data.length > 0) {
                    setSearchedUsers(data);
                  } else {
                    console.log(data.length);
                    setResultMessage('검색 결과가 없습니다.');
                  }
                })
                .catch((error) => {
                  console.error(error);
                  setResultMessage(
                    '검색 중 오류가 발생했습니다. 다시 시도해주세요'
                  );
                  setSearchedUsers([]);
                });
            }}
          >
            <input
              ref={inputRef}
              type='search'
              className='w-full bg-transparent outline-none placeholder:text-gray-500 dark:text-gray-700 text-l font-gsansMd text-[#132743]'
              placeholder='검색할 카뎃의 아이디를 입력해주세요'
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          <input type='search' placeholder='test' className='w-full' />
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
        {searchedUsers?.length ? (
          searchedUsers?.length > 4 ? (
            <ScrollArea className='h-[200px] md:h-[600px] w-[320px] md:w-[740px] rounded-md'>
              <div className='grid grid-flow-row md:grid-cols-2 gap-2'>
                {searchedUsers?.map((searchedMember) => (
                  <SearchedCard
                    key={searchedMember.intraId}
                    member={searchedMember}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className='grid grid-flow-row md:grid-cols-2 gap-2'>
              {searchedUsers?.map((searchedMember) => (
                <SearchedCard
                  key={searchedMember.intraId}
                  member={searchedMember}
                />
              ))}
            </div>
          )
        ) : (
          <p className='text-l font-gsansMd text-[#132743]'>{resultMessage}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
