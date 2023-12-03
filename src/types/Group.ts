import User from "./User";

type Group = {
  name: string;
  id: number;
  users: User[];
  isInEdit: boolean;
  isFolded: boolean;
};

export default Group;
