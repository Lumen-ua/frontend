import { apiRequest } from "./http";

export const budgetContentApi = {
  async get(token) {
    return apiRequest("/api/BudgetContent", { token });
  },

  async complete(token, simulationKey) {
    return apiRequest("/api/BudgetContent/complete", {
      method: "POST",
      token,
      body: { simulationKey },
    });
  },
};