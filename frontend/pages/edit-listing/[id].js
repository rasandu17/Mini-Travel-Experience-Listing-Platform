import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { getListingById, updateListing, getToken } from '@/utils/api';
import { jwtDecode } from 'jwt-decode';

const BACKEND = 'http://localhost:5000';

export default function EditListing() {
  const router = useRouter();
  const { id } = router.query;
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '', location: '', imageUrl: '', description: '', price: '',
  });
  const [imageFile, setImageFile]     = useState(null);
  const [preview, setPreview]         = useState('');
  const [uploadMode, setUploadMode]   = useState('url'); // 'url' | 'file'
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);

  // Auth + ownership guard
  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    if (id) fetchListing(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchListing = async (token) => {
    try {
      const data = await getListingById(id);
      // check ownership
      const decoded = jwtDecode(token);
      if (String(decoded.id) !== String(data.createdBy?._id)) {
        router.push(`/listing/${id}`);
        return;
      }
      setFormData({
        title:       data.title || '',
        location:    data.location || '',
        imageUrl:    data.imageUrl?.startsWith('/uploads/') ? '' : (data.imageUrl || ''),
        description: data.description || '',
        price:       data.price != null ? String(data.price) : '',
      });
      // Set preview for existing image
      if (data.imageUrl) {
        setPreview(data.imageUrl.startsWith('/uploads/')
          ? `${BACKEND}${data.imageUrl}`
          : data.imageUrl);
        if (data.imageUrl.startsWith('/uploads/')) setUploadMode('file');
      }
    } catch {
      setError('Failed to load listing');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'imageUrl') setPreview(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      let payload;
      if (uploadMode === 'file' && imageFile) {
        payload = new FormData();
        payload.append('title', formData.title);
        payload.append('location', formData.location);
        payload.append('description', formData.description);
        if (formData.price) payload.append('price', formData.price);
        payload.append('image', imageFile);
      } else {
        payload = {
          title:       formData.title,
          location:    formData.location,
          description: formData.description,
          imageUrl:    formData.imageUrl,
          ...(formData.price ? { price: parseFloat(formData.price) } : {}),
        };
      }
      await updateListing(id, payload);
      router.push(`/listing/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update listing');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <>
      <style jsx global>{`body{background:#fdf8ee;font-family:'Plus Jakarta Sans',sans-serif;}`}</style>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#e57b2f' }} />
      </div>
    </>
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { background:#fdf8ee; font-family:'Plus Jakarta Sans',sans-serif; color:#4a3b2c; }
        .form-card { background:#fff; border-radius:20px; padding:2.5rem; box-shadow:0 8px 32px rgba(0,0,0,0.07); }
        .form-label-custom { display:block; font-size:0.9rem; font-weight:700; color:#6d5d4b; margin-bottom:0.5rem; }
        .form-input-custom { width:100%; padding:0.85rem 1.2rem; border-radius:12px; border:2px solid #e8decb; background:#fcfaf6; color:#413224; font-family:'Plus Jakarta Sans',sans-serif; font-size:1rem; outline:none; transition:all 0.2s; box-sizing:border-box; }
        .form-input-custom:focus { border-color:#e57b2f; box-shadow:0 0 0 4px rgba(229,123,47,0.12); }
        .form-input-custom::placeholder { color:#c4b09b; }
        .mode-toggle { display:flex; gap:8px; margin-bottom:1rem; }
        .mode-btn { flex:1; padding:10px; border-radius:12px; border:2px solid #e8decb; background:#fff; font-weight:700; font-size:0.85rem; cursor:pointer; transition:all 0.2s; color:#6d5d4b; font-family:'Plus Jakarta Sans',sans-serif; }
        .mode-btn.active { border-color:#e57b2f; background:#fdf0e6; color:#e57b2f; }
        .drop-zone { border:2px dashed #e8decb; border-radius:12px; padding:2rem; text-align:center; cursor:pointer; transition:border-color 0.2s; background:#fcfaf6; }
        .drop-zone:hover { border-color:#e57b2f; }
        .preview-img { width:100%; max-height:280px; object-fit:cover; border-radius:12px; margin-top:1rem; }
        .btn-primary-custom { width:100%; background:#e57b2f; color:#fff; border:none; border-radius:12px; padding:1rem; font-weight:700; font-size:1.05rem; cursor:pointer; transition:background 0.3s; font-family:'Plus Jakarta Sans',sans-serif; margin-top:0.5rem; }
        .btn-primary-custom:hover { background:#cf6922; }
        .btn-primary-custom:disabled { opacity:0.7; cursor:not-allowed; }
        .btn-cancel { width:100%; background:#fff; color:#413224; border:2px solid #e8decb; border-radius:12px; padding:1rem; font-weight:700; font-size:1rem; cursor:pointer; transition:all 0.2s; font-family:'Plus Jakarta Sans',sans-serif; }
        .btn-cancel:hover { border-color:#413224; }
        .error-box { background:#fef2f2; color:#e74c3c; border:1px solid #fca5a5; border-radius:10px; padding:0.8rem 1rem; font-weight:500; margin-bottom:1.5rem; }
        .prefix-wrap { position:relative; }
        .prefix-wrap span { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#a9927b; font-weight:600; pointer-events:none; }
        .prefix-wrap input { padding-left:28px; }
      `}</style>

      <Navbar />

      <main className="py-5 px-3 px-md-4">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="mb-4">
            <h1 style={{ fontWeight: 800, fontSize: '2rem', color: '#413224' }}>Edit Listing</h1>
            <p style={{ color: '#a9927b' }}>Update your travel experience details below</p>
          </div>

          <div className="form-card">
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="form-label-custom">Experience Title *</label>
                <input name="title" type="text" required value={formData.title} onChange={handleChange} className="form-input-custom" placeholder="e.g. Sunset Boat Tour" />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="form-label-custom">Location *</label>
                <input name="location" type="text" required value={formData.location} onChange={handleChange} className="form-input-custom" placeholder="e.g. Bali, Indonesia" />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="form-label-custom">Image *</label>
                <div className="mode-toggle">
                  <button type="button" className={`mode-btn${uploadMode === 'url' ? ' active' : ''}`} onClick={() => setUploadMode('url')}>Link — Image URL</button>
                  <button type="button" className={`mode-btn${uploadMode === 'file' ? ' active' : ''}`} onClick={() => setUploadMode('file')}>Upload File</button>
                </div>

                {uploadMode === 'url' ? (
                  <input name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} className="form-input-custom" placeholder="https://example.com/photo.jpg" />
                ) : (
                  <div
                    className="drop-zone"
                    onClick={() => fileRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                  >
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                    {imageFile ? (
                      <p style={{ color: '#413224', fontWeight: 600 }}>{imageFile.name}</p>
                    ) : (
                      <>
                        <div style={{ marginBottom: '0.75rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#c4b09b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg></div>
                        <p style={{ color: '#a9927b', fontWeight: 600, margin: 0 }}>Drag & drop or click to upload</p>
                        <p style={{ color: '#c4b09b', fontSize: '0.8rem', margin: 0 }}>JPG, PNG, WebP up to 5MB</p>
                      </>
                    )}
                  </div>
                )}

                {preview && <img src={preview} alt="Preview" className="preview-img" />}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="form-label-custom">Description *</label>
                <textarea name="description" required value={formData.description} onChange={handleChange} rows={5} className="form-input-custom" placeholder="Describe the experience…" style={{ resize: 'vertical' }} />
              </div>

              {/* Price */}
              <div className="mb-5">
                <label className="form-label-custom">Price (Optional)</label>
                <div className="prefix-wrap">
                  <span>$</span>
                  <input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} className="form-input-custom" placeholder="0.00" />
                </div>
              </div>

              <div className="d-flex flex-column gap-3">
                <button type="submit" disabled={saving} className="btn-primary-custom">
                  {saving ? 'Saving changes…' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => router.push(`/listing/${id}`)} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
