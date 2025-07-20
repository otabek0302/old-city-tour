import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Old City",
  description: "Get in touch with Old City Tour Agency for any questions about our tours and services",
};

type Props = {
  children: ReactNode;
};

export default function ContactUsLayout({ children }: Props) {
  return <>{children}</>;
} 