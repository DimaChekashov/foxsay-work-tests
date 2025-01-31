import { create } from "zustand";

interface AuthStore {
    idInstance: string;
    apiTokenInstance: string;
    isLoggedIn: boolean;
    login: (idInstance: string, apiTokenInstance: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    idInstance: "",
    apiTokenInstance: "",
    isLoggedIn: false,
    login: (idInstance: string, apiTokenInstance: string) => set({ idInstance, apiTokenInstance, isLoggedIn: true }),
    logout: () => set({ idInstance: "", apiTokenInstance: "", isLoggedIn: false }),
}));

export default useAuthStore;
