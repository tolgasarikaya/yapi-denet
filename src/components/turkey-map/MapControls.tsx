// src/components/turkey-map/MapControls.tsx
import { ZoomControl, AttributionControl } from "react-leaflet";

export function MapControls() {
  return (
    <>
      <ZoomControl position="topright" />
      <AttributionControl position="bottomright" prefix={false} />
    </>
  );
}
