'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const router = useRouter();

  // Check if the user is authenticated by looking at the cookie
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  // Handle Logout
  const handleLogout = () => {
    Cookies.remove('token'); // Remove the authentication cookie
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-8">
        {/* Dashboard Heading */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6 animate-fade-in">
          Dashboard
        </h1>

        {/* Welcome message */}
        <p className="text-gray-600 text-lg text-center mb-8">
          Welcome, authenticated user!
        </p>

        {/* Logout button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
