import { ApiResponse, Laboratory, Sort } from "@/types/api";
import { postWithLocationFilter } from "./utils";

export const LaboratoriesAPI = {
  getLaboratoriesByLocation: async (
    locationId: number
  ): Promise<ApiResponse<Laboratory>> => {
    const sort: Sort[] = [
      {
        selector: "fileNumber",
        desc: false,
      },
    ];

    return postWithLocationFilter<Laboratory>(
      "/department/findAllLabPublic",
      locationId,
      sort
    );
  },
};
