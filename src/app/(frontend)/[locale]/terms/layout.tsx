import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Old City",
  description: "Terms of Service for Old City Tour Agency",
};

type Props = {
  children: ReactNode;
};

export default function TermsLayout({ children }: Props) {
  return <>{children}</>;
} 