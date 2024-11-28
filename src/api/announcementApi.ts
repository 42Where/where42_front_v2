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
    try {
      return response.data.announcements;
    } catch (error) {
      console.error('Error: ', error);
      return [];
    }
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
