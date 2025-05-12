import apiClient from "./client";
import { Distribution } from "@/types/api";

export const DistributionAPI = {
  getDistributionByLocation: async (
    locationId: number
  ): Promise<Distribution[]> => {
    const { data } = await apiClient.get<Distribution[]>(
      `/distribution/findAllPublic/${locationId}`
    );
    return data;
  },
};
