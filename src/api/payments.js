import { apiRequest } from "./http";

export const paymentsApi = {
  getHistory: (token) =>
    apiRequest("/api/payments", { method: "GET", token }),

  create: (token, data) =>
    apiRequest("/api/payments", {
      method: "POST",
      body: data,
      token
    }),

  refund: (token, id) =>
    apiRequest(`/api/payments/${id}/refund`, {
      method: "POST",
      token
    }),
};

export const templatesApi = {
  get: (token) =>
    apiRequest("/api/payments/templates", {
      method: "GET",
      token
    }),

  create: (token, data) =>
    apiRequest("/api/payments/templates", {
      method: "POST",
      body: data,
      token
    }),

  delete: (token, id) =>
    apiRequest(`/api/payments/templates/${id}`, {
      method: "DELETE",
      token
    }),
};

export const dashboardApi = {
  get: (token) =>
    apiRequest("/api/dashboard", {
      method: "GET",
      token
    }),
};