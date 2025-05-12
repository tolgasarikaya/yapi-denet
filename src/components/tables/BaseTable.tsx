// src/components/tables/BaseTable.tsx
import { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef } from "@ag-grid-community/core";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { X } from "lucide-react";
import { BaseTableProps } from "@/types/table";
import { TABLE_SETTINGS } from "@/constants/tableSettings";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

/**
 * Tüm tablo bileşenleri için temel bileşen
 */
export default function BaseTable<T>({
  columnDefs,
  rowData,
  isLoading,
  isError,
  error,
  title,
  totalCount = 0,
  noDataMessage,
  rowHeight = 48,
  defaultColDef,
  getRowId = (params) => String(params.data.id),
  quickFilterMatcher,
}: BaseTableProps<T>) {
  const [quickFilterText, setQuickFilterText] = useState("");
  const gridRef = useRef<AgGridReact>(null);

  // Default büyük/küçük harf duyarsız hızlı arama
  const defaultQuickFilterMatcher = useCallback(
    (
      quickFilterParts: string[],
      rowQuickFilterAggregateText: string
    ): boolean => {
      if (!quickFilterParts || quickFilterParts.length === 0) return true;
      return quickFilterParts.every(
        (part) =>
          rowQuickFilterAggregateText
            .toLowerCase()
            .indexOf(part.toLowerCase()) >= 0
      );
    },
    []
  );

  // Input değişiminde filtreleme
  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuickFilterText(e.target.value);
    },
    []
  );

  // Tüm filtreleri temizle
  const clearAllFilters = useCallback(() => {
    if (gridRef.current?.api) {
      setQuickFilterText("");
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.applyColumnState({
        defaultState: { sort: null },
      });
    }
  }, []);

  // Varsayılan kolon özellikleri
  const defaultColumnDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressMovable: true,
      filterParams: {
        caseSensitive: false,
      },
      ...defaultColDef,
    }),
    [defaultColDef]
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <ErrorMessage
        error={(error as Error)?.message || ERROR_MESSAGES.GENERIC_ERROR}
        title={ERROR_MESSAGES.LOAD_FAILED(title)}
      />
    );
  }

  if (!rowData || (Array.isArray(rowData) && rowData.length === 0)) {
    return <div className="p-4">{noDataMessage}</div>;
  }

  return (
    <div className="w-full pt-6">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div className="flex flex-wrap w-full md:w-auto gap-2 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Hızlı arama..."
              value={quickFilterText}
              onChange={handleFilterChange}
              className="py-2 pl-9 pr-4 border border-gray-300 rounded w-full"
            />
            <span className="absolute left-3 top-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>

          <button
            onClick={clearAllFilters}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded flex items-center text-sm font-medium"
            type="button"
          >
            <X className="h-4 w-4 mr-1" />
            Filtreleri Temizle
          </button>
        </div>
        <div className="text-sm text-gray-600 w-full md:w-auto text-left md:text-right pr-2">
          Toplam {totalCount} kayıt bulundu
        </div>
      </div>

      <div className="w-full h-[500px] ag-theme-alpine rounded-md border border-gray-200 shadow-sm overflow-hidden">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColumnDef}
          pagination={true}
          paginationPageSize={TABLE_SETTINGS.DEFAULT_PAGE_SIZE}
          paginationPageSizeSelector={TABLE_SETTINGS.PAGE_SIZE_OPTIONS}
          animateRows={true}
          enableCellTextSelection={true}
          rowSelection="multiple"
          getRowId={getRowId}
          quickFilterText={quickFilterText}
          quickFilterMatcher={quickFilterMatcher || defaultQuickFilterMatcher}
          suppressCellFocus={true}
          rowHeight={rowHeight}
          headerHeight={40}
          overlayNoRowsTemplate={noDataMessage}
          overlayLoadingTemplate="Yükleniyor..."
        />
      </div>
    </div>
  );
}
