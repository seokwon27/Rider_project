import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null })
    }),
    {
      name: "user-storage", // persist 설정임 localStorage에 저장될 이름
      getStorage: () => localStorage // 저장소 지정하는거
      //localStorage.setItem("user-storage", JSON.stringify(userData));로 상태를 저장하면 된다!
    }
  )
);

export default useUserStore;
