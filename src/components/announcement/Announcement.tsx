import AnnouncementBtn from '@/components/buttons/AnnouncementBtn';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import announcementApi from '@/api/announcementApi';
import { Announcement } from '@/types/Announcement';
import SurveyLink from '@/components/announcement/SurveyLink';

export default function Announcements() {
  // 리렌더링 시 다시 API 받아오지 않도록 메모이제이션 할까 싶다
  // TODO: 비어있을 때 처리
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const currDate = new Date();
  useEffect(() => {
    announcementApi.getAnnouncement({ page: 0, size: 30 }).then((res) => {
      setAnnouncements(res);
    });
  }, []);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger>
        <AnnouncementBtn isOpen={isOpen} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-60 w-48 overflow-auto rounded-none p-0 md:max-h-80 md:w-64"
        align="end"
      >
        <SurveyLink announcementType="설문조사" date="2024-12-4" currDate={currDate} />
        {announcements.length === 0
          ? '공지사항이 없습니다.'
          : announcements.map((announcement) => (
              <AnnouncementItem
                key={announcement.announcementId}
                announcementType={announcement.title}
                title={announcement.content}
                date={announcement.createAt}
                currDate={currDate}
              />
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
