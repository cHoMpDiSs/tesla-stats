export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat/lng parameters" });
  }

  try {
  

    const response = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey, // Add API Key in Headers
        "X-Goog-FieldMask": "places.displayName,places.location" // Specify response fields
      },
      body: JSON.stringify({
        textQuery: "Tesla Supercharger", // Search specifically for Tesla Superchargers
        maxResultCount: 10, // Limit results
        locationBias: {
          circle: {
            center: { latitude: 34.0522, longitude: -118.2437 }, // Example: Los Angeles
            radius: 50000, // 50km radius
          }
        }
      })
    });
    
    const data = await response.json();
    console.log(data);
    
    res.status(200).json(data);
  
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Tesla chargers" });
  }
}
