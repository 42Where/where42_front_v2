import { create } from "zustand";
import User from "@/types/User";
import Group from "@/types/Group";

type GroupStore = {
  groups: Group[];
  userCmp: (a: User, b: User) => number;
  groupCmp: (a: Group, b: Group) => number;
  setGroups: (groups: Group[]) => void;
  setGroupName: (groupId: number, groupName: string) => void;
  addGroup: (group: Group) => void;
  removeGroup: (groupId: number) => void;
  setEditGroup: (groupId: number) => void;
  openGroup: (groupId: number) => void;
  closeGroup: (groupId: number) => void;
  finishEditGroup: () => void;
  setUserCmp: (userCmp: (a: User, b: User) => number) => void;
  setGroupCmp: (groupCmp: (a: Group, b: Group) => number) => void;
  addUserToGroup: (userList: User[], groupIdList: number[]) => void;
  removeUserFromGroup: (userIds: number[], groupIds: number[]) => void;
  removeUserFromAllGroup: (userIds: number[]) => void;
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
    return a.intraName.localeCompare(b.intraName);
  },
  groupCmp: (a, b) => {
    return b.groupId - a.groupId;
  },

  setGroups: (groups) =>
    set((state) => ({ groups: groups.sort(state.groupCmp) })),
  setGroupName: (groupId, groupName) =>
    set((state) => ({
      groups: state.groups
        .map((group) =>
          group.groupId === groupId ? { ...group, groupName } : group
        )
        .sort(state.groupCmp),
    })),
  addGroup: (group) =>
    set((state) => ({ groups: [...state.groups, group].sort(state.groupCmp) })),
  removeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.groupId !== groupId),
    })),
  setEditGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.groupId === groupId
          ? { ...group, isInEdit: true, isFolded: false }
          : { ...group, isFolded: true }
      ),
    })),
  finishEditGroup: () =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.isInEdit ? { ...group, isInEdit: false } : group
      ),
    })),
  openGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.groupId === groupId ? { ...group, isFolded: false } : group
      ),
    })),
  closeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.groupId === groupId ? { ...group, isFolded: true } : group
      ),
    })),
  setUserCmp: (userCmp) => set({ userCmp: userCmp }),
  setGroupCmp: (groupCmp) => set({ groupCmp: groupCmp }),
  addUserToGroup: (userList, groupIdList) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        groupIdList.includes(group.groupId)
          ? {
              ...group,
              users: [...group.members, ...userList].sort(state.userCmp),
            }
          : group
      ),
    })),
  removeUserFromGroup: (userIds, groupIds) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        groupIds.includes(group.groupId)
          ? {
              ...group,
              users: group.members.filter(
                (user) => !userIds.includes(user.intraId)
              ),
            }
          : group
      ),
    })),
  removeUserFromAllGroup: (userIds) =>
    set((state) => ({
      groups: state.groups.map((group) => ({
        ...group,
        users: group.members.filter((user) => !userIds.includes(user.intraId)),
      })),
    })),
}));

export default useGroupStore;
