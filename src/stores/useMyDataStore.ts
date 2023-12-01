import User from "@/types/User";
import { Size } from "@/types/enums";
import { create } from "zustand";

export type MyData = Pick<
  User,
  "id" | "login" | "profileImgSrc" | "location" | "comment"
> & {
  attendanceOnly: boolean;
  token?: string;
  refreshToken?: string;
  /**
   * 일단 넣어두긴 했는데 당장은 사용하지 않음
   */
  size: Size;
  /**
   * 일단 넣어두긴 했는데 당장은 사용하지 않음
   */
  darkMode?: boolean;
};

const initialMyData: MyData = {
  id: 0,
  login: "",
  profileImgSrc: "",
  attendanceOnly: false,
  size: "medium",
};

type MyDataStore = {
  myData: MyData;
  setMyData: (myData: MyData) => void;
  setMyLocation: (location: string) => void;
  setComment: (comment: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  setSize: (size: Size) => void;
  setAttendanceOnly: (attendanceOnly: boolean) => void;
};

const useMyDataStore = create<MyDataStore>((set) => ({
  myData: initialMyData,
  setMyData: (myData) => set({ myData: myData }),
  setMyLocation: (location) =>
    set((state) => ({
      myData: { ...state.myData, location },
    })),
  setComment: (comment) =>
    set((state) => ({
      myData: { ...state.myData, comment },
    })),
  setTokens: (token, refreshToken) =>
    set((state) => ({
      myData: { ...state.myData, token, refreshToken },
    })),
  setSize: (size) => set((state) => ({ myData: { ...state.myData, size } })),
  setAttendanceOnly: (attendanceOnly) =>
    set((state) => ({ myData: { ...state.myData, attendanceOnly } })),
}));

export default useMyDataStore;
