import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/authStore';

function LoginPage() {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    if (!idInstance || !apiTokenInstance) {
      setError("Введите ID Instance и API Token Instance");
      return;
    }
    setError(null);

    login(idInstance, apiTokenInstance);
    navigate("/");
  }, [idInstance, apiTokenInstance, login, navigate]);

  return (
    <div className="flex flex-col gap-4 w-1/4 items-center mx-auto bg-gray-100 rounded-lg p-6 mt-20">
      <h2 className="text-2xl font-400 mb-4 text-center">Введите ID Instance и<br/> API Token Instance</h2>
      <input
        type="text"
        placeholder="ID Instance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        className='flex-1 px-4 py-2 rounded bg-white w-full focus:outline-lime-600 transition-[outline]'
      />
      <input
        type="text"
        placeholder="API Token Instance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        className='flex-1 px-4 py-2 rounded bg-white w-full focus:outline-lime-600 transition-[outline]'
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin} className="bg-lime-600 hover:bg-lime-700 transition text-white px-6 py-2 rounded cursor-pointer min-w-[200px]">Войти</button>
    </div>
  );
}

export default LoginPage;