import { Group, User } from '@/types';

type GetGroupMembers = (params: { groupId: number }) => Promise<User[]>;
type RemoveMembersFromGroup = (params: { groupId: number; members: number[] }) => Promise<number[]>;
type AddMemberAtGroup = (params: { groupId: number; members: number[] }) => Promise<number>;
type GetAllGroups = () => Promise<Group[]>;
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
  GetAllGroups,
  CreateGroup,
  RenameGroup,
  RemoveGroup,
  AddMemberAtGroupByName,
  AgreeJoin,
};
