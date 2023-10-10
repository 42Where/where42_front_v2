import { create } from "zustand";

import { Size } from "@/types/enums";

export type DropdownCellArg = {
  text: string;
  isDanger?: boolean;
  onClick: React.MouseEventHandler;
};

type DropdownStore = {
  isOpen: boolean;
  isDisable: boolean;
  cellArgs: DropdownCellArg[];
  position: {
    top: number;
    left: number;
  };
  size: Size;
  setIsOpen: (isOpen: boolean) => void;
  setIsDisable: (isDisable: boolean) => void;
  setCellArgs: (callArgs: DropdownCellArg[]) => void;
  setPosition: (position: { top: number; left: number }) => void;
  setSize: (size: Size) => void;
  openDropdown: (
    callArgs: DropdownCellArg[],
    position: { top: number; left: number },
    size: Size
  ) => void;
  closeDropdown: () => void;
};

// TODO: 사용할때 너무 복잡한데 커스텀훅으로 만들어서 간소화할 방법 생각 필요
const useDropdownStore = create<DropdownStore>((set) => ({
  isOpen: false,
  isDisable: false,
  cellArgs: [],
  position: {
    top: 0,
    left: 0,
  },
  size: "medium",
  setIsOpen(isOpen) {
    set({ isOpen: isOpen });
  },
  setIsDisable(isDisable) {
    set({ isDisable: isDisable });
  },
  setCellArgs(callArgs) {
    set({ cellArgs: callArgs });
  },
  setPosition(position) {
    set({ position: position });
  },
  setSize(size) {
    set({ size: size });
  },
  openDropdown(callArgs, position, size) {
    set({
      isOpen: true,
      cellArgs: callArgs,
      position: position,
      size: size,
    });
  },
  closeDropdown() {
    set({ isOpen: false, cellArgs: [], size: "medium" });
  },
}));

export default useDropdownStore;
