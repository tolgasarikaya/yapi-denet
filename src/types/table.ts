import {
  ColDef,
  ICellRendererParams,
  GetRowIdParams,
} from "@ag-grid-community/core";

// Tüm tablolar için temel type
export interface BaseTableProps<T> {
  columnDefs: ColDef<T>[];
  rowData: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  title: string;
  totalCount?: number;
  noDataMessage: string;
  rowHeight?: number;
  defaultColDef?: ColDef<T>;
  getRowId?: (params: GetRowIdParams) => string;
  quickFilterMatcher?: (parts: string[], text: string) => boolean;
}

export interface StatusData {
  working: boolean;
}

export interface StatusRendererParams<T extends StatusData>
  extends ICellRendererParams {
  data: T;
  value: boolean;
}

export interface ContactData {
  phone: string;
  address?: string;
}

export interface PersonData {
  personName: string;
  personSurName: string;
  titleName: string;
  taskName: string;
  occupationalRegistrationNumber?: string;
}

export interface ValueFormatters {
  dateFormatter: (value: number | string) => string;
  phoneFormatter: (value: string) => string;
  areaFormatter: (value: number) => string;
}
