import User from "@/types/User";
import { Size } from "@/types/enums";
import { create } from "zustand";

export type MyData = User & {
  attendanceOnly: boolean;
  darkMode?: boolean;
  token: string;
  refreshToken: string;
  size: Size;
};

type MyDataStore = {
  myData?: MyData;
  setMyData: (myData?: MyData) => void;
};

const useMyDataStore = create<MyDataStore>((set) => ({
  myData: undefined,
  setMyData: (myData) => set({ myData: myData }),
}));

export default useMyDataStore;
