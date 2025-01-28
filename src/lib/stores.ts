import { create } from 'zustand';
import { User } from '@/types/User';
import Group from '@/types/Group';
import { Clusters } from '@/types/Cluster';
import { getClusters } from '@/lib/clusterUtils';

type GroupsStore = {
  groups: Group[];
  setGroups: (val: Group[]) => void;
};

const useGroupsStore = create<GroupsStore>((set) => ({
  groups: [],
  setGroups: (val: Group[]) => set(() => ({ groups: val })),
}));

type AddedMembersStore = {
  addedMembers: number[];
  setAddedMembers: (val: number[]) => void;
};

const useAddedMembersStore = create<AddedMembersStore>((set) => ({
  addedMembers: [],
  setAddedMembers: (val: number[]) => set(() => ({ addedMembers: val })),
}));

type CheckedStore = {
  checked: boolean;
  setChecked: (val: boolean) => void;
};

const useCheckedStore = create<CheckedStore>((set) => ({
  checked: false,
  setChecked: (val: boolean) => set(() => ({ checked: val })),
}));

type CheckedUsersStore = {
  checkedUsers: User[];
  setCheckedUsers: (val: User[]) => void;
};

const useCheckedUsersStore = create<CheckedUsersStore>((set) => ({
  checkedUsers: [],
  setCheckedUsers: (val: User[]) => set(() => ({ checkedUsers: val })),
}));

type ClusterStore = {
  clusters: Clusters;
  setClusters: (val: Clusters) => void;
};

const useClusterStore = create<ClusterStore>((set) => ({
  clusters: getClusters(),
  setClusters: (val: Clusters) => set(() => ({ clusters: val })),
}));

export {
  useGroupsStore,
  useAddedMembersStore,
  useCheckedStore,
  useCheckedUsersStore,
  useClusterStore,
};
