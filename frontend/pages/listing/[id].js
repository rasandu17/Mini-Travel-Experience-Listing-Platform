import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getListingById, deleteListing, toggleLike, getToken } from '@/utils/api';
import { formatDistanceToNow } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [liked, setLiked]           = useState(false);
  const [likeCount, setLikeCount]   = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting]     = useState(false);

  // Decode JWT to get current user ID
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (id) fetchListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const data = await getListingById(id);
      setListing(data);
      setLikeCount(data.likes?.length || 0);
      // Check if current user already liked
      const token = getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setLiked(data.likes?.map(String).includes(String(decoded.id)));
        } catch {}
      }
    } catch (err) {
      setError(err.message || 'Failed to load listing');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!getToken()) { router.push('/login'); return; }
    setLikeLoading(true);
    try {
      const res = await toggleLike(id);
      setLiked(res.liked);
      setLikeCount(res.likes);
    } catch {}
    setLikeLoading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteListing(id);
      router.push('/feed');
    } catch (err) {
      alert(err.message || 'Failed to delete');
      setDeleting(false);
      setDeleteModal(false);
    }
  };

  const isOwner = currentUserId && listing?.createdBy?._id &&
    String(currentUserId) === String(listing.createdBy._id);

  /* ── States ── */
  if (loading) return (
    <>
      <Navbar />
      <style jsx global>{`body{background:#fdf8ee;font-family:'Plus Jakarta Sans',sans-serif;}`}</style>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#e57b2f' }} role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
        <Link href="/feed" className="btn btn-link" style={{ color: '#e57b2f' }}>← Back to Feed</Link>
      </div>
    </>
  );

  if (!listing) return null;

  const timeAgo = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });
  const BACKEND = 'http://localhost:5000';
  const imgSrc  = listing.imageUrl?.startsWith('/uploads/')
    ? `${BACKEND}${listing.imageUrl}`
    : listing.imageUrl;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { background:#fdf8ee; font-family:'Plus Jakarta Sans',sans-serif; color:#4a3b2c; }
        .detail-hero { width:100%; max-height:480px; object-fit:cover; border-radius:20px; }
        .detail-card { background:#fff; border-radius:20px; padding:2.5rem; box-shadow:0 8px 32px rgba(0,0,0,0.07); }
        .tag-pill { display:inline-flex; align-items:center; gap:6px; background:#fdf0e6; color:#e57b2f; font-weight:700; font-size:0.85rem; padding:6px 16px; border-radius:50px; }
        .price-badge { background:#413224; color:#fff; font-weight:800; font-size:1.3rem; padding:8px 24px; border-radius:50px; }
        .creator-avatar-lg { width:48px; height:48px; border-radius:50%; background:#e57b2f; color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.2rem; font-weight:800; }
        .btn-like { display:inline-flex; align-items:center; gap:8px; padding:10px 24px; border-radius:50px; border:2px solid #e57b2f; background:transparent; color:#e57b2f; font-weight:700; font-size:0.95rem; cursor:pointer; transition:all 0.2s; font-family:'Plus Jakarta Sans',sans-serif; }
        .btn-like.liked { background:#e57b2f; color:#fff; }
        .btn-like:hover:not(.liked) { background:#fdf0e6; }
        .btn-like:disabled { opacity:0.6; cursor:not-allowed; }
        .btn-edit { display:inline-flex; align-items:center; gap:6px; padding:10px 22px; border-radius:50px; border:2px solid #413224; background:transparent; color:#413224; font-weight:700; font-size:0.9rem; cursor:pointer; transition:all 0.2s; font-family:'Plus Jakarta Sans',sans-serif; text-decoration:none; }
        .btn-edit:hover { background:#413224; color:#fff; }
        .btn-delete { display:inline-flex; align-items:center; gap:6px; padding:10px 22px; border-radius:50px; border:2px solid #e74c3c; background:transparent; color:#e74c3c; font-weight:700; font-size:0.9rem; cursor:pointer; transition:all 0.2s; font-family:'Plus Jakarta Sans',sans-serif; }
        .btn-delete:hover { background:#e74c3c; color:#fff; }
        /* Modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:2000; display:flex; align-items:center; justify-content:center; padding:1rem; backdrop-filter:blur(4px); }
        .modal-box { background:#fff; border-radius:20px; padding:2.5rem; max-width:420px; width:100%; box-shadow:0 20px 60px rgba(0,0,0,0.2); text-align:center; }
        .back-link { display:inline-flex; align-items:center; gap:6px; color:#a9927b; font-weight:600; font-size:0.9rem; text-decoration:none; transition:color 0.2s; }
        .back-link:hover { color:#e57b2f; }
      `}</style>

      <Navbar />

      <main className="py-4 px-3 px-md-4 px-lg-5">
        <div className="container-xl" style={{ maxWidth: '900px' }}>

          {/* Back */}
          <Link href="/feed" className="back-link mb-4 d-inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            Back to Feed
          </Link>

          {/* Hero Image */}
          <img src={imgSrc} alt={listing.title} className="detail-hero mb-4 w-100" />

          <div className="detail-card">
            {/* Top row */}
            <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-3">
              <div>
                <div className="tag-pill mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {listing.location}
                </div>
                <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#413224', lineHeight: 1.2 }}>
                  {listing.title}
                </h1>
              </div>
              {listing.price != null && (
                <div className="price-badge">${listing.price}</div>
              )}
            </div>

            {/* Description */}
            <p style={{ color: '#6d5d4b', lineHeight: 1.8, fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
              {listing.description}
            </p>

            <hr style={{ borderColor: '#e8decb', margin: '2rem 0' }} />

            {/* Creator + Actions */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="creator-avatar-lg">
                  {listing.createdBy?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#a9927b', margin: 0 }}>Shared by</p>
                  <p style={{ fontWeight: 700, color: '#413224', margin: 0, fontSize: '1.05rem' }}>
                    {listing.createdBy?.name || 'Unknown'}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#a9927b', margin: 0 }}>Posted {timeAgo}</p>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 align-items-center">
                {/* Like button */}
                <button
                  className={`btn-like${liked ? ' liked' : ''}`}
                  onClick={handleLike}
                  disabled={likeLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                </button>

                {/* Owner controls */}
                {isOwner && (
                  <>
                    <Link href={`/edit-listing/${id}`} className="btn-edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </Link>
                    <button className="btn-delete" onClick={() => setDeleteModal(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div style={{ color: '#EB7400', marginBottom: '1rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></div>
            <h2 style={{ fontWeight: 800, color: '#19211E', marginBottom: '0.5rem' }}>Delete Listing?</h2>
            <p style={{ color: '#95A19D', marginBottom: '2rem' }}>
              This action cannot be undone. The listing will be permanently removed.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button
                onClick={() => setDeleteModal(false)}
                disabled={deleting}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #e8decb', background: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#EB7400', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: deleting ? 0.7 : 1 }}
              >
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
