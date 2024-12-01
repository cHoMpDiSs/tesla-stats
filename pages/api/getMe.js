// pages/api/getMe.js

export default async function handler(req, res) {
    const { code, state } = req.body;
  
    // Validate the incoming data
    if (!code || !state) {
      console.error("Missing code or state in request body.");
      return res.status(400).json({ error: "Missing code or state" });
    }
  
    try {
      // Fetch the token from /api/getToken
      const tokenRes = await fetch(`${process.env.BASE_URL}/api/getToken?code=${code}`);
      const tokenRaw = await tokenRes.text(); // Log raw response body
      let tokenData;
  
      try {
        tokenData = JSON.parse(tokenRaw);
      } catch (e) {
        console.error("Invalid JSON response from /getToken:", tokenRaw);
        return res.status(500).json({ error: "Invalid response from token endpoint" });
      }
  
      // Check if we received a valid access token
      if (!tokenRes.ok || !tokenData.access_token) {
        console.error("Failed to get token:", tokenData);
        return res.status(400).json({ error: "Failed to get token" });
      }
  
      const token = tokenData.access_token;
  
      // Set up headers with the token
      const headers = { Authorization: `Bearer ${token}` };
  
      // Fetch user data from Tesla API
      const userRes = await fetch(`${process.env.TESLA_API_URL}/api/1/users/me`, { headers });
      const userRaw = await userRes.text(); // Log raw response body
      let userData;
  
      try {
        userData = JSON.parse(userRaw);
      } catch (e) {
        console.error("Invalid JSON response from Tesla API:", userRaw);
        return res.status(500).json({ error: "Invalid response from Tesla API" });
      }
  
      // Check if the response contains user data
      if (!userRes.ok || !userData) {
        console.error("Failed to fetch account data:", userRaw);
        return res.status(404).json({ error: "Failed to fetch account data" });
      }
  
      // Return the user data as a JSON response
      return res.status(200).json(userData);
  
    } catch (err) {
      console.error("Error fetching account data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  