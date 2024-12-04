import { useMemo } from 'react';

export default function SurveyLink({
  announcementType,
  date,
  currDate,
}: {
  announcementType: string;
  date: string;
  currDate: Date;
}) {
  const renderedDate = useMemo(() => {
    const diffTime = currDate.getTime() - new Date(date).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 7 ? `${diffDays}일 전` : date;
  }, [date, currDate]);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 border-b p-1 text-[10px] lg:gap-2 lg:text-sm">
      <span className="flex w-full flex-row items-center justify-between text-[10px] text-baseblue lg:text-xs">
        <p>{announcementType}</p>
        <p>{renderedDate}</p>
      </span>
      <p className="whitespace-pre-wrap">
        유저 여러분 안녕하세요! 😁
        <br />
        어디있니 팀에서 새롭게 개발될 시각화 페이지에 추가할 기능을 제시받습니다.
        <br />
        설문은 12월 9일까지 진행될 예정입니다.
      </p>
      <a
        href="https://docs.google.com/forms/d/1a5S5JxdLjx9qQSucrkZ-wVTDrUcJWhiAPjkAmbmcF1U/edit"
        className="decoration-[#FFB5B5] hover:underline"
      >
        🏃 설문조사 참여하기 🏃
      </a>
    </div>
  );
}
