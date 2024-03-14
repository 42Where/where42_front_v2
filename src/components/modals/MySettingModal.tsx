import React from 'react';
import { X } from 'lucide-react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import memberApi from '@/api/memberApi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/lib/stores';
import locationApi from '@/api/locationApi';
import LocationCascader from '../LocationCascader';
import { Button } from '../ui/button';
import { DialogClose } from '@/components/ui/dialog';

export default function MySettingModal() {
  const [isMessage, setIsMessage] = React.useState<boolean>(false);
  const { user, setUser } = useUserStore();
  const [resultMessage, setResultMessage] = React.useState<string>('');
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState<string>(
    user?.comment || ''
  );
  const [seatValue, setSeatValue] = React.useState<string>('');

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setResultMessage('');
            formRef.current?.reset();
            setSearchValue(user?.comment || '');
          }, 100);
        } else {
          setResultMessage('');
          formRef.current?.reset();
          setSearchValue(user?.comment || '');
        }
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src='/Icons/setting.svg'
            alt='setting'
            width={60}
            height={60}
            className='rounded-lg hover:bg-gray-200 lg:size-[60px] size-[50px]'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='left'
          className='font-gsansMd min-w-50 text-[#132743]'
        >
          <DialogTrigger asChild onClick={() => setIsMessage(true)}>
            <DropdownMenuItem className='text-xl'>
              상태 메시지 수정
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setIsMessage(false)}>
            <DropdownMenuItem className='text-xl'>
              수동 위치 설정
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {isMessage ? (
        <DialogContent className='transition-all ease-out duration-500 max-w-[425px]'>
          <DialogHeader className='gap-2'>
            <DialogTitle>상태 메시지 설정</DialogTitle>
            <div className='flex flex-row items-center gap-2 p-2  w-full border border-gray-400 rounded-xl shadow-lg'>
              <form
                className='flex flex-row items-center gap-2 w-full'
                ref={formRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const inputValue = inputRef.current?.value;
                  if (!inputValue) return;
                  if (inputValue.length > 15) {
                    setResultMessage('15자 이하로 입력해주세요.');
                    return;
                  }
                  formRef.current?.reset();
                  setSearchValue('');
                  setResultMessage('설정 되었습니다.');
                  memberApi
                    .updateComment({ comment: inputValue })
                    .then(() => {
                      const temp = user;
                      if (temp) temp.comment = inputValue;
                      setUser(temp);
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
                  placeholder='상태 메시지를 입력해주세요'
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </form>
              {searchValue && (
                <>
                  <p
                    className={`text-l font-gsansMd text-[#132743] ${
                      searchValue.length > 15 ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {searchValue.length}/15
                  </p>
                  <X
                    className='size-6'
                    onClick={() => {
                      formRef.current?.reset();
                      setSearchValue('');
                    }}
                  />
                </>
              )}
            </div>
            <p className='text-l font-gsansMd text-[#132743]'>
              {resultMessage}
            </p>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className='transition-all ease-out duration-500 max-w-[550px] min-h-[300px]'>
          <DialogHeader className='gap-2'>
            <DialogTitle>수동 자리 설정</DialogTitle>
            <p className='text-l font-gsansMd text-[#132743]'>
              {resultMessage}
            </p>
            <LocationCascader setSeatValue={setSeatValue} />
            <div className='flex flex-row items-center justify-between'>
              <div />
              <div className='flex flex-row gap-2'>
                <Button
                  className='bg-[#132743]'
                  onClick={() => {
                    console.log(seatValue);
                    setResultMessage('설정 되었습니다.');
                    locationApi
                      .setCustomLocation({ location: seatValue })
                      .then(() => {
                        const temp = user;
                        if (temp) temp.location = seatValue;
                        setUser(temp);
                      })
                      .catch((error) => {
                        console.error(error);
                        setResultMessage(
                          '설정 중 오류가 발생했습니다. 다시 시도해 주세요.'
                        );
                      });
                  }}
                >
                  설정
                </Button>
                <DialogClose asChild>
                  <Button variant='destructive'>취소</Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}
