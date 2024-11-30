// api/getUserAccount.js
export default async function handler(req, res) {
    try {
      // Fetch the token from the token endpoint
      const tokenRes = await fetch(`${process.env.BASE_URL}/api/getToken`);
      const tokenData = await tokenRes.json();
  
      if (!tokenRes.ok || !tokenData.access_token) {
        return res.status(400).json({ error: "Failed to get token" });
      }
  
      const token = tokenData.access_token;
  
      // Set up the authorization header
      const headers = { Authorization: `Bearer ${token}` };
  
      // Fetch the user account information from the /me endpoint
      const accountRes = await fetch(`${process.env.TESLA_API_URL}/api/1/users/me`, { headers });
  
      // Check if the response is okay
      if (!accountRes.ok) {
        const errorMessage = `Failed to fetch account info. Status: ${accountRes.status} ${accountRes.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
  
      // Parse the response as JSON
      const accountData = await accountRes.json();
  
      // Log the account data for debugging
      console.log('Account Data:', accountData);
  
      // If account data is not found or invalid, return a 404 error
      if (!accountData.response) {
        const errorMessage = "Account data not found.";
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
  
      // Return the account data to the client
      return res.status(200).json(accountData.response);
    } catch (err) {
      // Catch and log any error that occurs
      console.error("Error fetching account data:", err.message);
  
      // Send a response back to the client with error details
      return res.status(500).json({ error: "Failed to fetch account data", details: err.message });
    }
  }
  