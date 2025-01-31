import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore"

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthStore((state) => state);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
