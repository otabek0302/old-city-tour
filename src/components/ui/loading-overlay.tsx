"use client";

import { Loader2 } from "lucide-react";
import { useLoading } from "@/providers/loading";
import { useTranslation } from "@/providers/i18n";

export const LoadingOverlay = () => {
  const { isLoading, loadingMessage } = useLoading();
  const { t } = useTranslation();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center space-y-4 min-w-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {loadingMessage || t("common.loading")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {t("common.pleaseWait")}
          </p>
        </div>
      </div>
    </div>
  );
}; 