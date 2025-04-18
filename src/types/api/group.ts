import { Group, User } from '@/types';

type GetGroupMembers = (params: { groupId: number }) => Promise<User[]>;
type RemoveMembersFromGroup = (params: { groupId: number; members: number[] }) => Promise<number[]>;
type AddMemberAtGroup = (params: { groupId: number; members: number[] }) => Promise<number>;
type GetAllGroupsResponse = {
  defaultGroup: Group;
  groups: Group[];
};
type GetAllGroups = () => Promise<GetAllGroupsResponse>;
type CreateGroupResponse = { groupId: number; groupName: string };
type CreateGroup = (params: { groupName: string }) => Promise<CreateGroupResponse>;
type RenameGroup = (params: { groupId: number; groupName: string }) => Promise<number>;
type RemoveGroup = (params: { groupId: number }) => Promise<number>;
type AddMemberAtGroupByName = (params: { groupId: number; userNames: string[] }) => Promise<number>;
type AgreeJoin = () => Promise<number>;

export type {
  GetGroupMembers,
  RemoveMembersFromGroup,
  AddMemberAtGroup,
  GetAllGroupsResponse,
  GetAllGroups,
  CreateGroup,
  RenameGroup,
  RemoveGroup,
  AddMemberAtGroupByName,
  AgreeJoin,
};
