import React from "react";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
const TeslaAuth = () => {
  // Function to generate a random state for security purposes
  const generateState = () => {
    return Math.random().toString(36).substring(2, 15); // Random string for state
  };

  const state = generateState(); // Generate a random state value

  const scope =
    "openid offline_access user_data vehicle_device_data vehicle_cmds vehicle_charging_cmds"; // Scopes you need

  // Function to initiate the authorization flow
  const handleAuthRedirect = () => {
    const authorizationUrl = `https://auth.tesla.com/oauth2/v3/authorize?client_id=${
      process.env.NEXT_PUBLIC_CLIENT_ID
    }&locale=en-US&prompt=login&redirect_uri=${
      process.env.NEXT_PUBLIC_REDIRECT_URI
    }&response_type=code&scope=${scope}&state=${state}`;

    // Store the state in sessionStorage or localStorage to verify it later
    sessionStorage.setItem("state", state);

    // Redirect the user to the authorization URL
    window.location.href = authorizationUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-36 ">
      <Card className=" shadow-lg rounded-lg p-8 w-full max-w-md ">
        <h1 className="text-2xl font-bold text-center mb-6 ">
          Login with Tesla
        </h1>
        <Button
          variant="contained"
          onClick={handleAuthRedirect}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2"
        >
          Authorize with Tesla
        </Button>
      </Card>
    </div>
  );
};

export default TeslaAuth;
