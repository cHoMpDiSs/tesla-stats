export default async function handler(req, res) {
  const { token } = req.body;
 
    

    // Validate token
    if (!token) {
      return res.status(400).json({ error: "Failed to get token" });
    }
    try {
    // Fetch vehicle list
    const vehicleRes = await fetch(`${process.env.TESLA_API_URL}/api/1/vehicles`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Parse vehicle response
    if (!vehicleRes.ok) {
      return res.status(404).json({ error: "Failed to fetch vehicles" });
    }
    const vehicleData = await vehicleRes.json();

    // Validate vehicle data
    if (!vehicleData.response || vehicleData.response.length === 0) {
      return res.status(404).json({ error: "No vehicles found" });
    }

    // const vehicleId = vehicleData.response[0].id;

    // // Fetch specific vehicle data
    // const carDataRes = await fetch(`${process.env.TESLA_API_URL}/api/1/vehicles/${vehicleId}/vehicle_data`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // // Parse car data response
    // if (!carDataRes.ok) {
    //   return res.status(500).json({ error: "Failed to fetch vehicle data" });
    // }
    // const carData = await carDataRes.json();

    // // Validate car data
    // if (!carData.response) {
    //   return res.status(500).json({ error: "Invalid vehicle data response" });
    // }

    // Return car data
    return res.status(200).json(vehicleData.response);

  } catch (err) {
    console.error("Error fetching vehicle data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
