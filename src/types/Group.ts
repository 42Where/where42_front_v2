import User from "./User";

type Group = {
  name: string;
  id: number;
  users: User[];
  isInEdit: boolean;
};

export default Group;
