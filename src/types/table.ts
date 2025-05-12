// src/types/table.ts
import {
  ColDef,
  ICellRendererParams,
  GetRowIdParams,
} from "@ag-grid-community/core";

/**
 * Tüm tablolar için temel özellikler
 */
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

/**
 * Durumu olan veri tiplerinin temel arayüzü (çalışanlar, mühendisler vb.)
 */
export interface StatusData {
  working: boolean;
}

/**
 * Durum sütunu için hücre oluşturucu parametreleri
 */
export interface StatusRendererParams<T extends StatusData>
  extends ICellRendererParams {
  data: T;
  value: boolean;
}

/**
 * İletişim bilgisi olan veri tiplerinin temel arayüzü
 */
export interface ContactData {
  phone: string;
  address?: string;
}

/**
 * Kişi bilgisi olan veri tiplerinin temel arayüzü
 */
export interface PersonData {
  personName: string;
  personSurName: string;
  titleName: string;
  taskName: string;
  occupationalRegistrationNumber?: string;
}

/**
 * Formatlayıcı fonksiyonlar için tip tanımı
 */
export interface ValueFormatters {
  dateFormatter: (value: number | string) => string;
  phoneFormatter: (value: string) => string;
  areaFormatter: (value: number) => string;
}
