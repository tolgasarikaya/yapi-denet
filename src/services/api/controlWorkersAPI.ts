import { ApiResponse, ControlWorker } from "@/types/api";
import { postWithLocationId } from "./utils";

export const ControlWorkersAPI = {
  getControlWorkersByLocation: async (
    locationId: number
  ): Promise<ApiResponse<ControlWorker>> => {
    return postWithLocationId<ControlWorker>(
      "/accountApplication/findAllPublicControlWorkers",
      locationId
    );
  },
};
