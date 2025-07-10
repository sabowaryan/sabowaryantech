import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toastMessage: string | undefined;
  setToast: (msg?: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toastMessage: undefined,
  setToast: (msg) => set({ toastMessage: msg }),
})); 