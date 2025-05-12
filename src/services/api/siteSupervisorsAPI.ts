import { ApiResponse, SiteSupervisor } from "@/types/api";
import { postWithLocationId } from "./utils";

export const SiteSupervisorsAPI = {
  getSiteSupervisorsByLocation: async (
    locationId: number
  ): Promise<ApiResponse<SiteSupervisor>> => {
    return postWithLocationId<SiteSupervisor>(
      "/accountApplication/findAllPublicSiteSupervisors",
      locationId
    );
  },
};
