export type AnnouncementType = '기능 추가' | '버그 수정' | 'UI/UX 개선' | '공지사항';

export type Announcement = {
  announcementId: number;
  title: AnnouncementType;
  content: string;
  authorName: string;
  createAt: string;
  updateAt: string;
};
