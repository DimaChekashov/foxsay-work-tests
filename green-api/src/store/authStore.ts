import { create } from "zustand";

interface AuthStore {
    idInstance: string;
    apiTokenInstance: string;
    isLoggedIn: boolean;
    setIdInstance: (idInstance: string) => void;
    setApiTokenInstance: (apiTokenInstance: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    idInstance: "",
    apiTokenInstance: "",
    isLoggedIn: false,
    setIdInstance: (idInstance: string) => set({ idInstance }),
    setApiTokenInstance: (apiTokenInstance: string) => set({ apiTokenInstance }),
    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}));

export default useAuthStore;
