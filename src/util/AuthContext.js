import React, { useState, createContext, useEffect } from "react";
import client from "./clients"; // Axios 인스턴스 가져오기

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  const login = async (userData) => {
    try {
      setAuth(userData);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await client.post("/member/logout");
      setAuth(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const response = await client.get("/member/isLogin");
      setAuth(response.data);
    } catch (error) {
      setAuth(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
