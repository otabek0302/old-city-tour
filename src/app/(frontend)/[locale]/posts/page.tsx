import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";
import PostsPageClient from "./page.client";

async function getPosts(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (_error) {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: null,
  });
}

const PostsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const posts = await getPosts(locale || "en");

  return <PostsPageClient posts={posts} />;
};

export default PostsPage;
