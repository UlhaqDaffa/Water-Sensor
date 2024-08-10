import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Jika pengguna belum login, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika pengguna sudah login, render komponen yang diminta
  return <Component />;
};

export default ProtectedRoute;
