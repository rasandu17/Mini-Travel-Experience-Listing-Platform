import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { login, saveToken } from '@/utils/api';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(formData);
      saveToken(data.token);
      router.push('/feed');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
        .logo-box {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-btn {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          transition: background-color 0.2s;
        }
        .social-btn:hover {
          background-color: #f9fafb;
        }
        .divider {
          position: relative;
          margin: 1.5rem 0;
        }
        .divider-line {
          border-top: 1px solid #d1d5db;
        }
        .divider-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0 1rem;
          color: #6b7280;
          font-size: 0.875rem;
        }
        .right-panel {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #7c3aed 100%);
          position: relative;
          overflow: hidden;
        }
        .blur-circle-1 {
          position: absolute;
          top: 80px;
          right: 80px;
          width: 288px;
          height: 288px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          filter: blur(60px);
        }
        .blur-circle-2 {
          position: absolute;
          bottom: 80px;
          left: 80px;
          width: 384px;
          height: 384px;
          background: rgba(124, 58, 237, 0.2);
          border-radius: 50%;
          filter: blur(60px);
        }
        .icon-box {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .nav-dot-active {
          background: white;
        }
        .nav-dot-inactive {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>

      <div className="d-flex min-vh-100">
        {/* Left Side - LoginForm */}
        <div className="d-flex align-items-center justify-content-center px-4 px-lg-5 py-5 bg-white" style={{flex: 1}}>
          <div className="w-100" style={{maxWidth: '450px'}}>
            {/* Logo/Brand */}
            <Link href="/" className="d-inline-flex align-items-center text-decoration-none mb-4">
              <div className="logo-box me-3">
                <span style={{fontSize: '24px'}}>🌍</span>
              </div>
              <span className="fs-4 fw-bold text-dark">TravelHub</span>
            </Link>

            {/* Heading */}
            <h1 className="fs-2 fw-bold text-dark mb-2">
              Log in to your Account
            </h1>
            <p className="text-secondary mb-4">Welcome back! Select method to log in:</p>

            {/* Social Login Buttons */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <button type="button" className="social-btn w-100 d-flex align-items-center justify-content-center">
                  <svg style={{width: '20px', height: '20px', marginRight: '8px'}} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="small fw-medium">Google</span>
                </button>
              </div>
              <div className="col-6">
                <button type="button" className="social-btn w-100 d-flex align-items-center justify-content-center">
                  <svg style={{width: '20px', height: '20px', marginRight: '8px'}} fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="small fw-medium">Facebook</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">or continue with email</div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label small fw-medium d-flex align-items-center">
                  <svg style={{width: '16px', height: '16px', marginRight: '6px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label small fw-medium d-flex align-items-center">
                  <svg style={{width: '16px', height: '16px', marginRight: '6px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <Link href="#" className="small text-primary text-decoration-none fw-medium">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 fw-medium"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-secondary mt-4 small">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary text-decoration-none fw-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration/Branding */}
        <div className="right-panel d-none d-lg-flex align-items-center justify-content-center p-5" style={{flex: 1}}>
          <div className="blur-circle-1"></div>
          <div className="blur-circle-2"></div>

          <div className="text-center text-white" style={{position: 'relative', zIndex: 10, maxWidth: '500px'}}>
            {/* Icon Decorations */}
            <div className="d-flex justify-content-center gap-4 mb-5">
              <div className="icon-box">
                <svg style={{width: '32px', height: '32px'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              <div className="icon-box">
                <svg style={{width: '32px', height: '32px'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="icon-box">
                <svg style={{width: '32px', height: '32px'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="display-5 fw-bold mb-3">
              Connect with every application
            </h2>
            <p className="fs-5" style={{color: '#bfdbfe'}}>
              Everything you need to easily customize your travel dashboard.
            </p>

            {/* Navigation dots */}
            <div className="d-flex justify-content-center gap-2 mt-5">
              <div className="nav-dot nav-dot-active"></div>
              <div className="nav-dot nav-dot-inactive"></div>
              <div className="nav-dot nav-dot-inactive"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
