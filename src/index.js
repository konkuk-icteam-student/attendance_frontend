import React from "react";
import ReactDOM from "react-dom";
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
import Login from "./pages/Login";
import Manage from "./pages/Manage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Nav>
            <Home />
          </Nav>
        }
      />
      <Route
        path="/login"
        element={
          <Nav>
            <Login />
          </Nav>
        }
      />
      <Route
        path="/manage"
        element={
          <Nav>
            <Manage />
          </Nav>
        }
      />
    </Routes>
  </BrowserRouter>
);
