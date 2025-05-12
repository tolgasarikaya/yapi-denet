// src/components/tables/LabTable.tsx
"use client";
import { useMemo, useCallback } from "react";
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "@ag-grid-community/core";
import { useLaboratories } from "@/hooks/useQueries";
import { Laboratory } from "@/types/api";
import BaseTable from "./BaseTable";
import { formatPhoneNumber } from "@/lib/utils";
import { ENTITY_NAMES } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

interface LabTableProps {
  provinceId: string;
}

export default function LabTable({ provinceId }: LabTableProps) {
  const { data, isLoading, isError, error } = useLaboratories(
    parseInt(provinceId, 10)
  );

  // Telefon numarası formatlaması
  const phoneFormatter = useCallback((params: ValueFormatterParams) => {
    if (!params.value) return "";
    return formatPhoneNumber(params.value);
  }, []);

  // Telefon numarası için valueGetter - filtrelemede formatlanmış hali kullanılacak
  const phoneValueGetter = useCallback(
    (params: ValueGetterParams<Laboratory>) => {
      if (!params.data) return "";
      return formatPhoneNumber(params.data.phone);
    },
    []
  );

  // Kolon tanımları
  const columnDefs = useMemo<ColDef<Laboratory>[]>(
    () => [
      {
        field: "fileNumber",
        headerName: "Belge No",
        sortable: true,
        filter: true,
        width: 110,
        cellClass: "text-center",
      },
      {
        field: "name",
        headerName: "Ünvanı",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 3,
        tooltipField: "name",
      },
      {
        field: "labType",
        headerName: "Laboratuvar Tipi",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 2,
        tooltipField: "labType",
      },
      {
        field: "locationName",
        headerName: "İli",
        sortable: true,
        filter: true,
        flex: 1,
      },
      {
        field: "phone",
        headerName: "Telefon",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 1,
        valueFormatter: phoneFormatter,
        valueGetter: phoneValueGetter,
        cellClass: "text-left",
      },
    ],
    [phoneFormatter, phoneValueGetter]
  );

  return (
    <BaseTable<Laboratory>
      columnDefs={columnDefs}
      rowData={data?.items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.LABORATORY}
      totalCount={data?.totalCount || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.LABORATORY)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
