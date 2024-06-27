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

  const logout = () => {
    client
      .post(
        "/member/logout",
        {},
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        setAuth(null);
        alert("로그아웃 성공");
      })
      .catch((error) => {
        if (error.response) {
          console.error("로그아웃 실패:", error.response.data.message);
        } else if (error.request) {
          console.error("로그아웃 실패: 서버 응답 없음");
        } else {
          console.error("로그아웃 실패:", error.message);
        }
      });
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
