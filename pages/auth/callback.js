import { useEffect, useState } from "react";

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("")

  useEffect(() => {
    // Retrieve the authorization code and state from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code, "CODE")
    if (code) {
      // Call the API to exchange the code for a token
      fetch("/api/getToken", {
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
          console.log("Token data:", data); // Handle the token data (e.g., save it to state or context)
          setToken(data)
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
  console.log(token, "TOKEN")
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
    </div>
  );
};

export default AuthCallback;
