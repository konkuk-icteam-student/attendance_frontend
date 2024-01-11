import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  BrowserRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Nav from "./component/Nav";
import Home from "./Home";
import Login from "./pages/common/LoginPage";
import Manage from "./pages/admin/ManagementListPage";
import Signup from "./pages/common/SignupPage";
import EditWorkRecords from "./pages/admin/EditWorkRecords";
import DepartmentManagementPage from "./pages/admin/DepartmentManagementPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workinginfo" element={<EditWorkRecords />} />
      <Route path="/department-manage" element={<DepartmentManagementPage />} />
    </Routes>
  </BrowserRouter>
);
