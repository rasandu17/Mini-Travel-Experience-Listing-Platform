import Link from 'next/link';

export default function ListingCard({ listing }) {
  // Format the date if valid, else use current
  let dateStr = '';
  try {
    const d = new Date(listing.createdAt || Date.now());
    dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    dateStr = 'May 13, 2025';
  }

  // Fallback image if missing
  const defaultImage = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

  return (
    <Link href={`/listing/${listing._id}`} className="text-decoration-none">
      <div className="listing-card-custom mb-3">
        <img
          src={listing.imageUrl || defaultImage}
          alt={listing.title}
          className="listing-image"
        />
        <h3 className="listing-title mt-3 mb-1 line-clamp-2">
          {listing.title}
        </h3>
        <p className="listing-date mb-0">
          {dateStr}
        </p>

        <style jsx>{`
          .listing-card-custom {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          
          .listing-card-custom:hover .listing-image {
            opacity: 0.95;
            transform: scale(1.01);
          }
          
          .listing-image {
            width: 100%;
            height: auto;
            border-radius: 12px;
            object-fit: cover;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          
          .listing-title {
            color: #413224;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 1.15rem;
            font-weight: 800; /* made extra bold to match image */
            line-height: 1.4;
          }
          
          .listing-date {
            color: #8c7e71;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.8rem;
            font-weight: 600;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </Link>
  );
}
