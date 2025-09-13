import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import SingleAssets from "../pages/AssetsPage/SingleAssets";
import CompanyProfile from "../pages/CompanyProfile";

const Login = lazy(() => import("../pages/Login/Login"));
const RoleSelection = lazy(() =>
  import("../pages/RoleSelection/RoleSelection"),
);
const Register = lazy(() => import("../pages/Register/Register"));
const PhoneVerification = lazy(() =>
  import("../pages/PhoneVerification/PhoneVerification"),
);
const Users = lazy(() => import("../pages/Users"));
const SingleUser = lazy(() => import("../pages/Users/SingleUser"));
const Drivers = lazy(() => import("../pages/Drivers"));
const SingleDriver = lazy(() => import("../pages/Drivers/SingleDriver"));
const AssetsPage = lazy(() => import("../pages/AssetsPage"));

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate
      to="/login"
      state={{ from: location }}
      replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const isAuth = useSelector((state) => state?.auth?.isAuth);
  const location = useLocation();

  if (isAuth) {
    const from = location.state?.from?.pathname || "/admin/dashboard";
    return <Navigate
      to={from}
      replace />;
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
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          </PublicRoute>
        }
      />
      <Route
        path="/role-selection"
        element={
          <PublicRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <RoleSelection />
            </Suspense>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Register />
            </Suspense>
          </PublicRoute>
        }
      />
      <Route
        path="/phone-verification"
        element={
          <PublicRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <PhoneVerification />
            </Suspense>
          </PublicRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate
            to="/admin/dashboard"
            replace />} />
        <Route
          path="dashboard"
          element={<Dashboard />} />
        <Route
          path="users"
          element={<Users />} />
        <Route
          path="users/:id"
          element={<SingleUser />} />
        <Route
          path="drivers"
          element={<Drivers />} />
        <Route
          path="drivers/:id"
          element={<SingleDriver />} />
        <Route
          path="assets"
          element={<AssetsPage />} />
        <Route
          path="assets/:id"
          element={<SingleAssets />} />
        <Route
          path="settings"
          element={<Settings />} />
        <Route
          path="company-profile"
          element={<CompanyProfile />} />
      </Route>

      <Route
        path="/"
        element={
          isAuth ? (
            <Navigate
              to="/admin/dashboard"
              replace />
          ) : (
            <Navigate
              to="/login"
              replace />
          )
        }
      />

      <Route
        path="*"
        element={
          isAuth ? (
            <Navigate
              to="/admin/dashboard"
              replace />
          ) : (
            <Navigate
              to="/login"
              replace />
          )
        }
      />
    </Routes>
  );
};

export default Router;
