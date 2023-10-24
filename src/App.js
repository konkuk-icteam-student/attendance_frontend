import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Home from "./Home";
import Login from "./pages/Login";
import Manage from "./pages/Manage";
class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
