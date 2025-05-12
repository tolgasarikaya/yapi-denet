import { useMemo } from "react";
import { ColDef } from "@ag-grid-community/core";
import { useYKEEngineers } from "@/hooks/useQueries";
import { YKEEngineer } from "@/types/api";
import BaseTable from "./BaseTable";
import {
  WorkingStatusRenderer,
  workingStatusValueGetter,
} from "./renderers/StatusRenderer";
import { STATUS_FILTER_PARAMS } from "@/constants/tableSettings";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ENTITY_NAMES } from "@/constants";

interface YKEEngineersTableProps {
  provinceId: string;
}

export default function YKEEngineersTable({
  provinceId,
}: YKEEngineersTableProps) {
  const { data, isLoading, isError, error } = useYKEEngineers(
    parseInt(provinceId, 10)
  );

  const columnDefs = useMemo<ColDef<YKEEngineer>[]>(
    () => [
      {
        field: "personName",
        headerName: "Adı",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 140,
      },
      {
        field: "personSurName",
        headerName: "Soyadı",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 140,
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
        headerName: "Meslek",
        sortable: true,
        filter: "agSetColumnFilter",
        flex: 1,
      },
      {
        field: "occupationalRegistrationNumber",
        headerName: "Sicil",
        sortable: true,
        filter: true,
        width: 130,
        cellClass: "text-center",
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
    <BaseTable<YKEEngineer>
      columnDefs={columnDefs}
      rowData={data?.items}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.YKE_ENGINEER}
      totalCount={data?.totalCount || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.YKE_ENGINEER)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
