"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from "@clerk/localizations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CACHE_TIMES, RETRY_COUNTS } from "@/constants/api";
import Header from "@/components/layout/Header";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: CACHE_TIMES.DEFAULT,
            retry: RETRY_COUNTS.DEFAULT,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ClerkProvider localization={trTR}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="flex-1">{children}</main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
