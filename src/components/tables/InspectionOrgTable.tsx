"use client";
import { useMemo, useCallback } from "react";
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "@ag-grid-community/core";
import { useBuildingInspectors } from "@/hooks/useQueries";
import { BuildingInspector } from "@/types/api";
import BaseTable from "./BaseTable";
import { formatPhoneNumber } from "@/lib/utils";
import { ENTITY_NAMES } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { FILTER_OPTIONS } from "@/constants/tableSettings";

interface InspectionOrgTableProps {
  provinceId: string;
}

export default function InspectionOrgTable({
  provinceId,
}: InspectionOrgTableProps) {
  const { data, isLoading, isError, error } = useBuildingInspectors(
    parseInt(provinceId, 10)
  );

  // Telefon numarası formatlama
  const phoneFormatter = useCallback((params: ValueFormatterParams) => {
    if (!params.value) return "";
    return formatPhoneNumber(params.value);
  }, []);

  // Telefon numarası için filtre
  const phoneValueGetter = useCallback(
    (params: ValueGetterParams<BuildingInspector>) => {
      if (!params.data) return "";
      return formatPhoneNumber(params.data.phone);
    },
    []
  );

  const columnDefs = useMemo<ColDef<BuildingInspector>[]>(
    () => [
      {
        field: "fileNumber",
        headerName: "Belge No",
        sortable: true,
        filter: true,
        width: 120,
        cellClass: "text-center",
      },
      {
        field: "name",
        headerName: "Ünvanı",
        sortable: true,
        filter: true,
        flex: 2,
        tooltipField: "name",
      },
      {
        field: "address",
        headerName: "Adres",
        sortable: true,
        filter: true,
        flex: 3,
        tooltipField: "address",
      },
      {
        field: "phone",
        headerName: "Telefon",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 200,
        valueFormatter: phoneFormatter,
        valueGetter: phoneValueGetter,
        cellClass: "text-left",
        filterParams: {
          filterOptions: FILTER_OPTIONS.TEXT,
          debounceMs: FILTER_OPTIONS.DEBOUNCE_MS,
        },
      },
    ],
    [phoneFormatter, phoneValueGetter]
  );

  return (
    <BaseTable<BuildingInspector>
      columnDefs={columnDefs}
      rowData={data?.items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.BUILDING_INSPECTOR}
      totalCount={data?.totalCount || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.BUILDING_INSPECTOR)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
