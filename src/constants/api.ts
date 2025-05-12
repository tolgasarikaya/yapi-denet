// API zaman aşımı
export const API_TIMEOUT = 10000;

// API headers
export const API_HEADERS = {
  "Content-Type": "application/json",
};

// API stale
export const CACHE_TIMES = {
  DEFAULT: 5 * 60 * 1000,
  STATISTICS: 5 * 60 * 1000,
  GEO_DATA: 5 * 60 * 1000,
  ORGANIZATIONS: 5 * 60 * 1000,
  LABORATORIES: 5 * 60 * 1000,
  AUDITORS: 5 * 60 * 1000,
  ENGINEERS: 5 * 60 * 1000,
  CONTROL_WORKERS: 5 * 60 * 1000,
  SITE_SUPERVISORS: 5 * 60 * 1000,
  DISTRIBUTION: 5 * 60 * 1000,
};

export const RETRY_COUNTS = {
  DEFAULT: 2,
  STATISTICS: 2,
  GEO_DATA: 2,
  ORGANIZATIONS: 2,
  LABORATORIES: 2,
  AUDITORS: 2,
};

// Tablolar
export const ENTITY_NAMES = {
  STATISTICS: "İstatistik",
  BUILDING_INSPECTOR: "Yapı Denetim Kurumu",
  LABORATORY: "Laboratuvar",
  AUDITOR: "Denetçi",
  YKE_ENGINEER: "YKE Mimar/Mühendis",
  CONTROL_WORKER: "Yardımcı Kontrol Elemanı",
  SITE_SUPERVISOR: "Şantiye Şefi",
  DISTRIBUTION: "Dağıtım Listesi",
};
