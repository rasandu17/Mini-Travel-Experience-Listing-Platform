import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-bg-section">
        {/* Call to action section */}
        <div className="cta-container text-center">
          <h2 className="cta-title">
            Ready to Start Your Next<br />Adventure?
          </h2>
          <button className="btn-plan-safari">
            Plan Your Safari Now
          </button>
        </div>

        {/* Footer links */}
        <div className="footer-links-container">
          <ul className="footer-links d-flex justify-content-center flex-wrap">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/destination">Destination</Link></li>
            <li><Link href="/upcoming">Upcoming Tour</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/404">404</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Separator */}
        <div className="container px-4 px-md-5">
          <hr className="footer-separator" />
        </div>

        {/* Main Footer Content */}
        <div className="container px-4 px-md-5 footer-main-content">
          <div className="row align-items-center justify-content-between">
            {/* Contact Us */}
            <div className="col-md-4 mb-4 mb-md-0 contact-section">
              <h5 className="section-title">Contact us</h5>
              <div className="contact-item d-flex align-items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e57b2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>(555) 123-4567</span>
              </div>
              <div className="contact-item d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e57b2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span>info@safario.com</span>
              </div>
            </div>

            {/* Logo area */}
            <div className="col-md-4 mb-4 mb-md-0 text-center logo-section position-relative py-4">
              <div className="vertical-line-left d-none d-md-block"></div>
              <div className="logo d-flex align-items-center justify-content-center">
                <div className="logo-icon me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e57b2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 2a8 8 0 0 0-8 8c0 1.89.63 3.62 1.67 5"></path>
                    <path d="M12 2a8 8 0 0 1 8 8c0 1.89-.63 3.62-1.67 5"></path>
                  </svg>
                </div>
                <h3 className="logo-text mb-0">Safario</h3>
              </div>
              <div className="vertical-line-right d-none d-md-block"></div>
            </div>

            {/* Office section */}
            <div className="col-md-4 mb-4 mb-md-0 office-section d-flex flex-column align-items-md-end text-md-end">
              <div className="text-start">
                <h5 className="section-title">Office</h5>
                <div className="office-item d-flex align-items-start mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e57b2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 mt-1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>
                    Brooklyn Heights, Los<br />
                    Angeles, California
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="container px-4 px-md-5">
          <hr className="footer-separator" />
        </div>

        {/* Bottom Footer */}
        <div className="container px-4 px-md-5 footer-bottom pb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
            <p className="copyright-text mb-2 mb-md-0">
              © Copyright 2026, All Rights Reserved by UiMile - Powered by framer
            </p>
            <div className="bottom-links">
              <Link href="/privacy" className="me-4 text-decoration-none">Privacy Policy</Link>
              <Link href="/terms" className="text-decoration-none">Terms and Condition</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          color: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-top: auto;
        }

        .footer-bg-section {
          background: linear-gradient(180deg, rgba(61, 44, 31, 0) 0%, rgba(61, 44, 31, 0.8) 250px, rgba(61, 44, 31, 1) 400px), url('https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') no-repeat center top;
          background-size: 100% auto;
          background-color: #3d2c1f;
          padding-top: 150px;
        }

        .cta-container {
          margin-bottom: 80px;
        }

        .cta-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 30px;
          letter-spacing: -0.02em;
        }

        .btn-plan-safari {
          background-color: white;
          color: #3d2c1f;
          border: none;
          padding: 16px 36px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }

        .btn-plan-safari:hover {
          background-color: #f8f9fa;
          transform: translateY(-2px);
        }

        .footer-links-container {
          margin-bottom: 40px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 30px;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #e57b2f;
        }

        .footer-separator {
          border-color: rgba(255, 255, 255, 0.2);
          margin: 30px 0;
        }

        .footer-main-content {
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .contact-item, .office-item {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .logo-text {
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: -0.03em;
        }

        .vertical-line-left, .vertical-line-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .vertical-line-left {
          left: 0;
        }

        .vertical-line-right {
          right: 0;
        }

        .copyright-text, .bottom-links a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .bottom-links a {
          transition: color 0.2s;
        }

        .bottom-links a:hover {
          color: white;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 2.5rem;
            padding: 0 20px;
          }
          .footer-bg-section {
            padding-top: 100px;
            background: linear-gradient(180deg, rgba(61, 44, 31, 0) 0%, rgba(61, 44, 31, 0.8) 150px, rgba(61, 44, 31, 1) 250px), url('https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80') no-repeat center top;
            background-size: 100% auto;
          }
        }
      `}</style>
    </footer>
  );
}
