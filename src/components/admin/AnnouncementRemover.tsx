import { useState, useRef, FormEvent } from 'react';
import announcementApi from '@/api/announcementApi';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AxiosError } from 'axios';

export default function AnnouncementRemover() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(0);
  const { toast } = useToast();

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    console.log(inputValue);
    if (!inputValue) return;
    setId(0);
    announcementApi
      .deleteAnnouncement({
        announcementId: inputValue as unknown as number,
      })
      .then(() => toast({ title: '삭제되었습니다.' }))
      .catch((err: AxiosError) => {
        console.error(err);
        toast({ title: '삭제에 실패했습니다.', description: String(err.response?.data) });
      });
  }

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2 pl-2">
      <form
        className="flex w-full flex-col items-end justify-center gap-2"
        onSubmit={async (e) => submitHandler(e)}
      >
        <Input
          ref={inputRef}
          type="number"
          className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500 dark:text-gray-700"
          placeholder="삭제할 공지 ID를 입력하세요"
          onChange={(e) => setId(Number(e.target.value))}
        />
        <Button type="submit" variant="destructive" disabled={id === 0}>
          삭제하기
        </Button>
      </form>
    </div>
  );
}
