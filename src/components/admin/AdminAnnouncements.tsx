import { Announcement } from '@/types/Announcement';
import { AdminAnnouncementItem } from './AdminAnnouncementItem';

export function AdminAnnouncements({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <div className="h-vh flex h-[70vh] w-full flex-col overflow-auto pr-1">
        {announcements.length === 0
          ? '공지사항이 없습니다.'
          : announcements.map((announcement) => (
              <AdminAnnouncementItem
                key={announcement.announcementId}
                announcement={announcement}
              />
            ))}
      </div>
    </div>
  );
}
