import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getToken, removeToken } from '@/utils/api';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = getToken();
    setIsLoggedIn(!!token);
  }, [router.pathname]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <>
      <style jsx>{`
        .navbar-custom {
          position: sticky;
          top: 0;
          z-index: 1050;
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          padding-top: 15px;
          padding-bottom: 15px;
        }
        
        .nav-text {
          color: #19211E;
          font-weight: 500;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: color 0.2s;
        }

        .nav-text:hover {
          color: #e57b2f;
        }

        .logo-box {
          color: #e57b2f;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-text {
          color: #413224;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .btn-orange {
          background-color: #e57b2f !important;
          color: white !important;
          border-radius: 50px !important;
          padding: 8px 24px !important;
          font-weight: 700 !important;
          border: none !important;
          transition: background-color 0.3s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: inline-block;
        }

        .btn-orange:hover {
          background-color: #cf6922 !important;
          color: white !important;
        }
        
        .nav-center {
          display: flex;
          align-items: center;
          gap: 30px;
        }
      `}</style>
      
      <nav className="navbar-custom">
        <div className="container-xl px-3 px-sm-4 px-lg-5">
          <div className="d-flex align-items-center justify-content-between w-100">
            
            {/* Logo/Brand */}
            <Link href="/" className="d-flex flex-row align-items-center gap-2 text-decoration-none">
              <div className="logo-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span className="brand-text">
                TravelHub
              </span>
            </Link>

            {/* Middle Nav Links */}
            <div className="d-none d-md-flex align-items-center gap-4 nav-center">
               <Link href="/about" className="text-decoration-none nav-text" style={{ color: '#413224' }}>About Us</Link>
               <Link href="/feed" className="text-decoration-none nav-text" style={{ color: '#413224' }}>Destination</Link>
            </div>

            {/* Right side CTAs */}
            <div className="d-flex flex-row align-items-center gap-2 gap-sm-3">
              {isLoggedIn ? (
                <>
                  <Link href="/create-listing" legacyBehavior passHref>
                    <a
                      className="d-none d-sm-block me-2"
                      style={{
                        color: '#413224',
                        fontWeight: '500',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        textDecoration: 'none'
                      }}
                    >
                      Create Listing
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-orange text-decoration-none"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="d-flex flex-row align-items-center gap-3">
                  <Link href="/login" legacyBehavior passHref>
                    <a
                      className="d-none d-sm-block"
                      style={{
                        color: '#413224',
                        fontWeight: '500',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        textDecoration: 'none'
                      }}
                    >
                      Log In
                    </a>
                  </Link>
                  <Link href="/register" legacyBehavior passHref>
                    <a style={{
                      backgroundColor: '#e57b2f',
                      color: 'white',
                      borderRadius: '50px',
                      padding: '8px 24px',
                      fontWeight: '700',
                      border: 'none',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontFamily: '"Plus Jakarta Sans", sans-serif'
                    }}>
                      Enquire Now
                    </a>
                  </Link>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </nav>
    </>
  );
}
