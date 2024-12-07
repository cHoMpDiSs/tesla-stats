export default async function handler(req, res) {
    const { id } = req.query;
  
    const parseCookies = (cookieHeader = "") =>
      Object.fromEntries(
        cookieHeader.split("; ").map((cookie) => cookie.split("="))
      );
  
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.token;
  
    if (!token) {
      return res.status(400).json({ error: "Failed to get token" });
    }
  
    try {
      // Fetch vehicle data from Tesla API
      const vehicleData = await fetch(
        `${process.env.TESLA_API_URL}/api/1/vehicles/${id}/vehicle_data`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
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
  