import { apiRequest } from "./http";

export const legalContentApi = {
  async get(token) {
    return apiRequest("/api/LegalContent", { token });
  },

  async complete(token, simulationKey) {
    return apiRequest("/api/LegalContent/complete", {
      method: "POST",
      token,
      body: { simulationKey },
    });
  },
};