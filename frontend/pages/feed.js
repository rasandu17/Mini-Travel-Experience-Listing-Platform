import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import { getListings } from '@/utils/api';

export default function Feed() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getListings();
      setListings(data);
    } catch (err) {
      setError(err.message || 'Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #fdf8ee;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #4a3b2c;
        }

        .header-subtitle {
          color: #e57b2f;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .header-title {
          font-weight: 800;
          font-size: 2.5rem;
          color: #413224;
          line-height: 1.2;
          max-width: 600px;
          margin: 0 auto;
        }

        .masonry-grid {
          column-count: 3;
          column-gap: 24px;
          width: 100%;
        }

        @media (max-width: 991px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 767px) {
          .masonry-grid {
            column-count: 1;
          }
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 24px;
        }
      `}</style>
      
      <div className="d-flex flex-column min-vh-100 position-relative overflow-hidden">
        <Navbar />

        <main className="flex-grow-1 pt-4 pb-5 px-3 px-md-4 px-lg-5">
          <div className="container-xl" style={{ maxWidth: '1200px' }}>
            
            {/* Header */}
            <div className="text-center mb-5">
              <span className="header-subtitle d-block mb-2">OUR BLOG</span>
              <h1 className="header-title">
                Explore & Discover: Insights<br />from Our Travel Experts
              </h1>
            </div>

            {/* Error State */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem' }} className="mb-3">🌍</div>
                <h2 className="h4 font-weight-bold text-dark mb-2">
                  No blog posts yet
                </h2>
                <p className="text-muted">
                  Be the first to share your travel experience!
                </p>
              </div>
            ) : (
              <div className="masonry-grid">
                {listings.map((listing) => (
                  <div key={listing._id} className="masonry-item">
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}
