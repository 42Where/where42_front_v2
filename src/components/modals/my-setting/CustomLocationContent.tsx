import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDeleteLocation, useUpdateLocation, useMyInfo } from '@/hooks';
import LocationCascader from './LocationCascader';

export default function CustomLocationContent({
  resultMessage,
  setResultMessage,
}: {
  resultMessage: string;
  setResultMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const user = useMyInfo().data;
  const [locationValue, setLocationValue] = useState<string>('');
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();

  function setClickHandler() {
    if (!user) return;
    setResultMessage('설정 되었습니다.');
    updateLocation.mutate(locationValue);
  }
  function initClickHandler() {
    if (!user) return;
    setResultMessage('삭제 되었습니다.');
    deleteLocation.mutate();
  }

  if (!user) return null;
  if (!user.inCluster) {
    return (
      <DialogContent
        className="flex min-h-[300px] max-w-[550px] flex-col items-center
       justify-center transition-all duration-500 ease-out"
      >
        <p className="text-md text-center md:text-xl">
          수동 위치 설정은 클러스터 안에 있을 때만 가능해요 😢
        </p>
      </DialogContent>
    );
  }
  return (
    <DialogContent className="min-h-[400px] max-w-[550px] transition-all duration-500 ease-out">
      <DialogHeader className="gap-2">
        <DialogTitle>수동 자리 설정</DialogTitle>
      </DialogHeader>
      <p className="text-l  text-darkblue">{resultMessage}</p>
      <ScrollArea className="h-[350px] w-full">
        <LocationCascader setLocationValue={setLocationValue} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-row items-center justify-between">
        <div />
        <div className="flex flex-row gap-2">
          <Button className="bg-darkblue" onClick={() => setClickHandler()}>
            설정
          </Button>
          <Button onClick={() => initClickHandler()}>자리 초기화</Button>
          <DialogClose asChild>
            <Button variant="destructive">취소</Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
