import { useState, useRef, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomLocationContent from '@/components/utils/CustomLocationContent';
import SettingBtn from '@/components/buttons/MySettingBtn';
import XBtn from '@/components/buttons/XBtn';
import { useDeleteComment, useUpdateComment, useMyInfo } from '@/hooks';

export default function MySettingModal() {
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const user = useMyInfo().data;
  const [resultMessage, setResultMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>(user?.comment || '');
  const deleteMutate = useDeleteComment().mutate;
  const updateMutate = useUpdateComment().mutate;

  function openHandler(open: boolean) {
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
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (inputValue === undefined) return;
    if (inputValue.length > 15) {
      setResultMessage('15자 이하로 입력해주세요.');
      return;
    }
    formRef.current?.reset();
    setSearchValue('');
    setResultMessage('설정 되었습니다.');
    if (inputValue === user?.comment || !user) return;
    if (inputValue === '') deleteMutate();
    updateMutate(searchValue);
  }

  if (!user) return null;
  return (
    <Dialog onOpenChange={(open) => openHandler(open)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SettingBtn />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" className=" min-w-50 text-darkblue">
          <DialogTrigger asChild onClick={() => setIsMessage(true)}>
            <DropdownMenuItem className="md:text-xl">상태 메시지 수정</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={() => setIsMessage(false)}>
            <DropdownMenuItem className="md:text-xl">수동 위치 설정</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {isMessage ? (
        <DialogContent className="max-w-[425px] transition-all duration-500 ease-out">
          <DialogHeader className="gap-2">
            <DialogTitle>상태 메시지 설정</DialogTitle>
            <div className="flex w-full flex-row items-center gap-2  rounded-xl border border-gray-400 p-2 shadow-lg">
              <form
                className="flex w-full flex-row items-center gap-2"
                ref={formRef}
                onSubmit={async (e) => submitHandler(e)}
              >
                <input
                  ref={inputRef}
                  className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
                  placeholder="상태 메시지를 입력해주세요"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </form>
              <p
                className={`text-l text-darkblue ${searchValue.length > 15 ? 'text-red-500' : 'text-gray-400'}`}
              >
                {searchValue.length}/15
              </p>
              {searchValue && (
                <XBtn
                  onClick={() => {
                    formRef.current?.reset();
                    setSearchValue('');
                  }}
                />
              )}
            </div>
            <p className="text-l  text-darkblue">{resultMessage}</p>
          </DialogHeader>
        </DialogContent>
      ) : (
        <CustomLocationContent resultMessage={resultMessage} setResultMessage={setResultMessage} />
      )}
    </Dialog>
  );
}
