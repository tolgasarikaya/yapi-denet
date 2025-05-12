import apiClient from "./client";
import { ApiResponse, Statistics } from "@/types/api";

export const StatisticsAPI = {
  getStatisticsByLocation: async (
    locationId: number
  ): Promise<ApiResponse<Statistics>> => {
    const { data } = await apiClient.get<ApiResponse<Statistics>>(
      `/department/findAllPublicStatistics/${locationId}`
    );
    return data;
  },
};
