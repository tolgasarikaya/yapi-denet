import { ApiResponse, Auditor } from "@/types/api";
import { postWithLocationId } from "./utils";

export const AuditorsAPI = {
  getAuditorsByLocation: async (
    locationId: number
  ): Promise<ApiResponse<Auditor>> => {
    return postWithLocationId<Auditor>(
      "/documentApplication/findAllPublicAuditors",
      locationId
    );
  },
};
