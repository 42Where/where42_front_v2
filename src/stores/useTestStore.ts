import { create } from "zustand";

interface TestStore {
  count: number;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
  reset: () => void;
}

const useTestStore = create<TestStore>((set) => ({
  count: 0,
  increment: (by) =>
    set((state) => {
      if (by) {
        return { count: state.count + by };
      }
      return { count: state.count + 1 };
    }),
  decrement: (by) =>
    set((state) => {
      if (by) {
        return { count: state.count - by };
      }
      return { count: state.count - 1 };
    }),
  reset: () => set({ count: 0 }),
}));

export default useTestStore;
