import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { NotCompleted } from '@/components/ui/not-completed'

async function getHotels(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/hotels?locale=${locale}`, { cache: "no-store" });
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

const HotelsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const hotels = await getHotels(locale || "en");

  if (!hotels || !hotels.length) {
    return <NotCompleted
      title="Hotels Not Available"
      message="Hotel listings are currently not available. Please contact us for assistance."
    />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel: { id: number; name: string; description?: string; address?: string; rating?: string; images?: Array<{ image: { url: string } }> }) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {hotel.images?.[0]?.image && (
              <div className="h-48 bg-gray-200">
                <img
                  src={hotel.images[0].image.url}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <p className="text-gray-600 mb-4">{hotel.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{hotel.address}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < parseInt(hotel.rating || '0') ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsPage; 