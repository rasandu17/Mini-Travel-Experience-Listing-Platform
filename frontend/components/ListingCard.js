import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function ListingCard({ listing }) {
  // Format the relative time
  let timeAgo = '';
  try {
    const d = new Date(listing.createdAt || Date.now());
    timeAgo = formatDistanceToNow(d, { addSuffix: true });
    // Make sure it starts with 'Posted' if not already
    if (!timeAgo.startsWith('Posted')) {
      timeAgo = `Posted ${timeAgo}`;
    }
  } catch (e) {
    timeAgo = 'Posted recently';
  }

  // Fallback image if missing
  const defaultImage = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

  return (
    <Link href={`/listing/${listing._id}`} className="text-decoration-none">
      <div className="listing-card-custom mb-3">
        <div className="image-wrapper">
          <img
            src={listing.imageUrl || defaultImage}
            alt={listing.title}
            className="listing-image"
          />
          <div className="location-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {listing.location || 'Unknown'}
          </div>
        </div>
        
        <h3 className="listing-title mt-3 mb-1 line-clamp-1">
          {listing.title}
        </h3>
        
        <p className="listing-desc mb-2 line-clamp-2">
          {listing.description}
        </p>

        <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top">
          <div className="creator-info d-flex align-items-center">
             <div className="creator-avatar">
               {listing.createdBy?.name?.[0]?.toUpperCase() || 'U'}
             </div>
             <span className="creator-name line-clamp-1">{listing.createdBy?.name || 'Unknown User'}</span>
          </div>
          <p className="listing-date mb-0 text-end">
            {timeAgo}
          </p>
        </div>

        <style jsx>{`
          .listing-card-custom {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            background: #fff;
            border-radius: 12px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          
          .listing-card-custom:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          }

          .listing-card-custom:hover .listing-image {
            transform: scale(1.03);
          }

          .image-wrapper {
            position: relative;
            width: 100%;
            height: 200px;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .listing-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }

          .location-badge {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(0,0,0,0.6);
            color: #fff;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            backdrop-filter: blur(4px);
          }
          
          .listing-title {
            color: #413224;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 1.15rem;
            font-weight: 800;
            line-height: 1.4;
          }

          .listing-desc {
            color: #6d5d4b;
            font-size: 0.85rem;
            line-height: 1.5;
            margin-bottom: 0.5rem;
          }
          
          .creator-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #e57b2f;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: bold;
            margin-right: 8px;
          }

          .creator-name {
            font-size: 0.8rem;
            font-weight: 600;
            color: #413224;
            max-width: 100px;
          }
          
          .listing-date {
            color: #8c7e71;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
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
