"use client";

import { create } from "zustand";

interface DialogState {
  id?: string;
  isOpen: boolean;
  type: string | null;
  openDialog: (type: string, id?: string) => void;
  closeDialog: () => void;
}

const useDialog = create<DialogState>((set) => ({
  id: undefined,
  type: null,
  isOpen: false,
  openDialog: (type, id) => set({ isOpen: true, type, id }),
  closeDialog: () => set({ isOpen: false, type: null, id: undefined }),
}));

export default useDialog;
