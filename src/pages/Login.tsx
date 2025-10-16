import React, { useState } from "react";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { setSession  } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setToken = (accessToken: string, role?: string | null) => {
        // Store token and role in localStorage for session persistence
        localStorage.setItem("token", accessToken);
        if (role) localStorage.setItem("role", role);
        // Update Redux store with token and role
        dispatch(setSession({ token: accessToken, username, role }));
    };

    const login = (userData: { username: string; password: string }) => {
        console.log('user data', userData);
        api.post("/auth/login", {
            ...userData,
        }).then(({ data }) => {
            const role = data.role ?? data.user?.role ?? null;
            setToken(data.accessToken, role);
            navigate('/', { replace: true });
            console.log(data.accessToken);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <input
                className="border p-2 mb-2 rounded"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="border p-2 mb-2 rounded"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 text-black px-4 py-2 rounded"
                onClick={() => login({ username, password })}
            >
                Login
            </button>
            <p className="text-gray-400 mt-4 text-sm">
                Use username <strong>superadmin</strong> for delete rights
            </p>
        </div>
    );
}


