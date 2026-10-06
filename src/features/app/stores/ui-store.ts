import { create } from "zustand";

type UiState = {
  sidebarOpen: boolean;
  searchOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  searchOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
}));
