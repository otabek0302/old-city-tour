import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from '@/components/ui/not-completed'

async function getReviews(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/reviews?locale=${locale}`, { cache: "no-store" });
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

const ReviewsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const reviews = await getReviews(locale || "en");

  if (!reviews || !reviews.length) {
    return <NotCompleted
      title="Reviews Not Available"
      message="Customer reviews are currently not available. Please contact us for assistance."
    />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: { id: number; name: string; rating: number; comment: string; tour?: { title: string; slug: string }; slug?: string }) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{review.comment}</p>
            
            {review.tour && (
              <div className="text-sm text-gray-500">
                <span>Review for: </span>
                <a 
                  href={`/tours/${review.tour.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {review.tour.title}
                </a>
              </div>
            )}
            
            {review.slug && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={`/reviews/${review.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Read Full Review →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage; 