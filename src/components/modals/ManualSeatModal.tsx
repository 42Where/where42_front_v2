import React from 'react';
import { X } from 'lucide-react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUserStore } from '@/lib/stores';
import locationApi from '@/api/locationApi';
import { Button } from '../ui/button';

export default function ManualSeatModal() {
  const { user, setUser } = useUserStore();
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
      <DialogTrigger asChild>
        <Button
          className={`rounded-full ${
            user.location
              ? 'bg-[#132743]'
              : 'bg-white hover:bg-white text-[#132743] border-2 border-[#132743]'
          } h-6 md:h-8 px-2 md:px-3 md:text-xl font-gsansMd`}
        >
          {user.location ? user.location : '퇴근'}
        </Button>
      </DialogTrigger>
      <DialogContent className='transition-all ease-out duration-500 max-w-[425px]'>
        <DialogHeader className='gap-2'>
          <DialogTitle>수동 자리 설정</DialogTitle>
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
                locationApi
                  .setCustomLocation({ location: inputValue })
                  .then(() => {
                    const temp = user;
                    if (temp) temp.location = inputValue;
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
                placeholder='나타내실 위치를 입력해주세요'
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
