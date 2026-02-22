import { apiRequest, apiRequestFormData } from "./http";

export const usersApi = {
  me: (token) => apiRequest("/api/users/me", { method: "GET", token }),

  updateMe: (token, data) =>
    apiRequest("/api/users/me", { method: "PUT", token, body: data }),

  uploadAvatar: (token, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequestFormData("/api/users/me/avatar", { method: "POST", token, formData });
  },
};