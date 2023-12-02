import { create } from "zustand";
import User from "@/types/User";
import Group from "@/types/Group";

type GroupStore = {
  groups: Group[];
  userCmp: (a: User, b: User) => number;
  groupCmp: (a: Group, b: Group) => number;
  setGroups: (groups: Group[]) => void;
  setGroupName: (groupId: number, name: string) => void;
  addGroup: (group: Group) => void;
  removeGroup: (groupId: number) => void;
  setEditGroup: (groupId: number) => void;
  finishEditGroup: () => void;
  setUserCmp: (userCmp: (a: User, b: User) => number) => void;
  setGroupCmp: (groupCmp: (a: Group, b: Group) => number) => void;
  addUserToGroup: (user: User, groupId: number) => void;
  removeUserFromGroup: (userId: number, groupId: number) => void;
  removeUserFromAllGroup: (userId: number) => void;
};

const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  userCmp: (a, b) => {
    if (a.location && b.location) {
      return a.location.localeCompare(b.location);
    } else if (a.location) {
      return 1;
    } else if (b.location) {
      return -1;
    }
    return a.login.localeCompare(b.login);
  },
  groupCmp: (a, b) => {
    if (a.name === "친구") {
      return 1;
    } else if (b.name === "친구") {
      return -1;
    }
    return b.id - a.id;
  },
  setGroups: (groups) =>
    set((state) => ({ groups: groups.sort(state.groupCmp) })),
  setGroupName: (groupId, name) =>
    set((state) => ({
      groups: state.groups
        .map((group) => {
          if (group.id === groupId) {
            return (group = { ...group, name });
          } else {
            return group;
          }
        })
        .sort(state.groupCmp),
    })),
  addGroup: (group) =>
    set((state) => ({ groups: [...state.groups, group].sort(state.groupCmp) })),
  removeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== groupId),
    })),
  setEditGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return (group = { ...group, isInEdit: true });
        } else if (group.isInEdit) {
          return (group = { ...group, isInEdit: false });
        } else {
          return group;
        }
      }),
    })),
  finishEditGroup: () =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.isInEdit) {
          return { ...group, isInEdit: false };
        } else {
          return group;
        }
      }),
    })),
  setUserCmp: (userCmp) => set({ userCmp: userCmp }),
  setGroupCmp: (groupCmp) => set({ groupCmp: groupCmp }),
  addUserToGroup: (user, groupId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            users: [...group.users, user].sort(state.userCmp),
          };
        } else {
          return group;
        }
      }),
    })),
  removeUserFromGroup: (userId, groupId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            users: group.users.filter((user) => user.id !== userId),
          };
        } else {
          return group;
        }
      }),
    })),
  removeUserFromAllGroup: (userId) =>
    set((state) => ({
      groups: state.groups.map((group) => {
        return {
          ...group,
          users: group.users.filter((user) => user.id !== userId),
        };
      }),
    })),
}));

export default useGroupStore;
