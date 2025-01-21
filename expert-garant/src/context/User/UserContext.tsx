import { createContext } from "react";
import User from "../../types/User";

interface UserContextType {
    user: User;
    updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
    user: { username: "", password: "" },
    updateUser: () => {},
});
