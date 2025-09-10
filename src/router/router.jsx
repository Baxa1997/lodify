import React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "../pages/Login/Login";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Register from "../pages/Register/Register";
import PhoneVerification from "../pages/PhoneVerification/PhoneVerification";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/Users";

const ProtectedRoute = ({children}) => {
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
};

const PublicRoute = ({children}) => {
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  const location = useLocation();

  if (isAuth) {
    const from = location.state?.from?.pathname || "/admin/dashboard";
    return <Navigate to={from} replace />;
  }

  return children;
};

const Router = () => {
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  const location = useLocation();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/role-selection"
        element={
          <PublicRoute>
            <RoleSelection />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/phone-verification"
        element={
          <PublicRoute>
            <PhoneVerification />
          </PublicRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route
        path="/"
        element={
          isAuth ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="*"
        element={
          isAuth ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default Router;
