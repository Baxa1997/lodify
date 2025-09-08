import {Routes, Route, Navigate} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import "./App.css";
import Login from "./pages/Login/Login";
import RoleSelection from "./pages/RoleSelection/RoleSelection";
import Register from "./pages/Register/Register";
import PhoneVerification from "./pages/PhoneVerification/PhoneVerification";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>

        <Route path="/" element={<Navigate to="/role-selection" replace />} />
        <Route path="*" element={<Navigate to="/role-selection" replace />} />
      </Routes>
    </div>
  );
}

export default App;
