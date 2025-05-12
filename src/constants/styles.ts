// Genel boyutlar
export const SIZES = {
  SPINNER: {
    SM: "h-4 w-4",
    DEFAULT: "h-8 w-8",
    LG: "h-12 w-12",
    XL: "h-16 w-16",
  },
  MAP: {
    HEIGHT: "450px",
  },
  TABLE: {
    HEIGHT: "500px",
  },
};

// Animasyon
export const ANIMATION_DELAYS = {
  NONE: "0ms",
  SHORT: "150ms",
  MEDIUM: "300ms",
  LONG: "500ms",
};

export const COMMON_CLASSES = {
  CONTAINER: "container max-w-screen-xl mx-auto px-4",
  CARD: "border border-slate-200 rounded-lg shadow-sm",
  SECTION: "py-8",
  TABLE: {
    WRAPPER:
      "w-full h-[500px] ag-theme-alpine rounded-md border border-gray-200 shadow-sm overflow-hidden",
    SEARCH_CONTAINER:
      "mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2",
    SEARCH_GROUP: "flex flex-wrap w-full md:w-auto gap-2 items-center",
    SEARCH_INPUT: "py-2 pl-9 pr-4 border border-gray-300 rounded w-full",
    SEARCH_ICON: "absolute left-3 top-3 text-gray-400",
    FILTER_BUTTON:
      "px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded flex items-center text-sm font-medium",
    TOTAL_COUNT:
      "text-sm text-gray-600 w-full md:w-auto text-left md:text-right pr-2",
  },
};

export const STATUS_STYLES = {
  ACTIVE: "bg-green-600 text-white",
  INACTIVE: "bg-red-100 text-red-800",
};
