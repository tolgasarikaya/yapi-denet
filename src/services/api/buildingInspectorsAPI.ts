import { ApiResponse, BuildingInspector, Sort } from "@/types/api";
import { postWithLocationFilter } from "./utils";

export const BuildingInspectorsAPI = {
  getInspectorsByLocation: async (
    locationId: number
  ): Promise<ApiResponse<BuildingInspector>> => {
    const sort: Sort[] = [
      {
        selector: "fileNumber",
        desc: false,
      },
    ];

    return postWithLocationFilter<BuildingInspector>(
      "/department/findAllYdkPublic",
      locationId,
      sort
    );
  },
};
