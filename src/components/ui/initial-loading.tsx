"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/providers/i18n";

export const InitialLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Show initial loading for a shorter time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("common.initializing")}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {t("common.pleaseWait")}
          </p>
        </div>
      </div>
    </div>
  );
}; 