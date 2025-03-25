import { axios } from '@/lib/Axios';
import {
  GetGroupMembers,
  RemoveMembersFromGroup,
  AddMemberAtGroup,
  GetAllGroups,
  CreateGroup,
  RenameGroup,
  RemoveGroup,
  AddMemberAtGroupByName,
  AgreeJoin,
} from '@/types/api/group';

/**
 * 그룹id로 그룹원 조회
 * @param groupId
 * @returns User[]
 */
const getGroupMembers: GetGroupMembers = async ({ groupId }) => {
  const response = await axios.get('/v3/group/groupmember', {
    params: { groupId },
  });
  return response.data;
};
/**
 * 그룹id와 유저id 리스트로 그룹원 삭제 - 기본그룹에서도 사용 가능
 * @param groupId: number
 * @param userIds: number[]
 * @returns User
 */
const removeMembersFromGroup: RemoveMembersFromGroup = async ({ groupId, members }) => {
  const response = await axios.put('/v3/group/groupmember', {
    groupId,
    members,
  });
  return response.data;
};
/**
 * 그룹id와 유저id 리스트로 그룹에 사용자 추가
 * @param groupId
 * @param intraId
 */
const addMemberAtGroup: AddMemberAtGroup = async ({ groupId, members }) => {
  const response = await axios.post('/v3/group/groupmember/members', {
    groupId,
    members,
  });
  return response.data;
};
/**
 * 자기 자신의 그룹을 조회합니다.
 * @returns Group[]
 */
const getAllGroups: GetAllGroups = async () => {
  const response = await axios.get('/v4/group');
  return response.data;
};
/**
 * groupName으로 그룹을 생성합니다.
 * @param groupName
 * @returns ({ groupId: number; groupName: string })
 */
const createGroup: CreateGroup = async ({ groupName }) => {
  const response = await axios.post('/v3/group', {
    groupName,
  });
  return response.data;
};
/**
 * groupId와 groupName으로 그룹 이름을 변경합니다.
 * @param groupId
 * @param groupName
 * @returns ({ groupId: number; groupName: string })
 */
const renameGroup: RenameGroup = async ({ groupId, groupName }) => {
  const response = await axios.post('/v3/group/name', {
    groupId,
    groupName,
  });
  return response.data;
};
/**
 * groupId로 그룹을 삭제합니다.
 * @param groupId
 * @returns ({ groupId: number })
 */
const removeGroup: RemoveGroup = async ({ groupId }) => {
  const response = await axios.delete('/v3/group', { params: { groupId } });
  return response.data;
};
/**
 * 그룹id와 유저d로 특정 그룹에 사용자를 추가합니다.
 * @param groupId
 * @param userNames
 */
const addMemberAtGroupByName: AddMemberAtGroupByName = async ({ groupId, userNames }) => {
  const response = await axios.post('/v3/group/groupmember', {
    groupId,
    members: userNames,
  });
  return response.data;
};

const agreeJoin: AgreeJoin = async () => {
  const response = await axios.post('/v3/join');
  return response.status;
};

export const groupApi = {
  getGroupMembers,
  removeMembersFromGroup,
  addMemberAtGroup,
  getAllGroups,
  createGroup,
  renameGroup,
  removeGroup,
  addMemberAtGroupByName,
  agreeJoin,
};
