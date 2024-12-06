import { Announcement } from '@/types/Announcement';

export default function AdminAnnouncementItem({ announcement }: { announcement: Announcement }) {
  const { title, content, authorName, createAt, updateAt, announcementId } = announcement;

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 border p-1 text-[10px] lg:gap-2 lg:text-sm">
      <span className="flex w-full flex-row items-center justify-between text-[10px] text-baseblue lg:text-xs">
        <p>{title}</p>
        <p>
          생성 날짜: {createAt} by {authorName}
        </p>
      </span>
      <p className="whitespace-pre-wrap text-black">{content}</p>
      <p>ID: {announcementId}</p>
      {updateAt !== createAt && <p>수정 날짜: {updateAt}</p>}
    </div>
  );
}
