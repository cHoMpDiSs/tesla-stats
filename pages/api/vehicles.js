

export default async function handler(req, res) {
  const parseCookies = (cookieHeader = '') =>
  Object.fromEntries(
    cookieHeader.split('; ').map((cookie) => cookie.split('='))
  );

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

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

    const vehicleData = await vehicleRes.json();

    console.log(vehicleData)
    // Parse vehicle response
    // if (!vehicleRes.ok) {
    //   return res.status(404).json({ error: "Failed to fetch vehicles" });
    // }
    if (vehicleData.error == 'token expired (401)'){
      return(res.status(404).json({error:"token expired"}))
    }

    // Validate vehicle data
    else if (!vehicleData.response || vehicleData.response.length === 0) {
      return res.status(404).json({ error: "No vehicles found" });
    }

 
    // Return car data
    return res.status(200).json(vehicleData.response);

  } catch (err) {
    console.error("Error fetching vehicle data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
