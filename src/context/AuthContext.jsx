import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth";
import { usersApi } from "../api/users";

const AuthContext = createContext(null);

const TOKEN_KEY = "lumen_token";

function normalizeUser(u) {
  if (!u) return null;

  return {
    id: u.id ?? u.Id,
    email: u.email ?? u.Email,
    name: u.name ?? u.Name,
    avatarUrl: u.avatarUrl ?? u.AvatarUrl ?? null,
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshCurrent(nextToken = token) {
    if (!nextToken) {
      setUser(null);
      return null;
    }
    const u = await authApi.current(nextToken);
    setUser(normalizeUser(u));
    return u;
  }

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

        await refreshCurrent(token);
        if (alive) setLoading(false);
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

    setUser(normalizeUser(result));
    return result;
  }

  async function login({ email, password }) {
    const result = await authApi.login({ email, password });

    const jwt = result.token || result.Token;
    if (!jwt) throw new Error("Token was not returned by server");

    localStorage.setItem(TOKEN_KEY, jwt);
    setToken(jwt);

    setUser(normalizeUser(result));
    return result;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  async function updateProfile(data) {
    if (!token) throw new Error("Not authenticated");
    const res = await usersApi.updateMe(token, data);
    const next = normalizeUser(res);

    setUser((prev) => ({
      ...prev,
      ...next,
      avatarUrl: next?.avatarUrl ?? prev?.avatarUrl ?? null,
    }));

    return res;
  }

  async function uploadAvatar(file) {
    if (!token) throw new Error("Not authenticated");
    const res = await usersApi.uploadAvatar(token, file);
    const next = normalizeUser(res);

    setUser((prev) => ({
      ...prev,
      ...next,
    }));

    return res;
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      register,
      login,
      logout,
      refreshCurrent,
      updateProfile,
      uploadAvatar,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}