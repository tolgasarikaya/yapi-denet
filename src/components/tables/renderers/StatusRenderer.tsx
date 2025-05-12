import { StatusData, StatusRendererParams } from "@/types/table";
import { STATUS_STYLES } from "@/constants/styles";

// Çalışma durumu için cell renderer
export function WorkingStatusRenderer<T extends StatusData>(
  params: StatusRendererParams<T>
) {
  const isWorking = params.data.working;

  return (
    <div
      className={`w-full h-11 flex items-center justify-center rounded text-xs font-medium ${
        isWorking ? STATUS_STYLES.ACTIVE : STATUS_STYLES.INACTIVE
      }`}
    >
      {isWorking ? "Çalışıyor" : "Çalışmıyor"}
    </div>
  );
}

// boolean => text
export function workingStatusValueGetter<T extends StatusData>(params: {
  data: T | undefined;
}) {
  if (!params.data) return "";
  return params.data.working ? "Çalışıyor" : "Çalışmıyor";
}
