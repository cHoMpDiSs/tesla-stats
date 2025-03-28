import { parse } from 'cookie'

export default async function handler(req, res) {
    const { id } = req.query;
  
    const cookies = parse(req.headers.cookie || '');  
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    if (!accessToken || !refreshToken) {
      return res.status(400).json({ error: 'Missing access or refresh token' });
    }
    try {
      // Fetch vehicle data from Tesla API
      const vehicleData = await fetch(
        `${process.env.TESLA_API_URL}/api/1/vehicles/${id}/vehicle_data`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      if (!vehicleData.ok || vehicleData.response === null) {
        const errorText = await vehicleData.json(); 
        console.error(errorText);
        if(errorText.error === "vehicle unavailable: vehicle is offline or asleep"
        ) {
          return res.status(500).json({ error: "Vehicle offline or asleep" });
        }else{
        return res.status(500).json({ error: "Failed to fetch vehicle data" });
        }
      }
  
      // Parse the response JSON safely
      const carData = await vehicleData.json();
  
      if (!carData || !carData.response) {
        return res.status(500).json({ error: "Invalid vehicle data response" });
      }
  
      return res.status(200).json(carData.response);
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  