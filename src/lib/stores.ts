import { create } from 'zustand';
import { User } from '@/types/User';
import Group from '@/types/Group';

type UserStore = {
  user: User | null;
  setUser: (val: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (val: User | null) => set(() => ({ user: val })),
}));

type GroupsStore = {
  groups: Group[];
  setGroups: (val: Group[]) => void;
};

const useGroupsStore = create<GroupsStore>((set) => ({
  groups: [],
  setGroups: (val: Group[] | null) => set(() => ({ groups: val || [] })),
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

export {
  useUserStore,
  useGroupsStore,
  useAddedMembersStore,
  useCheckedStore,
  useCheckedUsersStore,
};
