import Group from "@/types/Group";
import User from "@/types/User";
import axios from "@/utils/Axios";

const memberApi = {
  getMemberInfo: async ({ intraId }: { intraId: number }): Promise<User> => {
    const response = await axios.get("/v3/member", {
      params: { intraId },
    });
    return response.data;
  },
  updateComment: async ({ comment }: { comment: string }): Promise<void> => {
    const response = await axios.put("/v3/member/comment", {
      comment,
    });
  },
  deleteAccount: async (): Promise<void> => {
    const response = await axios.delete("/v3/member");
  },
  searchMember: async ({ keyWord }: { keyWord: string }): Promise<User[]> => {
    const response = await axios.get("/v3/search", {
      params: { keyWord },
    });
    return response.data;
  },
};

export default memberApi;
