import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Tours - Old City",
  description: "Discover amazing tours and travel experiences with Old City Tour Agency",
};

type Props = {
  children: ReactNode;
};

export default function ToursLayout({ children }: Props) {
  return <>{children}</>;
} 