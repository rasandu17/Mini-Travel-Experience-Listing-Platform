import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function ListingCard({ listing }) {
  // Format the timestamp to "X hours/days ago"
  const timeAgo = formatDistanceToNow(new Date(listing.createdAt), {
    addSuffix: true,
  });

  return (
    <Link href={`/listing/${listing._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {listing.price && (
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
              <span className="text-blue-600 font-bold">${listing.price}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-2">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{listing.location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {listing.description}
          </p>

          {/* Footer - Creator and Time */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-2">
                {listing.createdBy?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span>{listing.createdBy?.name || 'Unknown'}</span>
            </div>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
