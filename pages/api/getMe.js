// pages/api/getMe.js
export default async function handler(req, res) {
    try {
      const tokenRes = await fetch(`${process.env.BASE_URL}/api/getToken`);
      const tokenData = await tokenRes.json();
  
      if (!tokenRes.ok || !tokenData.access_token) {
        console.error("Failed to get token:", tokenData); // Add logging for debugging
        return res.status(400).json({ error: "Failed to get token" });
      }
  
      const token = tokenData.access_token;
      const headers = { Authorization: `Bearer ${token}` };
  
      const userRes = await fetch(`${process.env.TESLA_API_URL}/api/1/users/me`, { headers });
      const userData = await userRes.json();
      console.log("Fetching from:", `${process.env.TESLA_API_URL}/api/1/users/me`);
      console.log("Using token:", token);
      if (!userRes.ok) {
        const errorBody = await userRes.text(); // This will give you more info on the error
        console.error(`Failed to fetch account data: ${userRes.status} - ${errorBody}`);
        return res.status(404).json({ error: "Failed to fetch account data" });
      }
      
  
      return res.status(200).json(userData);
    } catch (err) {
      console.error("Error fetching account data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  