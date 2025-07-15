import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../api/authentication";

interface AuthenticationContextType {
  token: string;
  registerUser: (email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType
);

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const registerUser = async (email: string, password: string) => {
    const response = await registerAPI(email, password);
    if (response.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };

  const loginUser = async (email: string, password: string) => {
    const response = await loginAPI(email, password);
    if (response.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);

  return (
    <AuthenticationContext.Provider
      value={{ token, registerUser, loginUser, logout, isLoggedIn }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthenticationContext);
