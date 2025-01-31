import React from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/authStore';

function LoginPage() {
  const [idInstance, setIdInstance] = React.useState("");
  const [apiTokenInstance, setApiTokenInstance] = React.useState("");
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleLogin = () => {
    login(idInstance, apiTokenInstance);
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-4 w-1/4 items-center mx-auto bg-gray-100 rounded-lg p-6 mt-20">
      <h2 className="text-2xl font-400 mb-4 text-center">Введите ID Instance и<br/> API Token Instance</h2>
      <input
        type="text"
        placeholder="ID Instance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        className='flex-1 px-4 py-2 rounded outline-none bg-white w-full'
      />
      <input
        type="text"
        placeholder="API Token Instance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        className='flex-1 px-4 py-2 rounded outline-none bg-white w-full'
      />
      <button onClick={handleLogin} className="bg-lime-600 hover:bg-lime-700 transition text-white px-6 py-2 rounded cursor-pointer min-w-[200px]">Вход</button>
    </div>
  );
}

export default LoginPage;