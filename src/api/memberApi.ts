import { axios } from '@/lib/Axios';
import {
  GetMemberInfo,
  UpdateComment,
  DeleteComment,
  DeleteAccount,
  SearchMember,
} from '@/types/api/member';

const getMemberInfo: GetMemberInfo = async ({ intraId }) => {
  const response = await axios.get('/v3/member', {
    params: { intraId },
  });
  return response.data;
};

const updateComment: UpdateComment = async ({ comment }) => {
  await axios.post('/v3/member/comment', {
    comment,
  });
};

const deleteComment: DeleteComment = async () => {
  await axios.delete('/v3/member/comment');
};

const deleteAccount: DeleteAccount = async () => {
  await axios.delete('/v3/member');
};

const searchMember: SearchMember = async ({ keyWord }) => {
  const response = await axios.get('/v3/search/new', {
    params: { keyWord },
  });
  return response.data;
};

export const memberApi = {
  getMemberInfo,
  updateComment,
  deleteComment,
  deleteAccount,
  searchMember,
};
