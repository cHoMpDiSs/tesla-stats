export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat/lng parameters" });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&keyword=Tesla%20Supercharger&key=${apiKey}`
    );
    const data = await response.json();
    console.log(data)
    res.status(200).json(data);
  
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Tesla chargers" });
  }
}
