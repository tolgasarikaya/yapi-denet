"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { TABLE_TYPES, ICON_MAP } from "@/constants/routes";

export default function TableNavigation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const typeParam = searchParams.get("type");
  const [activeTab, setActiveTab] = useState(typeParam || TABLE_TYPES[0].id);

  const updateUrl = useCallback(
    (tabType: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", tabType);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const handleTabChange = useCallback(
    (tabType: string) => {
      setActiveTab(tabType);
      updateUrl(tabType);
    },
    [updateUrl]
  );

  useEffect(() => {
    if (typeParam && typeParam !== activeTab) {
      setActiveTab(typeParam);
    }
  }, [typeParam, activeTab]);

  return (
    <div className="bg-gray-50 rounded-t-lg overflow-hidden w-full">
      <div className="w-full overflow-x-auto">
        <div className="flex w-full" style={{ minWidth: "max-content" }}>
          {TABLE_TYPES.map((type) => {
            const Icon = ICON_MAP[type.icon];
            return (
              <button
                key={type.id}
                onClick={() => handleTabChange(type.id)}
                className={`flex items-center justify-center gap-1 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 flex-1 cursor-pointer ${
                  activeTab === type.id
                    ? "border-orange-600 text-orange-500 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} className="min-w-4" />
                <span className="truncate text-black">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-0.5 bg-gray-200"></div>
    </div>
  );
}
