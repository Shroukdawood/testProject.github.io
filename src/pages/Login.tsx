// import React, { useState } from "react";
// import api from "../api/api";
// import { useDispatch } from "react-redux";
// import { setSession } from "../store/authSlice";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const setToken = (accessToken: string) => {
//         localStorage.setItem("token", accessToken);
//         dispatch(setSession({ token: accessToken, username }));
//     };

//     const login = (userData: { username: string; password: string }) => {
//         api.post("/auth/login", { ...userData })
//             .then(({ data }: any) => {
//                 setToken(data.accessToken);
//                 navigate('/', { replace: true });
//             })
//             .catch((error: any) => {
//                 console.error(error);
//             });
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-3xl font-bold mb-4">Login</h1>
//             <input
//                 className="border p-2 mb-2 rounded"
//                 placeholder="Username"
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 className="border p-2 mb-2 rounded"
//                 placeholder="Password"
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//                 className="bg-blue-500 text-black px-4 py-2 rounded"
//                 onClick={() => login({ username, password })}
//             >
//                 Login
//             </button>
//             <p className="text-gray-400 mt-4 text-sm">
//                 Use username <strong>superadmin</strong> for delete rights
//             </p>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as apiLogin } from '../Api/api';
import { setSession } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const res: any = await apiLogin(username, password);
      const token = res.token ?? res.accessToken ?? res;
      const isSuper = username?.trim().toLowerCase() === 'admin';
      const role = res.role ?? (username === 'superadmin' ? 'admin' : 'user');
      localStorage.setItem('token', token ?? '');
      localStorage.setItem('username', username ?? '');
      localStorage.setItem('role', role ?? '');
      dispatch(setSession({ token, username, role }));
      navigate('/products', { replace: true });
    } catch (e) {
      console.error(e);
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 sm:p-0 lg:p-0">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        <input className="border p-2 mb-2 w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          className="border p-2 mb-2 w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={onLogin} className="bg-blue-500 text-black px-4 py-2 rounded w-full">
          Login
        </button>

        <p className="text-gray-500 mt-2 text-sm">Use username <strong>superadmin</strong> for delete rights</p>
      </div>
    </div>
  );
}
