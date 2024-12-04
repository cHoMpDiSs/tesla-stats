import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GetMe = () => {
  const router = useRouter();
  const { token } = router.query; // Access the token from the query parameters
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Missing access token.");
      setLoading(false);
      return;
    }

    // Use the token to fetch user data
    fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }), // Send the token to the backend
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching user data.");
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
        <p className="text-gray-600 mt-2">Fetching user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Error</h1>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">User Data</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded text-sm text-left">
        {JSON.stringify(userData, null, 2)}
      </pre>
    </div>
  );
};

export default GetMe;
