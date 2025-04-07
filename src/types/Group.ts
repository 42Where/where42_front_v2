import { User } from './User';

export type Group = {
  groupName: string;
  groupId: number;
  members: User[];
  isInEdit: boolean;
  isFolded: boolean;
};
