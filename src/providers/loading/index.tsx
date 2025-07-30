"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const startLoading = useCallback((message?: string) => {
    setIsLoading(true);
    if (message) {
      setLoadingMessage(message);
    }
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage("");
  }, []);

  const value: LoadingContextType = {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
    loadingMessage,
    setLoadingMessage,
  };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}; 