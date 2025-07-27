import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Old City",
  description: "Learn more about Old City Tour Agency and our mission to provide exceptional travel experiences",
};

type Props = {
  children: ReactNode;
};

export default function AboutUsLayout({ children }: Props) {
  return <>{children}</>;
}
