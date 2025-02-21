import { User, SearchedUser } from '@/types/User';
import { axios } from '@/lib/Axios';

const memberApi = {
  getMemberInfo: async ({ intraId }: { intraId: number }): Promise<User> => {
    const response = await axios.get('/v3/member', {
      params: { intraId },
    });
    return response.data;
  },
  updateComment: async ({ comment }: { comment: string }): Promise<void> => {
    await axios.post('/v3/member/comment', {
      comment,
    });
  },
  deleteComment: async (): Promise<void> => {
    await axios.delete('/v3/member/comment');
  },
  deleteAccount: async (): Promise<void> => {
    await axios.delete('/v3/member');
  },
  searchMember: async ({ keyWord }: { keyWord: string }): Promise<SearchedUser[]> => {
    const response = await axios.get('/v3/search/new', {
      params: { keyWord },
    });
    return response.data;
  },
};

export default memberApi;
