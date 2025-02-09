import { axios } from '@/lib/Axios';
import { Announcement } from '@/types/Announcement';

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
    content,
  }: {
    title: string;
    content: string;
  }): Promise<number> => {
    const response = await axios.post('/v3/announcement', {
      title,
      content,
    });
    return response.status;
  },
  deleteAnnouncement: async ({ announcementId }: { announcementId: number }): Promise<void> => {
    await axios.delete(`/v3/announcement/${announcementId}`);
  },
};

export default announcementApi;
