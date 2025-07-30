import { Metadata } from 'next'

import Link from 'next/link'
import Image from 'next/image'

import { generateMeta } from '@/utilities/generateMeta'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

async function getPost(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts?where[slug][equals]=${slug}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);
  
  return generateMeta({
    doc: post,
    collection: 'posts',
  })
}

const PostPage = async ({ params }: { params: Promise<{ slug: string; locale: string }> }) => {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);

  if (!post) return null;

  return (
    <section className="py-6">
      <div className="container">
        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-copy text-2xl md:text-4xl font-bold leading-normal mb-4">{post.title}</h1>
            {post.publishedAt && (
              <time className="text-copy-light text-sm font-normal">
                Published on {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            )}
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <div className="relative h-96 border border-border rounded-2xl overflow-hidden">
                <Image
                  src={post.image.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          )}

          {/* Post Content */}
          {post.content && post.content.length > 0 && (
            <Card className="bg-background border border-border rounded-2xl mb-8">
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  {post.content.map((contentItem: { text: string; id?: string }, index: number) => (
                    <p key={index} className="text-copy-light text-sm font-normal leading-tight mb-4">
                      {contentItem.text}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gallery */}
          {post.gallery && post.gallery.length > 0 && (
            <div className="mb-8">
              <h2 className="text-copy text-lg md:text-2xl font-bold leading-normal mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.gallery.map((galleryItem: { image: { url: string }; id?: string }, index: number) => (
                  <div key={index} className="relative h-48 border border-border rounded-2xl overflow-hidden">
                    <Image
                      src={galleryItem.image.url}
                      alt={`${post.title} - Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Posts */}
          <div className="pt-8 border-t border-border">
            <Button variant="link" size="sm" className="text-primary hover:text-primary-dark p-0 h-auto">
              <Link href="/posts">
                ← Back to All Posts
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PostPage; 