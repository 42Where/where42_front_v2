import React from 'react';
import { X } from 'lucide-react';
import { DialogTrigger } from '@radix-ui/react-dialog';
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
import CustomLocationContent from '@/components/utils/CustomLocationContent';
import SettingBtn from '@/components/buttons/MySettingBtn';

export default function MySettingModal() {
  const [isMessage, setIsMessage] = React.useState<boolean>(false);
  const { user, setUser } = useUserStore();
  const [resultMessage, setResultMessage] = React.useState<string>('');
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState<string>(
    user?.comment || '',
  );
  if (!user) return null;

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
        <DropdownMenuTrigger>
          <SettingBtn />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" className=" min-w-50 text-darkblue">
          <DialogTrigger asChild onClick={() => setIsMessage(true)}>
            <DropdownMenuItem className="text-xl">
              상태 메시지 수정
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={() => setIsMessage(false)}>
            <DropdownMenuItem className="text-xl">
              수동 위치 설정
            </DropdownMenuItem>
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
                onSubmit={async (e) => {
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
                  if (inputValue === user?.comment) return;
                  if (inputValue === '') {
                    memberApi
                      .deleteComment()
                      .then(() => setUser({ ...user, comment: '' }))
                      .catch((error) => {
                        console.error(error);
                        setResultMessage(
                          '설정 중 오류가 발생했습니다. 다시 시도해 주세요.',
                        );
                      });
                    return;
                  }
                  memberApi
                    .updateComment({ comment: inputValue })
                    .then(() => setUser({ ...user, comment: inputValue }))
                    .catch((error) => {
                      console.error(error);
                      setResultMessage(
                        '설정 중 오류가 발생했습니다. 다시 시도해 주세요.',
                      );
                    });
                }}
              >
                <input
                  ref={inputRef}
                  className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
                  placeholder="상태 메시지를 입력해주세요"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
              </form>
              {searchValue && (
                <>
                  <p
                    className={`text-l  text-darkblue ${
                      searchValue.length > 15 ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {searchValue.length}
                    /15
                  </p>
                  <X
                    className="size-6"
                    onClick={() => {
                      formRef.current?.reset();
                      setSearchValue('');
                    }}
                  />
                </>
              )}
            </div>
            <p className="text-l  text-darkblue">{resultMessage}</p>
          </DialogHeader>
        </DialogContent>
      ) : (
        <CustomLocationContent
          resultMessage={resultMessage}
          setResultMessage={setResultMessage}
        />
      )}
    </Dialog>
  );
}
