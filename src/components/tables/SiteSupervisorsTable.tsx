"use client";
import { useMemo } from "react";
import { ColDef } from "@ag-grid-community/core";
import { useSiteSupervisors } from "@/hooks/useQueries";
import { SiteSupervisor } from "@/types/api";
import BaseTable from "./BaseTable";
import { ENTITY_NAMES } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

interface SiteSupervisorsTableProps {
  provinceId: string;
}

export default function SiteSupervisorsTable({
  provinceId,
}: SiteSupervisorsTableProps) {
  const { data, isLoading, isError, error } = useSiteSupervisors(
    parseInt(provinceId, 10)
  );

  const columnDefs = useMemo<ColDef<SiteSupervisor>[]>(
    () => [
      {
        field: "personName",
        headerName: "Adı",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 200,
      },
      {
        field: "personSurName",
        headerName: "Soyadı",
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
    ],
    []
  );

  return (
    <BaseTable<SiteSupervisor>
      columnDefs={columnDefs}
      rowData={data?.items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.SITE_SUPERVISOR}
      totalCount={data?.totalCount || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.SITE_SUPERVISOR)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
