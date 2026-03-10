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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* Logo/Brand */}
          <Link href="/" className="flex flex-row items-center gap-2.5 group flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-600 text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              TravelHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link
              href="/feed"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Explore
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/create-listing"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors whitespace-nowrap"
                >
                  Create Listing
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-row items-center gap-2 border-l border-gray-200 pl-2 ml-2 sm:pl-4 sm:ml-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}
