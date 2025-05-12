import apiClient from "./client";
import { ApiResponse, ApiPostRequest, Sort } from "@/types/api";

export const postWithLocationId = async <T>(
  url: string,
  locationId: number,
  sort: Sort[] | null = null
): Promise<ApiResponse<T>> => {
  const payload: ApiPostRequest = {
    requireTotalCount: true,
    searchOperation: "contains",
    searchValue: null,
    skip: 0,
    take: 10000,
    userData: {},
    sort: sort,
    id: locationId,
  };

  const { data } = await apiClient.post<ApiResponse<T>>(url, payload);
  return data;
};

export const postWithLocationFilter = async <T>(
  url: string,
  locationId: number,
  sort: Sort[] | null = null
): Promise<ApiResponse<T>> => {
  const payload: ApiPostRequest = {
    requireTotalCount: true,
    searchOperation: "contains",
    searchValue: null,
    skip: 0,
    take: 10000,
    userData: {},
    sort: sort,
    filter: ["locationId", "=", locationId],
  };

  const { data } = await apiClient.post<ApiResponse<T>>(url, payload);
  return data;
};
