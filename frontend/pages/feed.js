import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import { getListings } from '@/utils/api';

const LIMIT = 9;

export default function Feed() {
  const [listings, setListings]     = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [search, setSearch]         = useState('');
  const [inputVal, setInputVal]     = useState('');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const debounceRef                 = useRef(null);

  const fetchListings = useCallback(async (q, page) => {
    try {
      setLoading(true);
      setError('');
      const data = await getListings({ search: q, page, limit: LIMIT });
      setListings(data.listings);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || 'Failed to load listings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch whenever search or page changes
  useEffect(() => {
    fetchListings(search, pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pagination.page]);

  // Debounce the text input → update `search` after 400ms
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPagination(p => ({ ...p, page: 1 })); // reset to page 1
      setSearch(val);
    }, 400);
  };

  const goToPage = (p) => {
    setPagination(prev => ({ ...prev, page: p }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = Array.from({ length: pagination.pages }, (_, i) => i + 1);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
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

        /* ── Search bar ── */
        .search-wrapper {
          max-width: 520px;
          margin: 2rem auto 0;
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #a9927b;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 0.85rem 1.2rem 0.85rem 3rem;
          border-radius: 50px;
          border: 2px solid #e8decb;
          background: #fff;
          color: #413224;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .search-input::placeholder { color: #c4b09b; }
        .search-input:focus {
          border-color: #e57b2f;
          box-shadow: 0 0 0 4px rgba(229,123,47,0.12);
        }

        /* ── Grid ── */
        .masonry-grid {
          column-count: 3;
          column-gap: 24px;
          width: 100%;
        }
        @media (max-width: 991px) { .masonry-grid { column-count: 2; } }
        @media (max-width: 600px)  { .masonry-grid { column-count: 1; } }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 24px;
        }

        /* ── Skeleton ── */
        .skeleton { background: linear-gradient(90deg,#f0e8d8 25%,#e8dccc 50%,#f0e8d8 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 12px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .skeleton-card { background:#fff; border-radius:12px; padding:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); margin-bottom:24px; }
        .skeleton-img  { width:100%; height:200px; }
        .skeleton-line { height:16px; margin-top:12px; }
        .skeleton-line.short { width:60%; }

        /* ── Pagination ── */
        .pagination-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }
        .page-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #e8decb;
          background: #fff;
          color: #413224;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-btn:hover { border-color: #e57b2f; color: #e57b2f; }
        .page-btn.active { background: #e57b2f; border-color: #e57b2f; color: #fff; }
        .page-btn:disabled { opacity:0.4; cursor:not-allowed; }

        .results-info {
          text-align: center;
          font-size: 0.85rem;
          color: #a9927b;
          margin-top: 0.5rem;
          font-weight: 500;
        }
      `}</style>

      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1 pt-4 pb-5 px-3 px-md-4 px-lg-5">
          <div className="container-xl" style={{ maxWidth: '1200px' }}>

            {/* Header */}
            <div className="text-center mb-4">
              <span className="header-subtitle d-block mb-2">OUR BLOG</span>
              <h1 className="header-title">
                Explore &amp; Discover: Insights<br />from Our Travel Experts
              </h1>

              {/* Search */}
              <div className="search-wrapper">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  id="search-listings"
                  type="text"
                  className="search-input"
                  placeholder="Search destinations, titles…"
                  value={inputVal}
                  onChange={handleSearchChange}
                />
              </div>

              {!loading && (
                <p className="results-info mt-2">
                  {pagination.total === 0
                    ? 'No listings found'
                    : `Showing ${listings.length} of ${pagination.total} listing${pagination.total !== 1 ? 's' : ''}`}
                </p>
              )}
            </div>

            {/* Error */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Loading skeletons */}
            {loading ? (
              <div className="masonry-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton-card masonry-item">
                    <div className="skeleton skeleton-img" />
                    <div className="skeleton skeleton-line mt-3" />
                    <div className="skeleton skeleton-line short" />
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-5">
                <div style={{ marginBottom: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="#c4b09b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h2 className="h4 fw-bold mb-2" style={{ color: '#413224' }}>
                  {search ? `No results for "${search}"` : 'No listings yet'}
                </h2>
                <p style={{ color: '#a9927b' }}>
                  {search ? 'Try a different search term.' : 'Be the first to share your travel experience!'}
                </p>
              </div>
            ) : (
              <>
                <div className="masonry-grid">
                  {listings.map((listing) => (
                    <div key={listing._id} className="masonry-item">
                      <ListingCard listing={listing} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination-wrapper">
                    <button
                      className="page-btn"
                      onClick={() => goToPage(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      ‹
                    </button>
                    {pageNumbers.map((n) => (
                      <button
                        key={n}
                        className={`page-btn${pagination.page === n ? ' active' : ''}`}
                        onClick={() => goToPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      className="page-btn"
                      onClick={() => goToPage(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
