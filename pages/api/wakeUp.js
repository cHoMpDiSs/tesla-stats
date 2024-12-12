import { parse } from 'cookie';
export default async function handler(req, res) {
    const { vin } = req.query;
  
    const cookies = parse(req.headers.cookie || '');  


  const token = cookies.access_token;

  
    if (!token) {
      return res.status(400).json({ error: "Failed to get token" });
    }
  
    try {
      // Fetch vehicle data from Tesla API
      const vehicleWakeData = await fetch(
        `${process.env.TESLA_API_URL}/api/1/vehicles/${vin}/wake_up`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!vehicleWakeData.ok) {
        const errorText = await vehicleWakeData.text(); // Read response for error details
        console.error("Failed to wake vehicle data:", errorText);
        return res.status(500).json({ error: "Failed to wake vehicle " });
      }
  
      // Parse the response JSON safely
      const wakeData = await vehicleWakeData.json();
  
      if (!wakeData || !wakeData.response) {
        return res.status(500).json({ error: "Invalid vehicle wake data response" });
      }
  
      return res.status(200).json(wakeData.response);
    } catch (err) {
      console.error("Error waking vehicle:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  