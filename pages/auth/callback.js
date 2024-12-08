import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter()
  useEffect(() => {
  
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
          setToken(data.access_token);
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
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">
          Processing your Tesla account...
        </h1>
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

  const redirectTo = (link) =>{
    router.push(`/${link}`)
  }



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Success!</h1>
      <p className="text-gray-600 mt-2">
        Your Tesla account has been successfully linked.
      </p>
      <Button
      variant="contained"
        onClick={() =>{redirectTo('account')}}
      >
        My Account
      </Button>
      <Button
      variant="contained"
         onClick={() =>{redirectTo('vehicles')}}
      >
       Vehicles
      </Button>
    </div>
  );
};

export default AuthCallback;
