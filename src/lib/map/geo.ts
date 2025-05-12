import { FeatureCollection, Feature, Geometry } from "geojson";

export function filterGeoJsonPolygons(
  geoJsonData: FeatureCollection | null
): FeatureCollection | null {
  if (!geoJsonData || !geoJsonData.features) return null;

  try {
    return {
      type: "FeatureCollection",
      features: geoJsonData.features.filter(
        (f) =>
          f.geometry && ["Polygon", "MultiPolygon"].includes(f.geometry.type)
      ),
    } as FeatureCollection;
  } catch (error) {
    console.error("Error filtering GeoJSON data:", error);
    return null;
  }
}

export function extractProvinceId(
  feature: Feature<Geometry> | undefined
): string | undefined {
  if (!feature || !feature.properties) return undefined;

  const isoCode = feature.properties["ISO3166-2"] as string | undefined;
  if (isoCode?.startsWith("TR-")) {
    return isoCode.substring(3);
  }
  return undefined;
}
