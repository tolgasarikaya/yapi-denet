// src/components/turkey-map/MapComponent.tsx
"use client";

import { useState, useCallback, memo, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FeatureCollection, Feature, Geometry } from "geojson";
import { Layer, PathOptions } from "leaflet";
import { SIZES } from "@/constants/styles";
import {
  TURKEY_BOUNDS,
  CENTER,
  ZOOM,
  MAP_STYLES,
  MAP_OPTIONS,
} from "@/constants/mapSettings";
import {
  calculateProvinceStyle,
  createTooltipContent,
  filterGeoJsonPolygons,
  extractProvinceId,
} from "@/lib/map";

import "leaflet/dist/leaflet.css";
import styles from "./MapComponent.module.css";
import { MapControls } from "./MapControls";
import { cn } from "@/lib/utils";

// Tipler
interface MouseEvent {
  target: { setStyle: (style: PathOptions) => void };
}
interface MapProps {
  geoJsonData: FeatureCollection | null;
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null, id?: string) => void;
  className?: string;
}

// Bileşeni memo ile sarmak performansı iyileştirir
const MapComponent = memo(function MapComponent({
  geoJsonData,
  selectedProvince,
  setSelectedProvince,
  className,
}: MapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  // Sadece poligonları filtrele
  const filteredData = useMemo(
    () => filterGeoJsonPolygons(geoJsonData),
    [geoJsonData]
  );

  // İl stili
  const getProvinceStyle = useCallback(
    (feature?: Feature<Geometry>): PathOptions => {
      if (!feature?.properties?.name) {
        return MAP_STYLES.BASE;
      }

      const name = feature.properties.name as string;
      const isSelected = selectedProvince === name;
      const isHovered = hoveredProvince === name;

      return calculateProvinceStyle(isSelected, isHovered);
    },
    [selectedProvince, hoveredProvince]
  );

  // İl tıklama olayını optimize et
  const handleProvinceClick = useCallback(
    (name: string, id?: string) => {
      setSelectedProvince(name, id);
    },
    [setSelectedProvince]
  );

  // Üzerine gelme olayını optimize et
  const handleProvinceMouseOver = useCallback((e: MouseEvent, name: string) => {
    setHoveredProvince(name);
    e.target.setStyle(MAP_STYLES.HOVER);
  }, []);

  // Üzerinden ayrılma olayını optimize et
  const handleProvinceMouseOut = useCallback(
    (e: MouseEvent, name: string) => {
      setHoveredProvince(null);
      if (name !== selectedProvince) {
        e.target.setStyle(MAP_STYLES.BASE);
      }
    },
    [selectedProvince]
  );

  // İl etkileşimleri
  const handleFeature = useCallback(
    (feature: Feature<Geometry> | undefined, layer: Layer) => {
      if (!feature?.properties?.name) return;

      const name = feature.properties.name as string;
      const id = extractProvinceId(feature);

      layer.on({
        click: () => handleProvinceClick(name, id),
        mouseover: (e) => handleProvinceMouseOver(e as MouseEvent, name),
        mouseout: (e) => handleProvinceMouseOut(e as MouseEvent, name),
      });

      layer.bindTooltip(createTooltipContent(name), {
        permanent: false,
        direction: "center",
        className: "province-tooltip",
      });
    },
    [handleProvinceClick, handleProvinceMouseOver, handleProvinceMouseOut]
  );

  return (
    <div
      className={cn(styles.mapRoot, className)}
      role="region"
      aria-label="Türkiye İlleri Haritası"
      style={{ height: SIZES.MAP.HEIGHT }}
    >
      <MapContainer
        center={CENTER}
        zoom={ZOOM.DEFAULT}
        className={styles.mapContainer}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
        minZoom={ZOOM.MIN}
        maxZoom={ZOOM.MAX}
        maxBounds={TURKEY_BOUNDS}
        maxBoundsViscosity={1.0}
        preferCanvas={true}
      >
        <TileLayer
          attribution={MAP_OPTIONS.ATTRIBUTION}
          url={MAP_OPTIONS.TILE_LAYER}
        />
        <MapControls />
        {filteredData && (
          <GeoJSON
            key={`${selectedProvince}-${hoveredProvince}`}
            data={filteredData}
            style={getProvinceStyle}
            onEachFeature={handleFeature}
          />
        )}
      </MapContainer>
    </div>
  );
});

export default MapComponent;
