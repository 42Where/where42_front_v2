import { useRef, useState, FormEvent, useEffect } from 'react';
import announcementApi from '@/api/announcementApi';
import { Textarea } from '@/components/ui/textarea';
import { Divider } from '@/components/utils/Divider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AnnouncementType, Announcement } from '@/types/Announcement';
import Announcements from '@/components/announcement/Announcements';
import { AnnouncementMenu } from './AnnouncementMenu';

export function AnnouncementWriter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, settextValue] = useState<string>('');
  const [type, setType] = useState<AnnouncementType>('기능 추가');
  const [example, setExample] = useState<Announcement>({
    announcementId: 42,
    title: type,
    content: textValue,
    authorName: 'rip van wrinkle',
    createAt: '',
    updateAt: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const LIMIT = 100;
  const { toast } = useToast();

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = textareaRef.current?.value;
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
  }

  useEffect(() => {
    setExample((prev) => ({ ...prev, content: textValue }));
  }, [textValue, type]);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
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
            className="text-black"
          />
          <div className="flex w-full flex-row items-start justify-between">
            <p className={`${textValue.length > LIMIT && 'text-red-500'} text-sm`}>
              {textValue.length}/{LIMIT}
            </p>
            <Button
              className="rounded-lg border-2 border-darkblue bg-darkblue"
              disabled={textValue.length === 0 || textValue.length / LIMIT > 1}
            >
              추가하기
            </Button>
          </div>
        </form>
      </div>
      <Divider />
      <h3>미리보기</h3>
      <Announcements example={example} />
    </div>
  );
}
