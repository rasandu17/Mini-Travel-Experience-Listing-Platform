import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          background-color: #fdf8ee;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #4a3b2c;
          margin: 0;
        }

        .about-header {
          background-color: #413224;
          color: white;
          padding: 6rem 1.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header-bg-shape {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(229, 123, 47, 0.1);
          top: -150px;
          right: -100px;
          filter: blur(40px);
        }

        .about-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .about-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          position: relative;
          z-index: 2;
        }

        .content-section {
          padding: 5rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .story-block {
          background: #fff;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 10px 40px rgba(65, 50, 36, 0.05);
          border: 1.5px solid #e8decb;
          margin-bottom: 4rem;
        }

        .section-tag {
          color: #e57b2f;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: block;
        }

        .block-title {
          font-size: 2rem;
          font-weight: 800;
          color: #413224;
          margin-bottom: 1.5rem;
        }

        .block-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #6d5d4b;
          margin-bottom: 1.5rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .team-card {
          text-align: center;
        }

        .avatar {
          width: 120px;
          height: 120px;
          background-color: #e57b2f;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 auto 1.5rem;
          box-shadow: 0 8px 24px rgba(229, 123, 47, 0.2);
        }

        .team-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #413224;
          margin-bottom: 0.25rem;
        }

        .team-role {
          color: #a9927b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cta-box {
          background: #e57b2f;
          border-radius: 24px;
          padding: 4rem 2rem;
          text-align: center;
          color: white;
          margin-top: 2rem;
        }

        .btn-white {
          display: inline-block;
          background: white;
          color: #e57b2f;
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          margin-top: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .story-block {
            padding: 2rem;
          }
        }
      `}</style>
      
      <Navbar />

      <main>
        {/* Header */}
        <div className="about-header">
          <div className="header-bg-shape"></div>
          <h1 className="about-title">Connecting Travelers<br/>with Local Experts</h1>
          <p className="about-subtitle">
            We built TravelHub to make discovering authentic, locally-led experiences easier and more accessible than ever before.
          </p>
        </div>

        <div className="content-section">
          
          {/* Our Story */}
          <div className="story-block">
            <span className="section-tag">Our Story</span>
            <h2 className="block-title">Born out of wanderlust</h2>
            <p className="block-text">
              Too often, the best parts of travel—the hidden trails, the incredible family-owned cafes, the quiet spots to watch a sunset—are impossible to find online. Big tourism companies dominate search results, leaving small, passionate local guides invisible.
            </p>
            <p className="block-text">
              We started TravelHub to flip the script. We wanted a digital marketplace where anyone guiding a tour, hosting a cooking class, or organizing a unique activity could instantly reach travelers looking for something real.
            </p>
          </div>

          {/* Mission */}
          <div className="story-block" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
            <span className="section-tag" style={{ color: '#a9927b' }}>Our Mission</span>
            <h2 className="block-title">Empowering local economies.</h2>
            <p className="block-text">
              By removing the friction of building websites and handling complex marketing, we empower local creators to focus on what they do best: creating unforgettable experiences. Every booking on TravelHub directly supports individuals and small businesses across the globe.
            </p>
          </div>

          {/* Core Values */}
          <div className="team-grid" style={{ marginBottom: '5rem' }}>
             <div className="team-card">
               <div className="avatar" style={{ background: '#fcfaf6', color: '#413224', border: '2px solid #e8decb', boxShadow:'none' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <h3 className="team-name">Trust</h3>
               <p className="team-role">Verified hosts and real reviews</p>
             </div>
             <div className="team-card">
               <div className="avatar" style={{ background: '#fcfaf6', color: '#413224', border: '2px solid #e8decb', boxShadow:'none' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
               </div>
               <h3 className="team-name">Authenticity</h3>
               <p className="team-role">Experiences you can't fake</p>
             </div>
             <div className="team-card">
               <div className="avatar" style={{ background: '#fcfaf6', color: '#413224', border: '2px solid #e8decb', boxShadow:'none' }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 12H8"/><path d="M12 8v8"/></svg>
               </div>
               <h3 className="team-name">Impact</h3>
               <p className="team-role">Directly supporting local hosts</p>
             </div>
          </div>

          {/* CTA */}
          <div className="cta-box">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px' }}>Ready to explore?</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px', margin: '0 auto' }}>Join thousands of travelers finding their next big adventure on TravelHub today.</p>
            <Link href="/feed" className="btn-white">
              Browse Experiences
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
