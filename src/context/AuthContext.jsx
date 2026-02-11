import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth";

const AuthContext = createContext(null);

const TOKEN_KEY = "lumen_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function init() {
      try {
        if (!token) {
          if (alive) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        const u = await authApi.current(token);
        if (alive) {
          setUser(u);
          setLoading(false);
        }
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
        if (alive) {
          setToken(null);
          setUser(null);
          setLoading(false);
        }
      }
    }

    init();
    return () => { alive = false; };
  }, [token]);

  async function register({ email, name, password }) {
  const result = await authApi.register({ email, name, password });

  const jwt = result.token || result.Token; 
  if (!jwt) throw new Error("Token was not returned by server");

  localStorage.setItem(TOKEN_KEY, jwt);
  setToken(jwt);

  setUser({
    id: result.id ?? result.Id,
    email: result.email ?? result.Email,
    name: result.name ?? result.Name,
  });

  return result;
}

  async function login({ email, password }) {
  const result = await authApi.login({ email, password });

  const jwt = result.token || result.Token;
  if (!jwt) throw new Error("Token was not returned by server");

  localStorage.setItem(TOKEN_KEY, jwt);
  setToken(jwt);

  setUser({
    id: result.id ?? result.Id,
    email: result.email ?? result.Email,
    name: result.name ?? result.Name,
  });

  return result;
}
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, loading, register, login, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}