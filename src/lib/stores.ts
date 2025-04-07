import { create } from 'zustand';
import { User, Clusters } from '@/types';
import { getClusters } from '@/lib/clusterUtils';

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

export { useCheckedStore, useCheckedUsersStore, useClusterStore };
