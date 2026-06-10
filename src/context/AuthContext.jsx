import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../api/authApi";

const TOKEN_STORAGE_KEY = "@kakacanteen_auth_token";
const USER_STORAGE_KEY = "@kakacanteen_auth_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedToken) {
        setToken(storedToken);
        setUser(storedUser ? JSON.parse(storedUser) : null);
      }
    } catch {
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function login(username, password) {
    const { token: receivedToken, user: userData } = await loginUser(username, password);

    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, receivedToken);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

    setToken(receivedToken);
    setUser(userData);
  }

  async function logout() {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isLoadingSession, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
