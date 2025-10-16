import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../store/authSlice';
import { login as apiLogin } from '../Api/api';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      const res: any = await apiLogin(username, password);
      const token = res?.token ?? res?.accessToken ?? res;
      const role = res?.role ?? (username === 'superadmin' ? 'admin' : 'user');

      localStorage.setItem('token', token ?? '');
      localStorage.setItem('username', username ?? '');
      localStorage.setItem('role', role ?? '');

      dispatch(setSession({ token, username, role }));
      navigate('/products', { replace: true });
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        <input
          className="border p-2 mb-2 w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading} className="bg-blue-500 text-black px-4 py-2 rounded w-full">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}