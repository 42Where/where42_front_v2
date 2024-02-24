import Group from "@/types/Group";
import User from "@/types/User";
import axios from "@/utils/Axios";

const authApi = {
  getMyInfo: async (): Promise<User> => {
    const response = await axios.get("/v3/member");
    return response.data;
  },
};

export default authApi;
