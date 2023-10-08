import React from "react";
import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  isImportant: boolean;
  children: React.ReactNode;
  setChildren: (children: React.ReactNode) => void;
  openModal: (children: React.ReactNode) => void;
  closeModal: () => void;
  openImportantModal: (children: React.ReactNode) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isImportant: false,
  children: null,
  setChildren: (children) => set({ children: children }),
  openModal: (children) =>
    set({ isOpen: true, isImportant: false, children: children }),
  closeModal: () => set({ isOpen: false, isImportant: false, children: null }),
  openImportantModal: (children) =>
    set({ isOpen: true, isImportant: true, children: children }),
}));

export default useModalStore;
