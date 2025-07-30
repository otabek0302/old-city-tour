import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";

async function getHotel(slug: string, locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/hotels?where[slug][equals]=${slug}&locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (_error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const hotel = await getHotel(slug, locale);

  return generateMeta({
    doc: hotel,
    collection: "hotels",
  });
}

const HotelPage = async ({ params }: { params: Promise<{ slug: string; locale: string }> }) => {
  const { slug, locale } = await params;
  const hotel = await getHotel(slug, locale);

  if (!hotel) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hotel Images */}
        {hotel.images && hotel.images.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotel.images.map((imageItem: { image: { url: string } }, index: number) => (
                <div key={index} className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={imageItem.image.url} alt={`${hotel.name} - Image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hotel Info */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold">{hotel.name}</h1>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < parseInt(hotel.rating || "0") ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-6">{hotel.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2">
                {hotel.address && (
                  <p>
                    <strong>Address:</strong> {hotel.address}
                  </p>
                )}
                {hotel.phone && (
                  <p>
                    <strong>Phone:</strong> {hotel.phone}
                  </p>
                )}
                {hotel.website && (
                  <p>
                    <strong>Website:</strong>
                    <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
            </div>

            {hotel.policies && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Hotel Policies</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Check-in:</strong> {hotel.policies.checkIn}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {hotel.policies.checkOut}
                  </p>
                  {hotel.policies.cancellation && (
                    <p>
                      <strong>Cancellation:</strong> {hotel.policies.cancellation}
                    </p>
                  )}
                  {hotel.policies.pet && (
                    <p>
                      <strong>Pet Policy:</strong> {hotel.policies.pet}
                    </p>
                  )}
                  {hotel.policies.children && (
                    <p>
                      <strong>Children:</strong> {hotel.policies.children}
                    </p>
                  )}
                  {hotel.policies.payment && (
                    <p>
                      <strong>Payment:</strong> {hotel.policies.payment}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hotel Features */}
        {hotel.features && hotel.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Hotel Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.features.map((feature: { name: string }, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-700">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPage;
