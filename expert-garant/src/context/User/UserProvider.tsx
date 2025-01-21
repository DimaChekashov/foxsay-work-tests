import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import User from "../../types/User";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({username: "", password: ""});
    
    useEffect(() => {
        const gigaUser = localStorage.getItem("gigaUser");

        if (!gigaUser) {
            updateUser({username: "admin", password: "123456"});
        } else {
            setUser(JSON.parse(gigaUser));
        }
    }, []);

    const updateUser = (user: User) => {
        localStorage.setItem("gigaUser", JSON.stringify(user));
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ updateUser, user }}>
            {children}
        </UserContext.Provider>
    );
};
  