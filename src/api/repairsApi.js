import { apiRequest } from "./http";

export const repairsApi = {
  getAll: (token) =>
    apiRequest("/api/RepairsContent", { token }),

  saveProgress: (data, token) =>
    apiRequest("/api/RepairsContent/progress", {
      method: "POST",
      body: data,
      token,
    }),

  saveMaintenance: (data, token) =>
    apiRequest("/api/RepairsContent/maintenance", {
      method: "POST",
      body: data,
      token,
    }),

  saveEmergency: (data, token) =>
    apiRequest("/api/RepairsContent/emergency", {
      method: "POST",
      body: data,
      token,
    }),
};