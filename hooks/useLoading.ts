import { create } from "zustand";

type LoadingStates = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useLoading = create<LoadingStates>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));
