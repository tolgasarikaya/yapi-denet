// src/components/tables/StatisticsTable.tsx
"use client";
import { useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef, ValueFormatterParams } from "@ag-grid-community/core";
import { useStatistics } from "@/hooks/useQueries";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { cn } from "@/lib/utils";
import { TABLE_SETTINGS } from "@/constants/tableSettings";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { ENTITY_NAMES } from "@/constants";

interface StatisticsRow {
  description: string;
  value: number;
  unit: string;
}

interface StatisticsTableProps {
  provinceId: string;
}

export default function StatisticsTable({ provinceId }: StatisticsTableProps) {
  const {
    data: statisticsResponse,
    isLoading,
    isError,
    error,
  } = useStatistics(parseInt(provinceId, 10));

  const statisticsRows = useMemo<StatisticsRow[]>(() => {
    if (!statisticsResponse?.items || statisticsResponse.items.length === 0)
      return [];

    const statistics = statisticsResponse.items[0];

    return [
      {
        description: "Aktif İş Sayısı",
        value: statistics.countTotalYibf || 0,
        unit: "Adet",
      },
      {
        description: "Aktif Denetlenen Alan",
        value: statistics.countTotalConstructionArea || 0,
        unit: "m²",
      },
      {
        description: "Aktif YDK",
        value: statistics.countTotalActiveYdk || 0,
        unit: "Adet",
      },
      {
        description: "Aktif LAB",
        value: statistics.countTotalActiveLab || 0,
        unit: "Adet",
      },
      {
        description: "Türkiye Geneli Aktif Denetlenen YİBF Sayısı",
        value: statistics.countTotalCountryYibf || 0,
        unit: "Adet",
      },
      {
        description: "Türkiye Geneli Aktif Denetlenen Alan",
        value: statistics.countTotalCountryConstructionArea || 0,
        unit: "m²",
      },
    ];
  }, [statisticsResponse]);

  const valueFormatter = (params: ValueFormatterParams) => {
    if (typeof params.value !== "number") return "";
    const formattedNumber = params.value.toLocaleString("tr-TR");
    const unit = (params.data as StatisticsRow).unit;
    return `${formattedNumber} ${unit}`;
  };

  const columnDefs = useMemo<ColDef<StatisticsRow>[]>(
    () => [
      {
        field: "description",
        headerName: "",
        flex: 2,
        sortable: false,
        filter: false,
        cellClass: "font-semibold",
      },
      {
        field: "value",
        headerName: "",
        flex: 1,
        sortable: false,
        filter: false,
        valueFormatter: valueFormatter,
        cellClass: "text-left font-medium",
      },
    ],
    []
  );

  // İstatistik tablosu özel bir durum olduğu için tam olarak BaseTable'ı kullanmak zorunda değiliz
  // Bu durumda doğrudan özgün kodu koruyabiliriz

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorMessage
        error={(error as Error)?.message || ERROR_MESSAGES.GENERIC_ERROR}
        title={ERROR_MESSAGES.LOAD_FAILED(ENTITY_NAMES.STATISTICS)}
      />
    );
  }

  if (!statisticsResponse?.items || statisticsResponse.items.length === 0) {
    return <div className="p-4">Bu il için istatistik verisi bulunamadı.</div>;
  }

  return (
    <div className="w-full pt-6">
      <div
        className="ag-theme-alpine w-full bg-white"
        style={{ height: "auto" }}
      >
        <AgGridReact
          rowData={statisticsRows}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: false,
          }}
          headerHeight={TABLE_SETTINGS.HEADER_HEIGHT}
          rowHeight={TABLE_SETTINGS.ROW_HEIGHT}
          domLayout="autoHeight"
          suppressCellFocus={true}
          suppressMovableColumns={true}
          suppressRowHoverHighlight={false}
          getRowClass={(params) =>
            cn(params.rowIndex % 2 === 0 ? "bg-gray-50" : "")
          }
        />
      </div>
    </div>
  );
}
