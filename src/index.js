import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./component/Nav";
import Home from "./Home";
import Login from "./pages/common/LoginPage";
import Manage from "./pages/admin/ManagementListPage";
import Signup from "./pages/common/SignupPage";
import EditWorkRecords from "./pages/admin/EditWorkRecordsPage";
import DepartmentManagementPage from "./pages/admin/DepartmentManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AuthProvider from "./util/AuthContext";
import ProtectedRoute from "./util/\bProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <div>
              <Nav></Nav>
              <Login />
            </div>
          }
        />
        <Route
          path="/manage"
          element={
            <div>
              <ProtectedRoute>
                <Nav> </Nav>
                <Manage />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <Nav> </Nav>
              <Signup />
            </div>
          }
        />
        <Route
          path="/workinginfo"
          element={
            <div>
              <Nav> </Nav>
              <EditWorkRecords />
            </div>
          }
        />
        <Route
          path="/department-manage"
          element={
            <div>
              <Nav> </Nav>
              <DepartmentManagementPage />
            </div>
          }
        />
        <Route
          path="user-manage"
          element={
            <div>
              <Nav> </Nav>
              <UserManagementPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
