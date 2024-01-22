import Group from "@/types/Group";
import User from "@/types/User";
import axios from "@/utils/Axios";

const groupApi = {
  /**
   * 그룹id로 그룹원을 조회합니다.
   * @param groupId
   * @returns User[]
   */
  getGroupMembers: async ({
    groupId,
  }: {
    groupId: number;
  }): Promise<User[]> => {
    const response = await axios.get("/v3/group/groupmember", {
      params: { groupId },
    });
    return response.data;
  },
  /**
   * 그룹id와 유저 id리스트로 그룹원을 삭제합니다. - 기본그룹에서도 사용 가능
   * @param groupId: number
   * @param userIds: number[]
   * @returns User
   */
  removeMembersFromGroup: async ({
    groupId,
    members,
  }: {
    groupId: number;
    members: number[];
  }): Promise<number[]> => {
    const response = await axios.put("/v3/group/groupmember", {
      groupId,
      members,
    });
    return response.data;
  },
  /**
   * 기본그룹id로 기본그룹에 사용자를 추가합니다.
   * 인자 왜필요한지 백엔드에 문의 필요
   * @param groupId
   */
  addMemberAtDefaultGroup: async ({
    defaultGroupId,
    intraId,
  }: {
    defaultGroupId: number;
    defaultGroupName: string;
    intraId: number;
  }): Promise<number> => {
    const response = await axios.post("/v3/group/groupmember", {
      groupId: defaultGroupId,
      intraId,
    });
    return response.status;
  },
  /**
   * 그룹id와 유저id로 기본 그룹이 아닌 그룹에 사용자를 추가합니다.
   * @param groupId
   * @param intraId
   */
  addMemberAtGroup: async ({
    groupId,
    intraId,
  }: {
    groupId: number;
    intraId: number;
  }): Promise<number> => {
    const response = await axios.post("/v3/group/groupmember/members", {
      groupId,
      intraId,
    });
    return response.status;
  },
  /**
   * 자기 자신의 그룹을 조회합니다.
   * @returns Group[]
   * 임시로 any를 사용하였지만 백엔드에서 타입 정의 후 수정 필요
   */
  getAllGroups: async (): Promise<Group[]> => {
    const response = await axios.get("/v3/group");
    return response.data;
  },
  /**
   * groupName으로 그룹을 생성합니다.
   * @param groupName
   * @returns ({ groupId: number; groupName: string })
   */
  createGroup: async ({
    groupName,
  }: {
    groupName: string;
  }): Promise<{ groupId: number; groupName: string }> => {
    const response = await axios.post("/v3/group", {
      params: { groupName },
    });
    return response.data;
  },
  /**
   * groupId와 groupName으로 그룹 이름을 변경합니다.
   * @param groupId
   * @param groupName
   * @returns ({ groupId: number; groupName: string })
   */
  renameGroup: async ({
    groupId,
    groupName,
  }: {
    groupId: number;
    groupName: string;
  }): Promise<{ groupId: number; groupName: string }> => {
    const response = await axios.post("/v3/group/name", {
      params: { groupId, groupName },
    });
    return response.data;
  },
  /**
   * groupId로 그룹을 삭제합니다.
   * @param groupId
   * @returns ({ groupId: number })
   */
  removeGroup: async ({
    groupId,
  }: {
    groupId: number;
  }): Promise<{ groupId: number }> => {
    const response = await axios.delete("/v3/group", { params: { groupId } });
    return response.data;
  },

  /**
   * 그룹id와 유저d로 특정 그룹에 사용자를 추가합니다.
   * 인자 왜필요한지 백엔드에 문의 필요
   * @param groupId
   * @param userNames
   */
  addMemberAtGroupByName: async ({
    groupId,
    userNames,
  }: {
    groupId: number;
    userNames: string[];
  }): Promise<number> => {
    const response = await axios.post("/v3/group/groupmember", {
      groupId,
      members: userNames,
    });
    return response.status;
  },
};

export default groupApi;
