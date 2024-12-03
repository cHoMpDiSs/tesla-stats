import Link from "next/link";
import { useEffect, useState } from "react";

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve the authorization code from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Call the API to exchange the code for a token
      fetch("/api/exchangeCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Failed to retrieve token");
          }
          const data = await response.json();
          setToken(data.access_token); // Assuming the token is returned as `access_token`
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("An error occurred while processing your request.");
          setLoading(false);
        });
    } else {
      setError("Authorization code not found.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Processing your Tesla account...</h1>
        <p className="text-gray-600 mt-2">Exchanging code for token...</p>
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
      <h1 className="text-xl font-semibold">Success!</h1>
      <p className="text-gray-600 mt-2">Your Tesla account has been successfully linked.</p>
      <Link
        href={{
          pathname: "/getMe",
          query: { token },
        }}
      >
        <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          My Account
        </a>
      </Link>
      <Link
        href={{
          pathname: "/getCar",
          query: { token },
        }}
      >
        <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          My Car
        </a>
      </Link>
    </div>
  );
};

export default AuthCallback;
