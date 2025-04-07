import { axios } from '@/lib/Axios';
import { GetAnnouncement, PostAnnouncement, DeleteAnnouncement } from '@/types/api/announcement';

const getAnnouncement: GetAnnouncement = async ({ page = 0, size = 5 }) => {
  const response = await axios.get('/v3/announcement', { params: { page, size } });
  return response.data.announcements;
};

const postAnnouncement: PostAnnouncement = async ({ title, content }) => {
  const response = await axios.post('/v3/announcement', { title, content });
  return response.status;
};

const deleteAnnouncement: DeleteAnnouncement = async ({ announcementId }) => {
  await axios.delete(`/v3/announcement/${announcementId}`);
};

export const announcementApi = {
  getAnnouncement,
  postAnnouncement,
  deleteAnnouncement,
};
