import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
        .bg-light-gray {
          background-color: #f9fafb;
        }
        .text-indigo {
          color: #4f46e5;
        }
        .bg-indigo {
          background-color: #4f46e5;
        }
        .bg-indigo:hover {
          background-color: #4338ca;
        }
        .btn-outline-custom {
          border-color: #d1d5db;
          color: #374151;
          background-color: white;
        }
        .btn-outline-custom:hover {
          background-color: #f9fafb;
          border-color: #d1d5db;
          color: #374151;
        }
        .badge-custom {
          background-color: white;
          border: 1px solid #e5e7eb;
          color: #374151;
        }
        .pulse-dot {
          position: relative;
          display: inline-flex;
          height: 10px;
          width: 10px;
        }
        .pulse-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-color: #818cf8;
          opacity: 0.75;
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .pulse-dot::after {
          content: '';
          position: relative;
          display: inline-flex;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background-color: #6366f1;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .feature-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .feature-card:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 128px;
          height: 128px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 50%;
          margin-right: -64px;
          margin-top: -64px;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .feature-card:hover::before {
          opacity: 1;
        }
        .icon-box {
          width: 56px;
          height: 56px;
          background-color: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: #4f46e5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      
      <div className="d-flex flex-column min-vh-100 bg-light-gray">
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center pt-5 pb-5 px-3 px-md-4 px-lg-5">
          {/* Main Application Container */}
          <div className="w-100 container-xl">
            
            {/* Hero Section */}
            <header className="text-center mx-auto d-flex flex-column align-items-center" style={{maxWidth: '48rem'}}>
              
              {/* Status Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill badge-custom shadow-sm small fw-medium mb-4 mt-3">
                <span className="pulse-dot"></span>
                Next-Gen Travel Platform
              </div>

              {/* Title */}
              <h1 className="display-3 fw-bold text-dark mb-4">
                Discover Amazing <br className="d-none d-sm-block" />
                <span className="text-indigo">Travel Experiences</span>
              </h1>

              {/* Description */}
              <p className="fs-5 text-secondary mb-4" style={{maxWidth: '42rem'}}>
                Share your adventures and explore unique travel experiences from around the world. Connect with travelers and create unforgettable memories locally and globally.
              </p>

              {/* Call to Actions (CTAs) */}
              <div className="d-flex flex-column flex-sm-row gap-3 w-100 justify-content-center align-items-center mt-2">
                <Link
                  href="/feed"
                  className="btn bg-indigo text-white fw-medium px-4 py-3 rounded-3 shadow w-100 w-sm-auto d-inline-flex align-items-center justify-content-center text-decoration-none"
                  style={{minWidth: '180px'}}
                >
                  Explore Experiences
                </Link>
                <Link
                  href="/register"
                  className="btn btn-outline-custom fw-medium px-4 py-3 rounded-3 shadow-sm w-100 w-sm-auto d-inline-flex align-items-center justify-content-center text-decoration-none"
                  style={{minWidth: '180px'}}
                >
                  Get Started
                </Link>
              </div>
            </header>

            {/* Features Grid Section */}
            <section className="mt-5 w-100">
              <div className="row g-4">
                
                {/* Explore Card */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="feature-card bg-white rounded-4 p-4 border shadow-sm h-100">
                    <div style={{position: 'relative', zIndex: 10}}>
                      <div className="icon-box mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                      </div>
                      <h3 className="fs-4 fw-bold text-dark mb-3">Explore</h3>
                      <p className="text-secondary">
                        Browse through amazing travel experiences shared by adventurers worldwide. Uncover hidden gems tailored just for you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Card */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="feature-card bg-white rounded-4 p-4 border shadow-sm h-100">
                    <div style={{position: 'relative', zIndex: 10}}>
                      <div className="icon-box mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                      </div>
                      <h3 className="fs-4 fw-bold text-dark mb-3">Share</h3>
                      <p className="text-secondary">
                        Create and publish your own stunning travel experiences with the community. Inspire others with your unique lens.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connect Card */}
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="feature-card bg-white rounded-4 p-4 border shadow-sm h-100">
                    <div style={{position: 'relative', zIndex: 10}}>
                      <div className="icon-box mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <h3 className="fs-4 fw-bold text-dark mb-3">Connect</h3>
                      <p className="text-secondary">
                        Connect with fellow travelers and discover new adventures together. Build lasting friendships globally.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}
