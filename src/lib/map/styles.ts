// src/lib/map/styles.ts
import { PathOptions } from "leaflet";
import { MAP_STYLES } from "@/constants/mapSettings";

export function getProvinceOpacity(
  isSelected: boolean,
  isHovered: boolean
): number {
  if (isSelected) return 0.75;
  if (isHovered) return 0.65;
  return 0.5;
}

export function calculateProvinceStyle(
  isSelected: boolean,
  isHovered: boolean
): PathOptions {
  const opacity = getProvinceOpacity(isSelected, isHovered);

  if (isSelected) return { ...MAP_STYLES.SELECTED, fillOpacity: opacity };
  if (isHovered) return { ...MAP_STYLES.HOVER, fillOpacity: opacity };
  return { ...MAP_STYLES.BASE, fillOpacity: opacity };
}
