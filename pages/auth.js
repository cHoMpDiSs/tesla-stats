import React from 'react';

const TeslaAuth = () => {

    console.log(process.env.NEXT_PUBLIC_CLIENT_ID, "<-------client id")
    console.log(process.env.NEXT_PUBLIC_REDIRECT_URI)
    // Function to generate a random state for security purposes
    const generateState = () => {
        return Math.random().toString(36).substring(2, 15);  // Random string for state
    };

    const state = generateState();  // Generate a random state value

    const scope = "openid offline_access user_data vehicle_device_data vehicle_cmds vehicle_charging_cmds";  // Scopes you need

    // Function to initiate the authorization flow
    const handleAuthRedirect = () => {
        const authorizationUrl = `https://auth.tesla.com/oauth2/v3/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&locale=en-US&prompt=login&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;

        // Store the state in sessionStorage or localStorage to verify it later
        sessionStorage.setItem('state', state);

        // Redirect the user to the authorization URL
        window.location.href = authorizationUrl;
    };

    return (
        <div>
            <h1>Login with Tesla</h1>
            <button onClick={handleAuthRedirect}>Authorize with Tesla</button>
        </div>
    );
};

export default TeslaAuth;
