import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (userData) => set({ user: userData }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ user: null, accessToken: null })
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage
    }
  )
);

export default useUserStore;
