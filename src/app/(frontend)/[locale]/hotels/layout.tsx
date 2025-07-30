import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: null,
  });
}

export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 