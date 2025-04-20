'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center bg-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-700">
        🌍 NGO Impact Tracker
      </h1>
      <p className="text-gray-600 mb-12 max-w-xl text-lg">
        A simple web app to help NGOs report their monthly activities and for admins to view impact summaries.
      </p>

      <div className="flex flex-col sm:flex-row gap-5">
        <Link href="/report" passHref>
          <div className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg shadow-md transition-colors">
            Submit Report
          </div>
        </Link>

        <Link href="/dashboard" passHref>
          <div className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md text-lg shadow-md transition-colors">
            View Dashboard
          </div>
        </Link>
      </div>
    </div>
  );
}
