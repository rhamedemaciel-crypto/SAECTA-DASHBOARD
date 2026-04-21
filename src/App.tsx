import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Admin/Home";
import HomeClient from "./pages/Client/HomeClient";
import CadastroCliente from "./pages/Admin/CadastroCliente";
import CadastroAdmin from "./pages/Admin/CadastroAdmin";
import AdminLayout from "./components/layout/AdminLayout";
import Units from "./pages/Client/Units";
import BottomNav from "./components/ui/BottomNav/BottomNav";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* A Home e as outras telas OBRIGATORIAMENTE dentro do Layout */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Home />
            </AdminLayout>
          }
        />

        <Route
          path="/client"
          element={
            <AdminLayout>
              <HomeClient />
              <BottomNav />
            </AdminLayout>
          }
        />

        <Route
          path="/client/units"
          element={
            <AdminLayout>
              <Units />
              <BottomNav />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/cliente"
          element={
            <AdminLayout>
              <CadastroCliente />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/novo-admin"
          element={
            <AdminLayout>
              <CadastroAdmin />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
