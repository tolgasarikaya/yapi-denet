import { useState, useEffect } from "react";
import { FeatureCollection } from "geojson";
import { CACHE_TIMES, RETRY_COUNTS } from "@/constants/api";

export default function useGeoData(url: string = "/turkey-provinces.json") {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let cacheTimeout: NodeJS.Timeout;

    async function loadGeoData() {
      try {
        setIsLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const jsonData = await response.json();

        if (isMounted) {
          setData(jsonData);
          setError(null);

          cacheTimeout = setTimeout(() => {
            if (isMounted) setData(null);
          }, CACHE_TIMES.GEO_DATA);
        }
      } catch (err) {
        console.error("Error loading GeoJSON data:", err);

        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");

          if (retryCount < RETRY_COUNTS.GEO_DATA) {
            setRetryCount((prevCount) => prevCount + 1);
            setTimeout(loadGeoData, 1000);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadGeoData();

    return () => {
      isMounted = false;
      clearTimeout(cacheTimeout);
    };
  }, [url, retryCount]);

  return { data, isLoading, error };
}
