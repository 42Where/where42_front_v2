import { Announcement } from '@/types/Announcement';

export type GetAnnouncement = (params: { page?: number; size?: number }) => Promise<Announcement[]>;
export type PostAnnouncement = (params: { title: string; content: string }) => Promise<number>;
export type DeleteAnnouncement = (params: { announcementId: number }) => Promise<void>;
