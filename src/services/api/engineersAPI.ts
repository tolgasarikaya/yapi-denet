import { ApiResponse, YKEEngineer, Sort } from "@/types/api";
import { postWithLocationId } from "./utils";

export const EngineersAPI = {
  getYKEEngineersByLocation: async (
    locationId: number
  ): Promise<ApiResponse<YKEEngineer>> => {
    const sort: Sort[] = [
      {
        selector: "occupationalRegistrationNumber",
        desc: false,
      },
    ];

    return postWithLocationId<YKEEngineer>(
      "/accountApplication/findAllPublicYKEArchitectEngineers",
      locationId,
      sort
    );
  },
};
