'use client'
import { useState } from 'react';

export default function GetPublicKey() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

  const fetchPublicKey = async () => {
    setLoading(true);
    setError(null);
    setPublicKey(null);

    try {
      const response = await fetch('/api/checkStatus');
      const data = await response.json();

      if (response.ok) {
        setPublicKey(data); // Set public key data if successful
      } else {
        setError(data.error || 'Failed to fetch public key');
      }
    } catch (err) {
      setError('Error fetching public key');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Get Tesla Public Key</h1>
      <button
        onClick={fetchPublicKey}
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Public Key'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {publicKey && (
        <div className="mt-4">
          <h2 className="font-semibold">Public Key:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(publicKey, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
