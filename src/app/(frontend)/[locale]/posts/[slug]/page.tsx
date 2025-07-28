import { Metadata } from 'next'
import Link from 'next/link'
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from '@/components/ui/not-completed'

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

  if (!post) {
    return <NotCompleted
      title="Post Not Found"
      message="This blog post is not available. Please contact us for assistance."
    />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time className="text-gray-500">
              Published on {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        {post.content && post.content.length > 0 && (
          <div className="prose prose-lg max-w-none mb-8">
            {post.content.map((contentItem: { text: string; id?: string }, index: number) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {contentItem.text}
              </p>
            ))}
          </div>
        )}

        {/* Gallery */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.gallery.map((galleryItem: { image: { url: string }; id?: string }, index: number) => (
                <div key={index} className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={galleryItem.image.url}
                    alt={`${post.title} - Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Posts */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to All Posts
          </Link>
        </div>
      </article>
    </div>
  );
};

export default PostPage; 