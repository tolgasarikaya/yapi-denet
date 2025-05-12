import { SIZES } from "@/constants/styles";

// Harita sınırları
export const TURKEY_BOUNDS: [[number, number], [number, number]] = [
  [35.5, 25.5],
  [42.5, 45],
];

// Merkez noktası
export const CENTER: [number, number] = [39, 35];

// Zoom seviyeleri
export const ZOOM = {
  DEFAULT: 6,
  MIN: 5,
  MAX: 10,
};

// Harita renkleri
export const MAP_COLORS = {
  DEFAULT: "#94a3b8",
  HOVER: "#ff8904",
  SELECTED: "#ca3500",
  BORDER: "#ffffff",
  BACKGROUND: "#f8fafc",
};

// Harita stil tanımları
export const MAP_STYLES = {
  BASE: {
    fillColor: MAP_COLORS.DEFAULT,
    weight: 1,
    opacity: 1,
    color: MAP_COLORS.BORDER,
    fillOpacity: 0.5,
  },
  SELECTED: {
    fillColor: MAP_COLORS.SELECTED,
    weight: 1.5,
    opacity: 1,
    color: MAP_COLORS.BORDER,
    fillOpacity: 0.7,
  },
  HOVER: {
    fillColor: MAP_COLORS.HOVER,
    weight: 1.5,
    opacity: 1,
    color: MAP_COLORS.BORDER,
    fillOpacity: 0.6,
  },
};

// Haritalama seçenekleri
export const MAP_OPTIONS = {
  HEIGHT: SIZES.MAP.HEIGHT,
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  TILE_LAYER: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
};
