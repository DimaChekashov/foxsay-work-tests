import { createContext } from "react";
import User from "../../types/User";

interface UserContextType {
    updateUser: (user: User) => void;
    getUser: () => User;
}

export const UserContext = createContext<UserContextType>({
    updateUser: () => {},
    getUser: () => ({
        username: "",
        password: ""
    }),
});
