// pages/authCallback.js
import { useEffect } from "react";

const AuthCallback = () => {
  useEffect(() => {
    // Retrieve the authorization code from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    // Check if the code exists in the query params
    if (code) {
      // Send the code to your server to exchange it for an access token
      fetch('/api/exchangeCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            console.log('Access token received:', data.access_token);
            // Store the token or proceed to the next step
            // For example, save the token in localStorage or sessionStorage
          } else {
            console.error('Failed to retrieve token:', data);
          }
        })
        .catch(error => {
          console.error('Error exchanging code:', error);
        });
    } else {
      console.error('Authorization code not found.');
    }
  }, []);

  return <div>Processing your Tesla account...</div>;
};

export default AuthCallback;
