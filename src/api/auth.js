import { apiRequest } from "./http";

export const authApi = {
  register: (data) =>
    apiRequest("/api/auth/register", { method: "POST", body: data }),

  login: (data) =>
    apiRequest("/api/auth/login", { method: "POST", body: data }),

  current: (token) =>
    apiRequest("/api/auth/current", { method: "GET", token }),
};