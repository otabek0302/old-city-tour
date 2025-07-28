import { Metadata } from 'next'
import Link from 'next/link'
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from '@/components/ui/not-completed'

async function getReview(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/reviews?where[slug][equals]=${slug}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const review = await getReview(slug, locale);
  
  return generateMeta({
    doc: review,
    collection: 'reviews',
  })
}

const ReviewPage = async ({ params }: { params: Promise<{ slug: string; locale: string }> }) => {
  const { slug, locale } = await params;
  const review = await getReview(slug, locale);

  if (!review) {
    return <NotCompleted
      title="Review Not Found"
      message="This review is not available. Please contact us for assistance."
    />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <article className="bg-white rounded-lg shadow-lg p-8">
          {/* Review Header */}
          <header className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Review by {review.name}</h1>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-gray-500">
              <time>
                {new Date(review.createdAt).toLocaleDateString()}
              </time>
            </div>
          </header>

          {/* Review Content */}
          <div className="mb-8">
            <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-6">
              &ldquo;{review.comment}&rdquo;
            </blockquote>
          </div>

          {/* Tour Information */}
          {review.tour && typeof review.tour === 'object' && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Review for Tour</h2>
              <div className="flex items-center space-x-4">
                {review.tour.images?.[0]?.image && (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={review.tour.images[0].image.url}
                      alt={review.tour.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium">{review.tour.title}</h3>
                  <p className="text-gray-600">{review.tour.description}</p>
                  <Link
                    href={`/tours/${review.tour.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Tour Details →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Rating Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Rating Details</h2>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-yellow-500">
                {review.rating}/5
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Back to Reviews */}
          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/reviews"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Reviews
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ReviewPage; 