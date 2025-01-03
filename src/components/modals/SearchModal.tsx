import { useState, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import SearchedCard from '@/components/cards/SearchedCard';
import SearchBtn from '@/components/buttons/SearchBtn';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import memberApi from '@/api/memberApi';
import { useUserStore } from '@/lib/stores';
import { SearchedUser } from '@/types/User';
import XBtn from '@/components/buttons/XBtn';

const SearchInputSchema = z.string().regex(/^[a-zA-Z0-9-]*$/, {
  message: '영어, 숫자, -만 입력 가능합니다.',
});
export default function SearchModal() {
  const { user } = useUserStore();
  const [resultMessage, setResultMessage] = useState<string>('');
  const [searchedUsers, setSearchedUsers] = useState<SearchedUser[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  function openHandler(open: boolean) {
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
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
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
      setResultMessage('나는 우주를 여행하는 당신의 영원한 친구입니다.');
      return;
    }
    setResultMessage('검색중입니다...');
    memberApi
      .searchMember({ keyWord: inputValue })
      .then((data) => {
        if (data.length > 0) {
          setSearchedUsers(data);
        } else setResultMessage('검색 결과가 없습니다.');
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 500) {
          setResultMessage('서버 에러가 발생했습니다. 관리자에게 문의해주세요');
          setSearchedUsers([]);
          return;
        }
        setResultMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요');
        setSearchedUsers([]);
      });
  }

  return (
    <Dialog onOpenChange={(open) => openHandler(open)}>
      <DialogTrigger>
        <SearchBtn />
      </DialogTrigger>
      <DialogContent
        className={`flex flex-col items-center transition-all duration-500 ease-out ${
          searchedUsers?.length ? 'max-w-[800px]' : 'max-w-[425px]'
        }`}
      >
        <DialogHeader className="gap-2">
          <DialogTitle>카뎃 검색</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-row items-center gap-2  rounded-xl border border-gray-400 p-2 shadow-lg">
          <Image src="/image/search.svg" width={20} height={20} alt="search" />
          <form
            className="flex w-full flex-row items-center gap-2"
            ref={formRef}
            onSubmit={async (e) => submitHandler(e)}
          >
            <input
              ref={inputRef}
              className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
              placeholder="검색할 카뎃의 아이디를 입력해주세요"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          {searchValue && (
            <XBtn
              onClick={() => {
                formRef.current?.reset();
                setSearchValue('');
              }}
            />
          )}
        </div>
        {/* TODO: make this ternary into HOC */}
        {/* eslint-disable-next-line no-nested-ternary */}
        {searchedUsers?.length ? (
          searchedUsers?.length > 4 ? (
            <div className="h-[400px] w-full overflow-scroll rounded-md md:h-[600px]">
              <div className="grid grid-flow-row gap-2 md:grid-cols-2">
                {searchedUsers?.map((searchedMember) => (
                  <SearchedCard key={searchedMember.intraId} member={searchedMember} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid w-full grid-flow-row gap-2 md:grid-cols-2">
              {searchedUsers?.map((searchedMember) => (
                <SearchedCard key={searchedMember.intraId} member={searchedMember} />
              ))}
            </div>
          )
        ) : (
          <p className="text-l  text-darkblue">{resultMessage}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
