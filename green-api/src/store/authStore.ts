import { create } from "zustand";

interface AuthStore {
    idInstance: string;
    apiTokenInstance: string;
    isLoggedIn: boolean;
    login: (idInstance: string, apiTokenInstance: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => {
    const storedIdInstance = localStorage.getItem("idInstance") || "";
    const storedApiTokenInstance = localStorage.getItem("apiTokenInstance") || "";
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    return {
        idInstance: storedIdInstance,
        apiTokenInstance: storedApiTokenInstance,
        isLoggedIn: storedIsLoggedIn,
        login: (idInstance: string, apiTokenInstance: string) => {
            localStorage.setItem("idInstance", idInstance);
            localStorage.setItem("apiTokenInstance", apiTokenInstance);
            localStorage.setItem("isLoggedIn", "true");
        
            set({ idInstance, apiTokenInstance, isLoggedIn: true });
        },
        logout: () => {
            localStorage.removeItem("idInstance");
            localStorage.removeItem("apiTokenInstance");
            localStorage.removeItem("isLoggedIn");

            set({ idInstance: "", apiTokenInstance: "", isLoggedIn: false });
        },
    }
});

export default useAuthStore;
