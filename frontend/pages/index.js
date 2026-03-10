import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          background-color: #fdf8ee;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #4a3b2c;
        }

        .hero-title {
          font-weight: 800;
          font-size: 5.5rem;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #413224;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: #6d5d4b;
          max-width: 44rem;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
        }

        .btn-orange {
          background-color: #e57b2f;
          color: white;
          border-radius: 50px;
          padding: 14px 32px;
          font-weight: 700;
          border: none;
          transition: background-color 0.3s;
          font-size: 1.1rem;
        }

        .btn-orange:hover {
          background-color: #cf6922;
          color: white;
        }

        .cards-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 50px;
          overflow: hidden;
          padding-bottom: 20px;
          height: 250px;
          align-items: flex-end;
        }

        .travel-card {
          width: 320px;
          height: 220px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transform: translateY(40px);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .travel-card:nth-child(1) {
          transform: translateY(60px) rotate(2deg);
        }

        .travel-card:nth-child(2) {
          transform: translateY(30px) rotate(-1deg);
        }

        .travel-card:nth-child(3) {
          transform: translateY(50px) rotate(3deg);
        }

        .travel-card:nth-child(4) {
          transform: translateY(70px) rotate(-2deg);
        }

        .travel-card:hover {
          transform: translateY(10px) rotate(0deg);
          z-index: 10 !important;
        }

        .badge-circular {
          position: absolute;
          left: 5%;
          top: 65%;
          width: 140px;
          height: 140px;
          background: #fdf8ee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transform: rotate(-15deg);
        }

        .badge-circular svg.badge-text {
          animation: spin 15s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        /* Dotted/dashed circle border */
        .badge-circular::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px dashed #c4b09b;
          border-radius: 50%;
        }
      `}</style>
      
      <div className="d-flex flex-column min-vh-100 position-relative overflow-hidden">
        <Navbar />

        <main className="flex-grow-1 d-flex flex-column align-items-center pt-5 pb-0 px-3 px-md-4 px-lg-5 position-relative">
          <div className="w-100 container-xl" style={{ position: 'relative' }}>
            
            <header className="text-center mx-auto d-flex flex-column align-items-center mt-3 mt-md-5" style={{ maxWidth: '64rem' }}>
              <h1 className="hero-title mb-4">
                Your Next Great Experience <br className="d-none d-md-block" />
                Awaits With TravelHub
              </h1>

              <p className="hero-subtitle mb-5">
                Experience the world's finest destinations with curated local insights. Connect with travelers and uncover hidden gems to create unforgettable global memories.
              </p>

              <Link href="/feed" className="btn btn-orange text-decoration-none shadow-sm">
                Explore All Destinations
              </Link>
            </header>

            {/* Circular badge decoration */}
            <div className="badge-circular d-none d-lg-flex z-3">
              <svg className="badge-text" width="130" height="130" viewBox="0 0 130 130">
                <path id="curve" d="M 65, 65 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" fill="transparent" />
                <text fill="#a9927b" style={{ fontSize: '13px', letterSpacing: '3.5px', fontWeight: 'bold' }}>
                  <textPath href="#curve" startOffset="0%">
                    TRAVELHUB EXPERIENCE • TRAVELHUB EXPERIENCE • 
                  </textPath>
                </text>
              </svg>
              <div style={{position: 'absolute', color: '#e57b2f'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>
              </div>
            </div>

            {/* Cards Section */}
            <div className="cards-container">
              <div className="travel-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)', zIndex: 1 }}></div>
              <div className="travel-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516483638261-f40af5aa32c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)', zIndex: 2 }}></div>
              <div className="travel-card d-none d-md-block" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)', zIndex: 3 }}></div>
              <div className="travel-card d-none d-lg-block" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)', zIndex: 4 }}></div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}

