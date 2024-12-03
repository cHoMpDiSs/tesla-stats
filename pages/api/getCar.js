// api/getCar.js
export default async function handler(req, res) {
  try {
    const { token } = req.body;
    // const tokenRes = await fetch(`${process.env.BASE_URL}/api/getToken`);
    // const tokenData = await tokenRes.json();
    
    if (!tokenRes.ok || !tokenData.access_token) {
      return res.status(400).json({ error: "Failed to get token" });
    }

    // const token = tokenData.access_token;
    // const token = "NA_ad1e3be60d0ee140a8e1d441d934b95701910105eb778017a9949c398ca3"



    const vehicleRes = await fetch(`${process.env.TESLA_API_URL}/api/1/vehicles`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }
  );
  
    


    if (!vehicleRes.ok || !vehicleData.response || vehicleData.response.length === 0) {
      return res.status(404).json({ error: "No vehicles found" });
    }
    const vehicleData = await vehicleRes.json();
    const vehicleId = vehicleData.response[0].id;
    const carDataRes = await fetch(`${process.env.TESLA_API_URL}/api/1/vehicles/${vehicleId}/vehicle_data`, { headers });
    const carData = await carDataRes.json();

    if (!carDataRes.ok || !carData.response) {
      return res.status(500).json({ error: "Failed to fetch vehicle data" });
    }

    return res.status(200).json(carData.response);
  } catch (err) {
    console.error("Error fetching vehicle data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
