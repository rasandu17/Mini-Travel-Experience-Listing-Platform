import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
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
      if (data && data.token) {
        saveToken(data.token);
      }
      router.push('/feed');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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

        .auth-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .auth-main {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .auth-card {
          width: 100%;
          max-width: 450px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(65, 50, 36, 0.08);
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 800;
          color: #413224;
          margin-bottom: 0.5rem;
          text-align: center;
          letter-spacing: -0.5px;
        }

        .auth-subtitle {
          color: #a9927b;
          text-align: center;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #6d5d4b;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          border: 1.5px solid #e8decb;
          background-color: #fcfaf6;
          color: #413224;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          transition: all 0.2s;
          outline: none;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #e57b2f;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(229, 123, 47, 0.12);
        }

        .form-input::placeholder {
          color: #c4b09b;
        }

        .btn-orange-full {
          width: 100%;
          background-color: #e57b2f;
          color: white;
          border-radius: 12px;
          padding: 1rem;
          font-weight: 700;
          border: none;
          transition: background-color 0.3s;
          font-size: 1.05rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-top: 1rem;
          cursor: pointer;
        }

        .btn-orange-full:hover {
          background-color: #cf6922;
        }

        .btn-orange-full:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-link-text {
          color: #6d5d4b;
          font-size: 0.95rem;
          font-weight: 500;
          margin: 0;
        }

        .auth-link {
          color: #e57b2f;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }

        .auth-link:hover {
          color: #cf6922;
          text-decoration: underline;
        }

        .error-message {
          background-color: #fef2f2;
          color: #ef4444;
          padding: 0.8rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
          border: 1px solid #fca5a5;
          text-align: center;
        }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox {
          accent-color: #e57b2f;
          width: 1rem;
          height: 1rem;
          cursor: pointer;
        }

        .forgot-link {
          color: #6d5d4b;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .forgot-link:hover {
          color: #e57b2f;
        }
      `}</style>

      <div className="auth-container">
        <Navbar />

        <main className="auth-main">
          <div className="auth-card">
            
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Log in to your account</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>

              <div className="remember-forgot">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" style={{ fontSize: '0.85rem', color: '#6d5d4b', fontWeight: 500, cursor: 'pointer' }}>
                    Remember me
                  </label>
                </div>
                <Link href="#" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-orange-full"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid #e8decb', paddingTop: '1.5rem' }}>
              <p className="auth-link-text">
                Don't have an account?{' '}
                <Link href="/register" className="auth-link">
                  Sign Up
                </Link>
              </p>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
}
