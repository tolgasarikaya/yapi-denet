// Tablolar için sayfalama ve boyut ayarları
export const TABLE_SETTINGS = {
  DEFAULT_PAGE_SIZE: 10,

  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],

  ROW_HEIGHT: 48,

  HEADER_HEIGHT: 40,
};

export const FILTER_OPTIONS = {
  //Metin filtreleme
  TEXT: [
    "contains",
    "notContains",
    "equals",
    "notEqual",
    "startsWith",
    "endsWith",
  ],

  DEBOUNCE_MS: 200,
};

export const STATUS_FILTER_PARAMS = {
  filterOptions: FILTER_OPTIONS.TEXT,
  debounceMs: FILTER_OPTIONS.DEBOUNCE_MS,
  caseSensitive: false,
  suppressAndOrCondition: true,
};
