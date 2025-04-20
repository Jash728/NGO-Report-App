'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [month, setMonth] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (selectedMonth) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/dashboard?month=${selectedMonth}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.message || 'Failed to fetch dashboard data.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setMonth(defaultMonth);
    fetchData(defaultMonth);
  }, []);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    fetchData(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700">Admin Dashboard</h1>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">Select Month:</label>
        <input
          type="month"
          value={month}
          onChange={handleMonthChange}
          className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {loading ? (
        <p className="text-blue-500 font-medium">Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <DashboardCard label="Total NGOs Reporting" value={data.totalNGOs} />
          <DashboardCard label="People Helped" value={data.totalPeopleHelped} />
          <DashboardCard label="Events Conducted" value={data.totalEventsConducted} />
          <DashboardCard label="Funds Utilized" value={`₹${data.totalFundsUtilized}`} />
        </div>
      ) : (
        <p className="text-gray-500">No reports found for this month.</p>
      )}
    </div>
  );
}

function DashboardCard({ label, value }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold text-blue-800 mt-1">{value}</p>
    </div>
  );
}
