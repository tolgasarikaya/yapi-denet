// src/constants/tableSettings.ts
/**
 * Tablolar için sayfalama ve boyut ayarları
 */
export const TABLE_SETTINGS = {
  /**
   * Sayfa başına varsayılan öğe sayısı
   */
  DEFAULT_PAGE_SIZE: 10,

  /**
   * Kullanıcının seçebileceği sayfa boyutu seçenekleri
   */
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],

  /**
   * Satır yüksekliği (piksel)
   */
  ROW_HEIGHT: 48,

  /**
   * Başlık yüksekliği (piksel)
   */
  HEADER_HEIGHT: 40,
};

/**
 * Filtreleme seçenekleri
 */
export const FILTER_OPTIONS = {
  /**
   * Metin filtreleme seçenekleri
   */
  TEXT: [
    "contains",
    "notContains",
    "equals",
    "notEqual",
    "startsWith",
    "endsWith",
  ],

  /**
   * Filtreleme gecikme süresi (ms)
   */
  DEBOUNCE_MS: 200,
};

/**
 * Durum filtreleme için sabit değerler
 */
export const STATUS_FILTER_PARAMS = {
  filterOptions: FILTER_OPTIONS.TEXT,
  debounceMs: FILTER_OPTIONS.DEBOUNCE_MS,
  caseSensitive: false,
  suppressAndOrCondition: true,
};
