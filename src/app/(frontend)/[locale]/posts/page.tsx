import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from '@/components/ui/not-completed'

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
  })
}

const PostsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const posts = await getPosts(locale || "en");

  if (!posts || !posts.length) {
    return <NotCompleted
      title="Posts Not Available"
      message="Blog posts are currently not available. Please contact us for assistance."
    />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: { id: number; title: string; content?: Array<{ text: string }>; publishedAt?: string; slug?: string; image?: { url: string } }) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.image && (
              <div className="h-48 bg-gray-200">
                <img
                  src={post.image.url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              {post.content?.[0]?.text && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content[0].text}
                </p>
              )}
              <div className="flex justify-between items-center">
                {post.publishedAt && (
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                )}
                {post.slug && (
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostsPage; 