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
import LocationCascader from '../LocationCascader';
import { DialogClose } from '@/components/ui/dialog';

export default function ManualSeatModal() {
  const { user, setUser } = useUserStore();
  const [resultMessage, setResultMessage] = React.useState<string>('');
  const [seatValue, setSeatValue] = React.useState<string>('');
  if (!user) return null;
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setResultMessage('');
          }, 100);
        } else {
          setResultMessage('');
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
      <DialogContent className='transition-all ease-out duration-500 max-w-[550px] min-h-[300px]'>
        <DialogHeader className='gap-2'>
          <DialogTitle>수동 자리 설정</DialogTitle>
          <p className='text-l font-gsansMd text-[#132743]'>{resultMessage}</p>
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
    </Dialog>
  );
}
