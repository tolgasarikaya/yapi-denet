// src/hooks/useQueries.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  ApiResponse,
  Statistics,
  BuildingInspector,
  Laboratory,
  Auditor,
  YKEEngineer,
  ControlWorker,
  SiteSupervisor,
  Distribution,
} from "../types/api";
import {
  StatisticsAPI,
  BuildingInspectorsAPI,
  LaboratoriesAPI,
  AuditorsAPI,
  EngineersAPI,
  ControlWorkersAPI,
  SiteSupervisorsAPI,
  DistributionAPI,
} from "@/services/api/index"; // Yeni import

import { CACHE_TIMES } from "@/constants/api";

// İl bazlı istatistik verileri için hook

export function useStatistics(
  locationId?: number
): UseQueryResult<ApiResponse<Statistics>, Error> {
  return useQuery({
    queryKey: ["statistics", locationId],
    queryFn: () => StatisticsAPI.getStatisticsByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.STATISTICS,
  });
}

// Yapı denetim kuruluşları için hook

export function useBuildingInspectors(
  locationId?: number
): UseQueryResult<ApiResponse<BuildingInspector>, Error> {
  return useQuery({
    queryKey: ["buildingInspectors", locationId],
    queryFn: () =>
      BuildingInspectorsAPI.getInspectorsByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.ORGANIZATIONS,
  });
}

// Laboratuvarlar için hook

export function useLaboratories(
  locationId?: number
): UseQueryResult<ApiResponse<Laboratory>, Error> {
  return useQuery({
    queryKey: ["laboratories", locationId],
    queryFn: () =>
      LaboratoriesAPI.getLaboratoriesByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.LABORATORIES,
  });
}

// Denetçiler için hook

export function useAuditors(
  locationId?: number
): UseQueryResult<ApiResponse<Auditor>, Error> {
  return useQuery({
    queryKey: ["auditors", locationId],
    queryFn: () => AuditorsAPI.getAuditorsByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.AUDITORS,
  });
}

// YKE Mimar ve Mühendisler için hook
export function useYKEEngineers(
  locationId?: number
): UseQueryResult<ApiResponse<YKEEngineer>, Error> {
  return useQuery({
    queryKey: ["ykeEngineers", locationId],
    queryFn: () => EngineersAPI.getYKEEngineersByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.ENGINEERS,
  });
}

// Yardımcı kontrol elemanları için hook
export function useControlWorkers(
  locationId?: number
): UseQueryResult<ApiResponse<ControlWorker>, Error> {
  return useQuery({
    queryKey: ["controlWorkers", locationId],
    queryFn: () =>
      ControlWorkersAPI.getControlWorkersByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.CONTROL_WORKERS,
  });
}

// Şantiye şefleri için hook
export function useSiteSupervisors(
  locationId?: number
): UseQueryResult<ApiResponse<SiteSupervisor>, Error> {
  return useQuery({
    queryKey: ["siteSupervisors", locationId],
    queryFn: () =>
      SiteSupervisorsAPI.getSiteSupervisorsByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.SITE_SUPERVISORS,
  });
}

// Dağıtım listesi için hook
export function useDistribution(
  locationId?: number
): UseQueryResult<Distribution[], Error> {
  return useQuery({
    queryKey: ["distribution", locationId],
    queryFn: () =>
      DistributionAPI.getDistributionByLocation(locationId as number),
    enabled: !!locationId,
    staleTime: CACHE_TIMES.DISTRIBUTION,
  });
}
