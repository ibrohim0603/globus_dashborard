import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUser = create((set) => ({
  user: null,
  setUser: (data) =>
    set(() => ({
      user: data,
    })),
}));
