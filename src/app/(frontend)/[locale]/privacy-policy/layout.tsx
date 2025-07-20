import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Old City",
  description: "Privacy Policy for Old City Tour Agency",
};

type Props = {
  children: ReactNode;
};

export default function PrivacyPolicyLayout({ children }: Props) {
  return <>{children}</>;
} 