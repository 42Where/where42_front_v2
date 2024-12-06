import AdminAnnouncementItem from '@/components/admin/AdminAnnouncementItem';
import { Announcement } from '@/types/Announcement';
import Divider from '@/components/utils/Divider';

export default function AdminAnnouncements({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <div />
      <h3 className="w-full text-xl text-darkblue">전체 공지사항 조회</h3>
      <Divider />
      <div className="h-vh flex h-[70vh] flex-col overflow-auto pr-1">
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
