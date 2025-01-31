import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function Header() {
  const {isLoggedIn, logout} = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="p-4 py-6 bg-lime-600 fixed top-0 left-0 right-0 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Green API - Test Messager</h1>
        {isLoggedIn && <button onClick={handleLogout} className="bg-lime-700 hover:bg-lime-800 transition text-white px-6 py-2 rounded cursor-pointer min-w-[150px]">Выйти</button>}
    </div>
  );
}

export default Header;