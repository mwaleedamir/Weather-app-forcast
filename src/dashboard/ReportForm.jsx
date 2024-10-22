import React, { useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, push } from 'firebase/database';

const ReportForm = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const submitReport = (e) => {
    e.preventDefault();
    push(ref(database, 'reports/'), {
      location,
      description,
    });
    setLocation('');
    setDescription('');
    alert('Flood report submitted');
  };

  return (
    <section id="report" className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Report a Flood</h2>
      <form onSubmit={submitReport} className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Submit Report</button>
      </form>
    </section>
  );
};

export default ReportForm;
