"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/i18n";

interface Post {
  id: number;
  title: string;
  content?: Array<{ text: string }>;
  publishedAt?: string;
  slug?: string;
  image?: { url: string };
}

interface PostsPageClientProps {
  posts: Post[];
}

const PostsPageClient = ({ posts }: PostsPageClientProps) => {
  const { t } = useTranslation();

  if (!posts || posts.length === 0) {
    return (
      <section className="py-6">
        <div className="container">
          <div className="mb-6 border-b border-copy-light pb-6">
            <h2 className="text-copy text-3xl font-bold leading-tight mb-4">{t("pages.posts.title")}</h2>
            <p className="text-copy-light text-sm font-normal leading-tight">{t("pages.posts.subtitle")}</p>
          </div>
          <div className="text-center py-12">
            <p className="text-copy-light text-lg">{t("pages.posts.noPosts")}</p>
            <p className="text-copy-light text-sm mt-2">{t("pages.posts.contactForAssistance")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="container">
        <div className="mb-6 border-b border-copy-light pb-6">
          <h2 className="text-copy text-3xl font-bold leading-tight mb-4">{t("pages.posts.title")}</h2>
          <p className="text-copy-light text-sm font-normal leading-tight">{t("pages.posts.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="relative h-48">
                  <Image src={post.image.url} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
              )}
              <CardContent className="p-6">
                <h2 className="text-copy text-lg font-semibold mb-3 line-clamp-2">{post.title}</h2>
                {post.content?.[0]?.text && <p className="text-copy-light text-sm font-normal leading-tight mb-4 line-clamp-3">{post.content[0].text}</p>}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  {post.publishedAt && (
                    <span className="text-copy-light text-xs font-normal">
                      {t("pages.posts.publishedOn")} {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  {post.slug && (
                    <Button variant="link" size="sm" className="text-primary hover:text-primary-dark p-0 h-auto">
                      <Link href={`/posts/${post.slug}`}>{t("pages.posts.readFullPost")} →</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostsPageClient;
