import { axios } from '@/lib/Axios';
import { Announcement } from '@/types/Announcement';
// TODO: 비즈니스 레이어에서 가능한 모든 에러를 처리해아할듯. (data가 없을 때 등)
const announcementApi = {
  getAnnouncement: async ({
    page = 0,
    size = 5,
  }: {
    page: number;
    size: number;
  }): Promise<Announcement[]> => {
    const response = await axios.get('/v3/announcement', {
      params: {
        page,
        size,
      },
    });
    return response.data.announcements;
  },
  postAnnouncement: async ({
    title,
    comment,
  }: {
    title: string;
    comment: string;
  }): Promise<number> => {
    const response = await axios.post('/v3/announcement', {
      title,
      comment,
    });
    return response.status;
  },
  deleteAnnouncement: async ({
    announcementId,
  }: {
    announcementId: number;
  }): Promise<void> => {
    await axios.delete('/v3/announcement', { data: { announcementId } });
  },
};

export default announcementApi;
