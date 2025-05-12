"use client";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useMemo } from "react";
import { ColDef } from "@ag-grid-community/core";
import { useAuditors } from "@/hooks/useQueries";
import { Auditor } from "@/types/api";
import BaseTable from "./BaseTable";
import {
  WorkingStatusRenderer,
  workingStatusValueGetter,
} from "./renderers/StatusRenderer";
import { ENTITY_NAMES } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { STATUS_FILTER_PARAMS } from "@/constants/tableSettings";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AuditorsTableProps {
  provinceId: string;
}

export default function AuditorsTable({ provinceId }: AuditorsTableProps) {
  const { data, isLoading, isError, error } = useAuditors(
    parseInt(provinceId, 10)
  );

  // Kolon tanımları
  const columnDefs = useMemo<ColDef<Auditor>[]>(
    () => [
      {
        field: "personName",
        headerName: "Adı",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 1,
      },
      {
        field: "personSurName",
        headerName: "Soyadı",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 1,
      },
      {
        field: "taskName",
        headerName: "Görev",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 2,
      },
      {
        field: "titleName",
        headerName: "Meslek",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 2,
      },
      {
        field: "occupationalRegistrationNumber",
        headerName: "Sicil No",
        sortable: true,
        filter: true,
        width: 130,
        cellClass: "text-center font-medium",
      },
      {
        field: "working",
        headerName: "Durumu",
        sortable: true,
        filter: "agTextColumnFilter",
        filterParams: STATUS_FILTER_PARAMS,
        width: 120,
        cellRenderer: WorkingStatusRenderer,
        valueGetter: workingStatusValueGetter,
      },
    ],
    []
  );

  return (
    <BaseTable<Auditor>
      columnDefs={columnDefs}
      rowData={data?.items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.AUDITOR}
      totalCount={data?.totalCount || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.AUDITOR)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
