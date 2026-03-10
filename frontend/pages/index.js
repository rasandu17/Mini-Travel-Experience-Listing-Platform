import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getListings } from '@/utils/api';

/* ── SVG icon helpers ───────────────────────────────────────── */
const Icon = {
  Map:     () => <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  Users:   () => <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Camera:  () => <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Heart:   () => <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Search:  () => <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Globe:   () => <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Plane:   () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 2-4-2.5L3 7s1.5 1.5 2 5L1 19h2l2-1h2v3l3-3s1 0 1 1 1 1 1 1l5-2c1-1 1-2 0-3l-2.2-1.8z" stroke="none" fill="currentColor" opacity="0.8"/><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 2-4-2.5L3 7s1.5 1.5 2 5L1 19h2l2-1h2v3l3-3s1 0 1 1 1 1 1 1l5-2c1-1 1-2 0-3l-2.2-1.8z"/></svg>,
  Compass: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  Pin:     () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Arrow:   () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  SearchSm:() => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  ChevDown:() => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>,
};

/* ── scroll-reveal helper ─────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── FeatureCard ────────────────────────────────────────────── */
function FeatureCard({ IconComp, title, desc, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className="feature-card"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="feature-icon"><IconComp /></div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  );
}

/* ── StepCard ───────────────────────────────────────────────── */
function StepCard({ num, title, desc, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className="step-card"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(-30px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div className="step-num">{num}</div>
      <div>
        <h4 className="step-title">{title}</h4>
        <p className="step-desc">{desc}</p>
      </div>
    </div>
  );
}

/* ── PreviewCard ────────────────────────────────────────────── */
function PreviewCard({ listing }) {
  const src = listing.imageUrl || 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?w=600&q=80';
  return (
    <Link href={`/listing/${listing._id}`} className="text-decoration-none">
      <div className="preview-card">
        <div className="preview-img-wrap">
          <img src={src} alt={listing.title} className="preview-img" />
          <div className="preview-overlay">
            <span className="preview-loc">
              <Icon.Pin /> {listing.location}
            </span>
            {listing.price != null && (
              <span className="preview-price">${listing.price}</span>
            )}
          </div>
        </div>
        <div className="preview-body">
          <h4 className="preview-title">{listing.title}</h4>
          <p className="preview-desc">{listing.description}</p>
          <div className="preview-meta">
            <span className="preview-author">
              <span className="author-dot">{listing.createdBy?.name?.[0]?.toUpperCase() || 'U'}</span>
              {listing.createdBy?.name || 'Unknown'}
            </span>
            {listing.likes?.length > 0 && (
              <span className="preview-likes">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#e57b2f" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {listing.likes.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── MAIN ────────────────────────────────────────────────────── */
export default function Home() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [heroRef, heroVis] = useReveal();
  const [statsRef, statsVis] = useReveal();

  useEffect(() => {
    getListings({ page: 1, limit: 3 })
      .then(d => setFeaturedListings(d.listings || []))
      .catch(() => {});
  }, []);

  const destinations = [
    { img: 'https://images.unsplash.com/photo-1516483638261-f40af5aa32c8?w=600&q=80', label: 'Tuscany, Italy' },
    { img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80', label: 'Bondi Beach, AU' },
    { img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', label: 'Hong Kong' },
    { img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80', label: 'Venice, Italy' },
    { img: 'https://images.unsplash.com/photo-1547997497-f86ef80e7f10?w=600&q=80', label: 'Maldives' },
    { img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', label: 'Swiss Alps' },
    { img: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&q=80', label: 'Santorini, Greece' },
    { img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', label: 'Road Trip' },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background-color: #fdf8ee;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #4a3b2c;
          overflow-x: hidden;
        }

        .section-pad    { padding: 7rem 1.5rem; }
        .section-pad-sm { padding: 5rem 1.5rem; }
        .container-lg   { max-width: 1160px; margin: 0 auto; }

        /* HERO */
        .hero-section {
          min-height: 100vh;
          background: #fdf8ee;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .hero-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 6rem 1.5rem 3rem;
          position: relative;
          z-index: 1;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #e8decb;
          color: #e57b2f;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 50px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .hero-tag-dot {
          width: 8px; height: 8px;
          background: #e57b2f;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.5); }
        }
        .hero-title {
          font-size: clamp(2.8rem, 7vw, 5.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #413224;
          max-width: 820px;
        }
        .hero-title em { color: #e57b2f; font-style: normal; }
        .hero-sub {
          margin-top: 1.5rem;
          font-size: 1.1rem;
          color: #6d5d4b;
          max-width: 500px;
          line-height: 1.75;
          font-weight: 500;
        }
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 2.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-primary {
          background: #e57b2f;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 16px 36px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(229,123,47,0.3);
        }
        .btn-primary:hover { background:#cf6922; transform:translateY(-2px); box-shadow:0 12px 28px rgba(229,123,47,0.4); color:#fff; }
        .btn-ghost {
          background: transparent;
          color: #413224;
          border: 2px solid #e8decb;
          border-radius: 50px;
          padding: 14px 32px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-ghost:hover { border-color:#413224; background:#413224; color:#fff; }

        /* MARQUEE */
        .hero-cards-wrap {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 1rem 0 3rem;
          z-index: 1;
        }
        .hero-cards-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .hero-cards-track:hover { animation-play-state: paused; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .hero-photo-card {
          width: 280px;
          height: 200px;
          border-radius: 18px;
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
          cursor: default;
        }
        .hero-photo-card:hover { transform: scale(1.04); }
        .hero-photo-card-label {
          position: absolute;
          bottom: 12px; left: 12px;
          background: rgba(0,0,0,0.55);
          color: #fff;
          font-weight: 700;
          font-size: 0.76rem;
          padding: 5px 12px;
          border-radius: 50px;
          backdrop-filter: blur(6px);
        }
        .fade-left  { position:absolute; left:0;  top:0; bottom:0; width:100px; background:linear-gradient(to right,#fdf8ee,transparent); z-index:2; pointer-events:none; }
        .fade-right { position:absolute; right:0; top:0; bottom:0; width:100px; background:linear-gradient(to left, #fdf8ee,transparent); z-index:2; pointer-events:none; }

        /* SCROLL HINT */
        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #c4b09b;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          animation: bounce-hint 2s infinite;
          padding-bottom: 2rem;
          z-index: 1;
        }
        @keyframes bounce-hint { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

        /* STATS */
        .stats-bar { background:#413224; padding:2.5rem 1.5rem; }
        .stats-inner {
          max-width: 900px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-around;
          flex-wrap: wrap; gap: 2rem;
        }
        .stat-item { text-align: center; }
        .stat-num  { font-size:2.2rem; font-weight:800; color:#e57b2f; line-height:1; }
        .stat-lbl  { font-size:0.78rem; color:rgba(255,255,255,0.55); font-weight:700; margin-top:4px; text-transform:uppercase; letter-spacing:1.2px; }
        .stat-divider { width:1px; height:48px; background:rgba(255,255,255,0.12); }
        @media(max-width:600px){ .stat-divider{display:none;} }

        /* FEATURES */
        .features-section { background:#fdf8ee; }
        .section-label {
          display:inline-block; color:#e57b2f;
          font-weight:800; font-size:0.75rem;
          letter-spacing:2.5px; text-transform:uppercase;
          margin-bottom:0.75rem;
        }
        .section-title {
          font-size: clamp(1.8rem,4vw,2.8rem);
          font-weight: 800; color:#413224;
          line-height:1.2; letter-spacing:-0.02em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px; margin-top: 3.5rem;
        }
        .feature-card {
          background: #fff; border-radius:20px; padding:2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          border: 1.5px solid #f0e8d8;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .feature-card:hover { box-shadow:0 12px 32px rgba(0,0,0,0.1); transform:translateY(-4px); }
        .feature-icon {
          width:52px; height:52px; border-radius:14px;
          background:#fdf0e6; color:#e57b2f;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:1.2rem;
        }
        .feature-title { font-size:1.05rem; font-weight:800; color:#413224; margin-bottom:0.5rem; }
        .feature-desc  { font-size:0.88rem; color:#8c7e71; line-height:1.7; }

        /* HOW IT WORKS */
        .how-section { background:linear-gradient(140deg,#413224 0%,#2d1f13 100%); color:#fff; }
        .how-tabs {
          display:flex; gap:8px; margin-bottom:2.5rem;
          background:rgba(255,255,255,0.08);
          border-radius:50px; padding:6px;
          width:fit-content;
        }
        .how-tab {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 24px; border-radius:50px; border:none;
          cursor:pointer; font-weight:700; font-size:0.9rem;
          transition:all 0.2s; font-family:'Plus Jakarta Sans',sans-serif;
        }
        .how-tab.active { background:#e57b2f; color:#fff; }
        .how-tab:not(.active) { background:transparent; color:rgba(255,255,255,0.55); }
        .how-tab:not(.active):hover { background:rgba(255,255,255,0.1); color:#fff; }
        .how-grid { display:flex; flex-direction:column; gap:18px; }
        .step-card {
          display:flex; align-items:flex-start; gap:18px;
          background:rgba(255,255,255,0.07);
          border-radius:16px; padding:1.4rem;
          border:1px solid rgba(255,255,255,0.1);
          transition:background 0.2s;
        }
        .step-card:hover { background:rgba(255,255,255,0.13); }
        .step-num {
          min-width:42px; height:42px; border-radius:50%;
          background:#e57b2f; color:#fff;
          font-weight:800; font-size:1rem;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0;
        }
        .step-title { font-weight:700; font-size:1rem; color:#fff; margin-bottom:3px; }
        .step-desc  { font-size:0.86rem; color:rgba(255,255,255,0.6); line-height:1.65; }
        .how-image-wrap {
          border-radius:22px; overflow:hidden;
          box-shadow:0 24px 60px rgba(0,0,0,0.5);
          height:100%; min-height:400px;
        }
        .how-image-wrap img { width:100%; height:100%; object-fit:cover; display:block; }

        /* FEATURED */
        .featured-section { background:#fdf8ee; }
        .featured-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
          gap:28px; margin-top:3rem;
        }
        .preview-card {
          background:#fff; border-radius:20px; overflow:hidden;
          box-shadow:0 6px 20px rgba(0,0,0,0.06);
          border:1.5px solid #f0e8d8;
          transition:box-shadow 0.3s, transform 0.3s;
          cursor:pointer;
        }
        .preview-card:hover { box-shadow:0 16px 40px rgba(0,0,0,0.12); transform:translateY(-6px); }
        .preview-img-wrap { position:relative; height:220px; overflow:hidden; }
        .preview-img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .preview-card:hover .preview-img { transform:scale(1.06); }
        .preview-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%);
          display:flex; align-items:flex-end;
          justify-content:space-between; padding:14px;
        }
        .preview-loc   { color:#fff; font-size:0.76rem; font-weight:700; display:flex; align-items:center; gap:5px; }
        .preview-price { background:#e57b2f; color:#fff; font-weight:800; font-size:0.82rem; padding:4px 12px; border-radius:50px; }
        .preview-body  { padding:1.2rem 1.4rem 1.4rem; }
        .preview-title { font-weight:800; font-size:1rem; color:#413224; margin-bottom:7px; line-height:1.3; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .preview-desc  { font-size:0.82rem; color:#8c7e71; line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:12px; }
        .preview-meta  { display:flex; align-items:center; justify-content:space-between; }
        .preview-author{ display:flex; align-items:center; gap:8px; font-size:0.8rem; font-weight:600; color:#6d5d4b; }
        .author-dot    { width:26px; height:26px; border-radius:50%; background:#e57b2f; color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:800; flex-shrink:0; }
        .preview-likes { display:flex; align-items:center; gap:4px; font-size:0.78rem; font-weight:700; color:#e57b2f; }
        .no-listings-empty { text-align:center; padding:3rem; color:#a9927b; }

        /* CTA */
        .cta-section {
          background:#e57b2f; padding:6rem 1.5rem;
          text-align:center; position:relative; overflow:hidden;
        }
        .cta-section::before {
          content:''; position:absolute;
          top:-60px; right:-60px;
          width:260px; height:260px;
          border-radius:50%; background:rgba(255,255,255,0.08);
        }
        .cta-section::after {
          content:''; position:absolute;
          bottom:-80px; left:-40px;
          width:320px; height:320px;
          border-radius:50%; background:rgba(255,255,255,0.06);
        }
        .cta-title {
          font-size:clamp(2rem,5vw,3.5rem);
          font-weight:800; color:#fff;
          line-height:1.15; letter-spacing:-0.03em;
          margin-bottom:1rem; position:relative; z-index:1;
        }
        .cta-sub { color:rgba(255,255,255,0.85); font-size:1.05rem; margin-bottom:2.5rem; position:relative; z-index:1; }
        .btn-white {
          background:#fff; color:#e57b2f; border:none;
          border-radius:50px; padding:16px 40px;
          font-weight:800; font-size:1rem; cursor:pointer;
          transition:transform 0.2s, box-shadow 0.2s;
          text-decoration:none; display:inline-flex;
          align-items:center; gap:8px; position:relative; z-index:1;
          box-shadow:0 8px 24px rgba(0,0,0,0.15);
        }
        .btn-white:hover { transform:translateY(-2px); box-shadow:0 16px 40px rgba(0,0,0,0.2); color:#e57b2f; }

        @media(max-width:768px){
          .section-pad{ padding:4.5rem 1.2rem; }
          .how-image-wrap{ min-height:240px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="hero-section">
        <Navbar />

        <div
          ref={heroRef}
          className="hero-body"
          style={{
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            The Traveler's Marketplace
          </div>

          <h1 className="hero-title">
            Discover <em>Extraordinary</em><br />
            Local Experiences
          </h1>

          <p className="hero-sub">
            A platform where tour guides, activity hosts, and local operators
            publish travel experiences — and travelers find them.
          </p>

          <div className="hero-cta-row">
            <Link href="/feed" id="hero-browse-btn" className="btn-primary">
              <Icon.SearchSm />
              Browse Experiences
            </Link>
            <Link href="/register" id="hero-host-btn" className="btn-ghost">
              Become a Host
              <Icon.Arrow />
            </Link>
          </div>
        </div>

        {/* Scrolling photo strip */}
        <div className="hero-cards-wrap">
          <div className="fade-left" />
          <div className="fade-right" />
          <div className="hero-cards-track">
            {[...destinations, ...destinations].map((c, i) => (
              <div
                key={i}
                className="hero-photo-card"
                style={{ backgroundImage: `url(${c.img})` }}
              >
                <span className="hero-photo-card-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <Icon.ChevDown />
        </div>
      </div>

      {/* ── STATS ── */}
      <div
        ref={statsRef}
        className="stats-bar"
        style={{
          opacity: statsVis ? 1 : 0,
          transform: statsVis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div className="stats-inner">
          <div className="stat-item"><div className="stat-num">500+</div><div className="stat-lbl">Experiences</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-num">80+</div><div className="stat-lbl">Destinations</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-num">2k+</div><div className="stat-lbl">Travelers</div></div>
          <div className="stat-divider" />
          <div className="stat-item"><div className="stat-num">4.9</div><div className="stat-lbl">Avg. Rating</div></div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="features-section section-pad">
        <div className="container-lg">
          <div style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">Why TravelHub</span>
            <h2 className="section-title">Everything a traveler needs, in one place</h2>
          </div>
          <div className="features-grid">
            <FeatureCard delay={0}   IconComp={Icon.Map}    title="Discover Unique Experiences"      desc="Browse curated local experiences — from sunset boat tours to mountain hikes — all posted by real hosts." />
            <FeatureCard delay={100} IconComp={Icon.Users}  title="Connect Directly with Hosts"      desc="Reach out to tour guides, activity hosts, and local operators who know their destinations best." />
            <FeatureCard delay={200} IconComp={Icon.Camera} title="Share Your Adventures"            desc="Create an account and list your travel experience in minutes. Reach travelers worldwide." />
            <FeatureCard delay={300} IconComp={Icon.Heart}  title="Save Your Favourites"             desc="Like the experiences you love and review them later to plan your perfect itinerary." />
            <FeatureCard delay={400} IconComp={Icon.Search} title="Smart Search"                     desc="Find what you're looking for — search by destination, title, or description in real time." />
            <FeatureCard delay={500} IconComp={Icon.Globe}  title="Global Community"                 desc="Join a growing community of travellers and local operators passionate about authentic experiences." />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowSection />

      {/* ── FEATURED LISTINGS ── */}
      <section className="featured-section section-pad">
        <div className="container-lg">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
            <div>
              <span className="section-label">Live Listings</span>
              <h2 className="section-title">Latest Experiences</h2>
            </div>
            <Link href="/feed" className="btn-ghost" style={{ marginBottom: '0.3rem' }}>
              View all <Icon.Arrow />
            </Link>
          </div>

          {featuredListings.length > 0 ? (
            <div className="featured-grid">
              {featuredListings.map(l => <PreviewCard key={l._id} listing={l} />)}
            </div>
          ) : (
            <div className="no-listings-empty">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#c4b09b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ marginBottom:'1rem' }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <p style={{ fontWeight: 500, margin: 0 }}>
                No listings yet —{' '}
                <Link href="/create-listing" style={{ color:'#e57b2f', fontWeight:700, textDecoration:'none' }}>
                  share the first experience
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection />
    </>
  );
}

/* ── How It Works ──────────────────────────────────────────── */
function HowSection() {
  const [tab, setTab] = useState('traveler');
  const [ref, vis]    = useReveal();

  const travelerSteps = [
    { title: 'Browse the Feed',       desc: 'Explore travel experiences posted by local hosts. Use the search bar to filter by destination or activity.' },
    { title: 'View Full Details',     desc: 'Open any listing to see the full photo, description, price, and creator info.' },
    { title: 'Like and Save',         desc: 'Heart the experiences you love. Revisit them later when planning your next trip.' },
    { title: 'Contact the Host',      desc: 'Reach out directly to the experience provider to book or ask questions.' },
  ];
  const providerSteps = [
    { title: 'Create a Free Account', desc: 'Sign up in under a minute with your name, email, and password. No fees required.' },
    { title: 'Publish Your Listing',  desc: 'Add a title, location, description, photo, and optional price. Go live instantly.' },
    { title: 'Reach Global Travelers',desc: 'Your listing appears in the public feed immediately, searchable by thousands of travelers.' },
    { title: 'Edit or Remove Anytime',desc: 'Update your details, refresh photos, or delete your listing — full control at all times.' },
  ];
  const steps = tab === 'traveler' ? travelerSteps : providerSteps;
  const img   = tab === 'traveler'
    ? 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80'
    : 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80';

  return (
    <section className="how-section section-pad">
      <div className="container-lg">
        <div
          ref={ref}
          style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="section-title" style={{ color: '#fff', marginBottom: '2rem' }}>
            Simple for everyone
          </h2>

          <div className="how-tabs">
            <button
              className={`how-tab${tab === 'traveler' ? ' active' : ''}`}
              onClick={() => setTab('traveler')}
            >
              <Icon.Plane /> For Travelers
            </button>
            <button
              className={`how-tab${tab === 'provider' ? ' active' : ''}`}
              onClick={() => setTab('provider')}
            >
              <Icon.Compass /> For Providers
            </button>
          </div>

          <div className="row g-4 align-items-stretch">
            <div className="col-md-6">
              <div className="how-grid">
                {steps.map((s, i) => (
                  <StepCard key={`${tab}-${i}`} num={i + 1} title={s.title} desc={s.desc} delay={i * 80} />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="how-image-wrap">
                <img src={img} alt={tab === 'traveler' ? 'Traveler browsing' : 'Host listing'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ──────────────────────────────────────────── */
function CtaSection() {
  const [ref, vis] = useReveal();
  return (
    <section className="cta-section">
      <div
        ref={ref}
        style={{ opacity: vis ? 1 : 0, transform: vis ? 'scale(1)' : 'scale(0.96)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
      >
        <h2 className="cta-title">
          Ready to share your<br />travel experience?
        </h2>
        <p className="cta-sub">
          Join thousands of hosts already listing their experiences on TravelHub.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" id="cta-register-btn" className="btn-white">
            Get Started Free
            <Icon.Arrow />
          </Link>
          <Link href="/feed" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.45)', color: '#fff' }}>
            Browse First
            <Icon.Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
