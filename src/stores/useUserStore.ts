import { create } from "zustand";

import User from "@/types/User";

export type UserStore = {
  user?: Pick<
    User,
    | "intraId"
    | "intraName"
    | "image"
    | "location"
    | "comment"
    | "agree"
    | "inCluster"
    | "defaultGroupId"
  >;
  attendanceOnly: boolean;
  token?: string;
  refreshToken?: string;
  /**
   * 일단 넣어두긴 했는데 당장은 사용하지 않음
   */
  darkMode?: boolean;
  setUser: (user: User) => void;
  setLocation: (location: string) => void;
  setComment: (comment: string) => void;
  setToken: (token: string) => void;
  setAttendanceOnly: (attendanceOnly: boolean) => void;
};

const useUserStore = create<UserStore>((set) => ({
  attendanceOnly: false,
  setUser: (user) => set((state) => ({ ...state, user: user })),
  setLocation: (location) =>
    set((state) => ({
      ...state,
      user: state.user ? { ...state.user, location } : state.user,
    })),
  setComment: (comment) => {
    set((state) => ({
      ...state,
      user: state.user ? { ...state.user, comment } : state.user,
    }));
  },
  setToken: (token) => {
    set((state) => ({
      ...state,
      token,
    }));
  },
  setAttendanceOnly: (attendanceOnly) =>
    set((state) => ({ ...state, attendanceOnly })),
}));

export default useUserStore;
