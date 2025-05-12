// src/components/tables/DistributionListTable.tsx
"use client";
import { useMemo, useCallback } from "react";
import { ColDef, ValueFormatterParams } from "@ag-grid-community/core";
import { useDistribution } from "@/hooks/useQueries";
import { Distribution } from "@/types/api";
import BaseTable from "./BaseTable";
import { ENTITY_NAMES } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

interface DistributionListTableProps {
  provinceId: string;
}

export default function DistributionListTable({
  provinceId,
}: DistributionListTableProps) {
  const { data, isLoading, isError, error } = useDistribution(
    parseInt(provinceId, 10)
  );

  // Tarih formatlaması için
  const dateFormatter = useCallback((params: ValueFormatterParams) => {
    if (!params.value) return "";
    const date = new Date(params.value);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Alan (m2) formatlaması için
  const areaFormatter = useCallback((params: ValueFormatterParams) => {
    if (!params.value && params.value !== 0) return "";
    const formattedValue = params.value.toString().replace(".", ",");
    return `${formattedValue} m²`;
  }, []);

  // Kolon tanımları
  const columnDefs = useMemo<ColDef<Distribution>[]>(
    () => [
      {
        field: "dagitim_tarihi",
        headerName: "Dağıtım Tarihi",
        sortable: true,
        filter: "agDateColumnFilter",
        width: 200,
        valueFormatter: dateFormatter,
      },
      {
        field: "havuzgrup",
        headerName: "Havuz Grubu",
        sortable: true,
        filter: true,
        width: 150,
        cellClass: "text-center",
      },
      {
        field: "yibfid",
        headerName: "YİBF",
        sortable: true,
        filter: true,
        width: 120,
        cellClass: "text-left",
      },
      {
        field: "belgeno",
        headerName: "Belge No",
        sortable: true,
        filter: true,
        width: 120,
        cellClass: "text-left",
      },
      {
        field: "unvan",
        headerName: "Ünvan",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 3,
      },
      {
        field: "m2",
        headerName: "Alan",
        sortable: true,
        filter: true,
        width: 180,
        valueFormatter: areaFormatter,
        cellClass: "text-right",
      },
      {
        field: "il_name",
        headerName: "İl Adı",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 1,
      },
    ],
    [dateFormatter, areaFormatter]
  );

  return (
    <BaseTable<Distribution>
      columnDefs={columnDefs}
      rowData={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={ENTITY_NAMES.DISTRIBUTION}
      totalCount={data?.length || 0}
      noDataMessage={ERROR_MESSAGES.NO_DATA(ENTITY_NAMES.DISTRIBUTION)}
      getRowId={(params) => String(params.data.id)}
    />
  );
}
