export default async function handler(req, res) {
  const { vehicleId } = req.body;

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
      `${process.env.TESLA_API_URL}/api/1/vehicles/${vehicleId}/vehicle_data`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

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
