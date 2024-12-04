export default async function handler(req, res) {
  const { id } = req.query;

  const parseCookies = (cookieHeader = "") =>
    Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => cookie.split("="))
    );

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;
  
  // Validate token
  if (!token) {
    return res.status(400).json({ error: "Failed to get token" });
  }

  try {
    // Fetch vehicle lis

    // Fetch specific vehicle data
    const vehicleData = await fetch(
        `${process.env.TESLA_API_URL}/api/1/vehicles/${id}/vehicle_data`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      console.log("Status:", vehicleData.status);
      console.log("Headers:", vehicleData.headers);
      const textResponse = await vehicleData.text(); // Read as text to inspect raw response
      console.log("Raw response:", textResponse);
      
      if (!vehicleData.ok) {
        return res.status(500).json({ error: "Failed to fetch vehicle data" });
      }

    // Parse car data response
    if (!vehicleData.ok) {
      return res.status(500).json({ error: "Failed to fetch vehicle data" });
    }
    const carData = await vehicleData.json();

    // Validate car data
    if (!carData.response) {
      return res.status(500).json({ error: "Invalid vehicle data response" });
    }

    return res.status(200).json(vehicleData.response);
  } catch (err) {
    console.error("Error fetching vehicle data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
