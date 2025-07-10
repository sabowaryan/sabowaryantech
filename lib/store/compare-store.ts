import { create } from "zustand";

interface CompareState {
  selected: string[];
  toggle: (id: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()((set, get) => ({
  selected: [],
  toggle: (id) =>
    set((state) =>
      state.selected.includes(id)
        ? { selected: state.selected.filter((x) => x !== id) }
        : { selected: [...state.selected, id] }
    ),
  clear: () => set({ selected: [] }),
})); 