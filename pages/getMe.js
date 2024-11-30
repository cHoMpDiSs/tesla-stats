// components/UserAccount.js
import { useEffect, useState } from 'react';

const UserAccount = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const response = await fetch('/api/getMe'); // Call the API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch account data');
        }
        const data = await response.json();
        setAccountData(data); // Store the account data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false when the request is finished
      }
    };

    fetchUserAccount(); // Fetch the data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading account data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!accountData) {
    return <div>No account data available.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Account Information</h2>
      <div className="space-y-4">
        <p><strong>Email:</strong> {accountData.email}</p>
        <p><strong>Account Type:</strong> {accountData.account_type}</p>
        <p><strong>Car Access:</strong> {accountData.car_access ? 'Yes' : 'No'}</p>
        {/* You can display other fields depending on the accountData structure */}
      </div>
    </div>
  );
};

export default UserAccount;
