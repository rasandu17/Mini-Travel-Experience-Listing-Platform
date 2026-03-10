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
      saveToken(data.token);
      
      // Redirect to feed page
      router.push('/feed');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-200 p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle top decoration */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">
              Join our travel community today
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                placeholder="john@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <span className="text-xs text-gray-500">Min. 6 chars</span>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 inline-flex items-center justify-center bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
