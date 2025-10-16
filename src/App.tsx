// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
// import Login from "./pages/Login";
// import AllProducts from "./pages/AllProducts";
// import Category from "./pages/Category";
// import { useAutoLock } from "./hooks/useAutoLock";
// import LockOverlay from "./components/LockOverlay";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "./store";
// import { clearSession } from "./store/authSlice";

// export default function App() {
//   const { token } = useSelector((s: RootState) => s.auth as RootState["auth"]);
//   const [locked, setLocked] = useState(false);
//   const dispatch = useDispatch();

//   useAutoLock(() => setLocked(true));

//   const handleUnlock = () => setLocked(false);
//   const handleFallback = () => {
//     const pass = prompt("Enter password");
//     const saved = localStorage.getItem("password");
//     if (pass === saved) setLocked(false);
//     else alert("Wrong password");
//   };

//   const signOut = () => {
//     dispatch(clearSession());
//   };

//   return (
//     <BrowserRouter>
//       {!token ? (
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       ) : (
//         <>
//           <nav className="flex justify-around p-4 bg-gray-100">
//             <Link to="/products">All Products</Link>
//             <Link to="/category">Category</Link>
//             <button onClick={signOut} className="text-red-600">
//               Sign Out
//             </button>
//           </nav>

//           <Routes>
//             <Route path="/products" element={<AllProducts />} />
//             <Route path="/category" element={<Category />} />
//             <Route path="*" element={<Navigate to="/products" />} />
//           </Routes>
//         </>
//       )}

//       <LockOverlay
//         locked={locked}
//         onUnlock={handleUnlock}
//         onPasswordFallback={handleFallback}
//       />
//     </BrowserRouter>
//   );
// }
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query';
import { store } from './store';
import Login from './pages/Login';
import AllProducts from './pages/AllProducts';
import Category from './pages/Category';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LockOverlay from './components/LockOverlay';
import { useAutoLock } from './hooks/useAutoLock';

export default function App() {
  const { token, role, username } = useSelector((s: RootState) => s.auth);
  const [locked, setLocked] = useState(false);

  useAutoLock(() => setLocked(true));

  const handleUnlock = () => setLocked(false);
  const handleFallback = () => {
    const pass = prompt('Enter password');
    const saved = localStorage.getItem('password');
    if (pass === saved) setLocked(false);
    else alert('Wrong password');
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {!token ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <>
              <nav className="flex justify-around p-4 bg-gray-100">
                <Link to="/products">All Products</Link>
                <Link to="/category">Category</Link>
                {(role === 'admin' || username === 'superadmin') && <Link to="/admin">Admin</Link>}
                <button onClick={() => localStorage.clear()} className="text-red-600">
                  Sign Out
                </button>
              </nav>

              <Routes>
                <Route path="/products" element={<AllProducts />} />
                <Route path="/category" element={<Category />} />
                <Route path="/admin" element={(role === 'admin' || username === 'superadmin') ? <Admin /> : <Navigate to="/products" />} />
                <Route path="*" element={<Navigate to="/products" />} />
              </Routes>
            </>
          )}

          <LockOverlay locked={locked} onUnlock={handleUnlock} onPasswordFallback={handleFallback} />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
