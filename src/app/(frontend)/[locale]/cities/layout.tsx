import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Cities - Old City",
  description: "Discover amazing cities and destinations with Old City Tour Agency",
};

type Props = {
  children: ReactNode;
};

export default function CitiesLayout({ children }: Props) {
  return <>{children}</>;
} 