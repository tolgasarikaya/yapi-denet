"use client";

import TableNavigation from "@/components/provinces/TableNavigation";
import StatisticsTable from "@/components/tables/StatisticsTable";
import { cn, getProvinceNameById } from "@/lib/utils";
import { useSearchParams, useParams } from "next/navigation";
import { TABLE_TYPES } from "@/constants/routes";
import { COMMON_CLASSES } from "@/constants/styles";
import AuditorsTable from "@/components/tables/AuditorsTable";
import LabTable from "@/components/tables/LabTable";
import InspectionOrgTable from "@/components/tables/InspectionOrgTable";
import YKEEngineersTable from "@/components/tables/YKEEngineersTable";
import ControlWorkersTable from "@/components/tables/ControlWorkersTable";
import SiteSupervisorsTable from "@/components/tables/SiteSupervisorsTable";
import DistributionListTable from "@/components/tables/DistributionListTable";

export default function ProvinceDetailPage() {
  const params = useParams();
  const id = params.slug as string;

  const searchParams = useSearchParams();
  const tableType = searchParams.get("type") || TABLE_TYPES[0].id;

  const provinceName = getProvinceNameById(id) || `İl ${id}`;

  // Aktif tablo içeriği
  const renderTableContent = () => {
    switch (tableType) {
      case "statistics":
        return <StatisticsTable provinceId={id} />;
      case "inspection-orgs":
        return <InspectionOrgTable provinceId={id} />;
      case "labs":
        return <LabTable provinceId={id} />;
      case "inspectors":
        return <AuditorsTable provinceId={id} />;
      case "engineers":
        return <YKEEngineersTable provinceId={id} />;
      case "assistants":
        return <ControlWorkersTable provinceId={id} />;
      case "site-chiefs":
        return <SiteSupervisorsTable provinceId={id} />;
      case "distribution":
        return <DistributionListTable provinceId={id} />;
      default:
        return (
          <div className="p-4 text-center text-slate-500">
            Lütfen görüntülemek istediğiniz tablo türünü seçin
          </div>
        );
    }
  };

  return (
    <div className={COMMON_CLASSES.CONTAINER}>
      <div className={cn(COMMON_CLASSES.CARD, "my-8 bg-white")}>
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center">
            {provinceName} İli Detay Bilgileri
          </h1>
        </div>

        <TableNavigation />

        <div className="p-0 bg-white rounded-b-lg">{renderTableContent()}</div>
      </div>
    </div>
  );
}
