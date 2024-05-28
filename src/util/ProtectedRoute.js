import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../util/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    // 로그인 상태가 아니라면 로그인 페이지로 리다이렉트
    return <Navigate to="/login" />;
  }

  // 로그인 상태라면 children 컴포넌트를 렌더링
  return children;
};

export default ProtectedRoute;
