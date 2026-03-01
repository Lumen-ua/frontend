import { apiRequest } from "./http";

export const energyContentApi = {
  async get(token) {
    return apiRequest("/api/EnergyContent", { token });
  },

  async complete(token, topicKey) {
    return apiRequest("/api/EnergyContent/complete", {
      method: "POST",
      token,
      body: { topicKey },
    });
  },
};
