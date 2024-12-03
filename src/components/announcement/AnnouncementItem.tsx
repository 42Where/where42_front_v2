import { useMemo } from 'react';

export default function AnnouncementItem({
  announcementType,
  title,
  date,
  currDate,
  isLast,
}: {
  announcementType: string;
  title: string;
  date: string;
  currDate: Date;
  isLast?: boolean;
}) {
  const renderedDate = useMemo(() => {
    const diffTime = currDate.getTime() - new Date(date).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 7 ? `${diffDays}일 전` : date;
  }, [date, currDate]);
  return (
    <div
      className={`flex w-full flex-col items-start justify-center text-xs lg:text-sm ${!isLast && 'border-b'} gap-1 p-1 lg:gap-2`}
    >
      <span className="flex w-full flex-row items-center justify-between text-[10px] text-baseblue lg:text-xs">
        <p>{announcementType}</p>
        <p>{renderedDate}</p>
      </span>
      <p>{title}</p>
    </div>
  );
}
