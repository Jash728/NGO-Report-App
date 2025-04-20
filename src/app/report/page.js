'use client';

import { useState } from 'react';

export default function ReportFormPage() {
  const [form, setForm] = useState({
    ngoId: '',
    month: '',
    peopleHelped: '',
    eventsConducted: '',
    fundsUtilized: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          peopleHelped: Number(form.peopleHelped),
          eventsConducted: Number(form.eventsConducted),
          fundsUtilized: Number(form.fundsUtilized),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Report submitted successfully!');
        setForm({
          ngoId: '',
          month: '',
          peopleHelped: '',
          eventsConducted: '',
          fundsUtilized: '',
        });
      } else {
        setMessage(data.message || ' Submission failed.');
      }
    } catch (err) {
      setMessage('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
        📋 NGO Monthly Report
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {['ngoId', 'month', 'peopleHelped', 'eventsConducted', 'fundsUtilized'].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'month' ? 'month' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-medium text-white transition-colors ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>

        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
