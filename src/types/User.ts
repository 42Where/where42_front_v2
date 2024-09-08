type User = {
  agree: boolean;
  comment?: string;
  defaultGroupId: number;
  grade?: string;
  image?: string;
  inCluster: boolean;
  intraId: number;
  intraName: string;
  location?: string;
};

type SearchedUser = User & {
  friend: boolean;
  inOrOut: boolean;
};

export type { User, SearchedUser };
