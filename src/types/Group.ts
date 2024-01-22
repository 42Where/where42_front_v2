import User from "./User";

type Group = {
  groupName: string;
  groupId: number;
  members: User[];
  isInEdit: boolean;
  isFolded: boolean;
};

export default Group;
