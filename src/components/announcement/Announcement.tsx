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

// 드롭다운에서는 최근 3개월까지 보여줄까 싶음
export default function Announcements() {
  // 리렌더링 시 다시 API 받아오지 않도록 메모이제이션 할까 싶다
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  useEffect(() => {
    announcementApi.getAnnouncement({ page: 0, size: 10 }).then((res) => {
      setAnnouncements(res);
    });
  }, []);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger>
        <AnnouncementBtn isOpen={isOpen} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-h-60 lg:max-h-80 w-48 lg:w-64 overflow-auto rounded-none p-0"
        align="end"
      >
        {
          announcements.length && announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.announcementId}
              announcementType={announcement.title}
              title={announcement.content}
              date={announcement.createAt}
            />
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
