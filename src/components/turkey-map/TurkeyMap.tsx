// src/components/turkey-map/TurkeyMap.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import useGeoData from "../../hooks/useGeoData";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { formatProvinceId } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { TABLE_TYPES } from "@/constants/routes";
import { MAP_OPTIONS } from "@/constants/mapSettings";

// Seçilen il için tip tanımı
interface SelectedProvinceData {
  name: string;
  id: string;
}

// Ortak yükleme bileşeni
const LoadingMap = () => (
  <div
    className="w-full mx-auto overflow-hidden rounded-md border border-border/30 bg-muted/10"
    style={{ height: MAP_OPTIONS.HEIGHT }}
  >
    <LoadingSpinner
      className="h-full bg-gradient-to-b from-transparent to-muted/5"
      spinnerClassName="border-t-4 border-b-4 border-primary shadow-xl"
      message="Türkiye haritası yükleniyor..."
      textClassName="mt-3 font-medium opacity-80"
      spinnerSize="lg"
    />
  </div>
);

const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: LoadingMap,
});

export default function TurkeyMap() {
  const { data: geoJsonData, isLoading, error } = useGeoData();
  const [selectedProvince, setSelectedProvince] =
    useState<SelectedProvinceData | null>(null);

  if (isLoading) {
    return <LoadingMap />;
  }

  if (error) {
    return (
      <div className="w-full mx-auto">
        <ErrorMessage error={error} title="Harita verileri yüklenemedi" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-4">
      <MapWithNoSSR
        geoJsonData={geoJsonData}
        selectedProvince={selectedProvince?.name || null}
        setSelectedProvince={(name, id) => {
          // Her iki değer de varsa, seçimi güncelle
          if (name && id) {
            setSelectedProvince({ name, id });
          } else {
            setSelectedProvince(null);
          }
        }}
      />

      <Card className="bg-slate-800 shadow-sm ">
        <CardContent className="p-4 min-h-[64px] flex items-center justify-center">
          {selectedProvince ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
              <div className="flex items-center gap-2 justify-center text-white">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="font-medium">{selectedProvince.name}</span>
                <span className="text-sm text-muted-foreground">seçildi</span>
              </div>
              <Button
                variant="default"
                size="sm"
                className="gap-1 w-full sm:w-auto bg-orange-500 hover:bg-orange-600"
                asChild
              >
                {/* URL'de sadece plaka kodunu kullan */}
                <Link
                  href={`${ROUTES.PROVINCE_DETAILS(
                    formatProvinceId(selectedProvince.id)
                  )}?type=${TABLE_TYPES[0].id}`}
                >
                  Detayları Gör
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-white">
              <MapPin className="h-5 w-5 text-orange-500" />
              <span>Lütfen haritadan bir il seçin</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
