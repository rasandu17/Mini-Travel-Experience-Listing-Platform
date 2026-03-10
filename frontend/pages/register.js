import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { register, saveToken } from '@/utils/api';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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
      const data = await register(formData);
      
      // Save token to localStorage
      if (data && data.token) {
        saveToken(data.token);
      }
      
      // Redirect to feed page
      router.push('/feed');
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          box-shadow: 0 0 0 4px rgba(229, 123, 47, 0.1);
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
      `}</style>

      <div className="auth-container">
        <Navbar />

        <main className="auth-main">
          <div className="auth-card">
            
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join our travel community today</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

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

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label htmlFor="password" className="form-label" style={{ marginBottom: 0 }}>Password</label>
                  <span style={{ fontSize: '0.8rem', color: '#c4b09b', fontWeight: 600 }}>Min. 6 chars</span>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="form-input"
                  style={{ marginTop: '0.5rem' }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-orange-full"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid #e8decb', paddingTop: '1.5rem' }}>
              <p className="auth-link-text">
                Already have an account?{' '}
                <Link href="/login" className="auth-link">
                  Log In
                </Link>
              </p>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
}
