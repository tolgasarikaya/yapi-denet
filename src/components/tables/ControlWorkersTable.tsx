// src/components/tables/ControlWorkersTable.tsx
"use client";
import { useMemo } from "react";
import { ColDef } from "@ag-grid-community/core";
import { useControlWorkers } from "@/hooks/useQueries";
import { ControlWorker } from "@/types/api";
import BaseTable from "./BaseTable";
import {
  WorkingStatusRenderer,
  workingStatusValueGetter,
} from "./renderers/StatusRenderer";
import { ENTITY_NAMES } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { FILTER_OPTIONS } from "@/constants/tableSettings";

interface ControlWorkersTableProps {
  provinceId: string;
}

export default function ControlWorkersTable({
  provinceId,
}: ControlWorkersTableProps) {
  const { data, isLoading, isError, error } = useControlWorkers(
    parseInt(provinceId, 10)
  );

  // Kolon tanımları
  const columnDefs = useMemo<ColDef<ControlWorker>[]>(
    () => [
      {
        field: "personName",
        headerName: "İsim",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 200,
      },
      {
        field: "personSurName",
        headerName: "Soyisim",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 200,
      },
      {
        field: "taskName",
        headerName: "Görev",
        sortable: true,
        filter: "agSetColumnFilter",
        flex: 1,
      },
      {
        field: "titleName",
        headerName: "Alan",
        sortable: true,
        filter: "agSetColumnFilter",
        flex: 1,
      },
      {
        field: "working",
        headerName: "Durumu",
        sortable: true,
        filter: "agTextColumnFilter",
        filterParams: {
          filterOptions: FILTER_OPTIONS.TEXT,
          debounceMs: FILTER_OPTIONS.DEBOUNCE_MS,
          caseSensitive: false,
          suppressAndOrCondition: true,
        },
        width: 120,
        cellRenderer: WorkingStatusRenderer,
        valueGetter: workingStatusValueGetter,
      },
    ],
    []
  );

  return (
    <BaseTable<ControlWorker>
      columnDefs={columnDefs}
      rowData={data?.items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.CONTROL_WORKER}
      totalCount={data?.totalCount || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.CONTROL_WORKER)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
