import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Old City",
  description: "Learn more about Old City and our mission to provide exceptional travel experiences.",
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
