import { AnnouncementBtn } from '@/components/buttons';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { announcementApi } from '@/api/announcementApi';
import { Announcement } from '@/types/Announcement';

// example은 어드민 페이지에서 신규 공지사항을 테스트하는 용도로 사용됩니다.
export default function Announcements({ example }: { example?: Announcement }) {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const currDate = new Date();
  useEffect(() => {
    if (example) {
      setAnnouncements([example]);
      return;
    }
    announcementApi.getAnnouncement({ page: 0, size: 30 }).then((res) => {
      setAnnouncements(res);
    });
  }, [example]);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger>
        <AnnouncementBtn isOpen={isOpen} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-60 w-48 overflow-auto break-all rounded-none p-0 md:max-h-80 md:w-64"
        align="end"
      >
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
