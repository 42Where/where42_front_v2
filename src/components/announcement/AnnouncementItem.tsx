export default function AnnouncementItem({
  announcementType,
  date,
  title,
  isLast,
}: {
  announcementType: string;
  date: string;
  title: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col items-start justify-center text-xs lg:text-sm ${!isLast && 'border-b'} gap-1 lg:gap-2 p-1`}
    >
      <span className="text-baseblue flex w-full flex-row items-center justify-between text-[10px] lg:text-xs">
        <p>{announcementType}</p>
        <p>{date}</p>
      </span>
      <p>{title}</p>
    </div>
  );
}
