import { Textarea } from '@/components/ui/textarea';
import Divider from '@/components/utils/Divider';
import { useRef, useState, FormEvent } from 'react';
import announcementApi from '@/api/announcementApi';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AnnouncementMenu from '@/components/admin/AnnouncementMenu';
import { AnnouncementType } from '@/types/Announcement';

export default function AnnouncementWriter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, settextValue] = useState<string>('');
  const [type, setType] = useState<AnnouncementType>('기능 추가');
  const formRef = useRef<HTMLFormElement>(null);
  const LIMIT = 100;
  const { toast } = useToast();

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = textareaRef.current?.value;
    console.log(inputValue);
    if (!inputValue) return;
    formRef.current?.reset();
    settextValue('');
    announcementApi
      .postAnnouncement({
        title: type,
        content: inputValue,
      })
      .then(() => toast({ title: '추가되었습니다.' }))
      .catch((err) => console.error(err));
    // setResultMessage('설정 되었습니다.');
    // if (inputValue === user?.comment || !user) return;
  }

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <div />
      <h3 className="w-full border-l-2 border-darkblue pl-2 text-xl text-darkblue">
        전체 공지사항 조회
      </h3>
      <Divider />
      <div className="flex w-full flex-col items-start gap-2 pl-2">
        <AnnouncementMenu type={type} setType={setType} />
        <form
          className="flex w-full flex-col items-center gap-2"
          onSubmit={async (e) => submitHandler(e)}
        >
          <Textarea
            placeholder="추가할 공지사항을 입력하세요"
            ref={textareaRef}
            onChange={(e) => settextValue(e.target.value)}
            value={textValue}
          />
          <div className="flex w-full flex-row items-start justify-between">
            <p className={`${textValue.length > LIMIT && 'text-red-500'} text-sm`}>
              {textValue.length}/{LIMIT}
            </p>
            <Button
              className="rounded-lg border-2 border-darkblue bg-darkblue text-lg"
              disabled={textValue.length === 0 || textValue.length / LIMIT > 1}
            >
              추가
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
