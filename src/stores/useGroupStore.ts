import { create } from "zustand";
import Group from "@/types/Group";

type GroupStore = {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  removeGroup: (groupId: number) => void;
  setEditGroup: (groupId: number) => void;
  finishEditGroup: () => void;
};

const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups: groups }),
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
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
}));

export default useGroupStore;
