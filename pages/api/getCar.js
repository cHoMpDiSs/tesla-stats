


export default async function handler(req, res) {

  const getToken = async () => {
    try {
      const tokenResponse = await fetch(`${process.env.BASE_URL}/api/getToken`);
      const tokenData = await tokenResponse.json();
      if (!tokenData.access_token) {
        throw new Error("No access token returned from getToken API");
      }
      return tokenData.access_token;
    } catch (error) {
      throw new Error("Error fetching token: " + error.message);
    }
  };

  try {
    // Step 1: Get the token
    const token = await getToken();
    console.log(token)
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Step 2: Get the list of vehicles
    console.log(`${process.env.TESLA_API_URL}/api/1/vehicles/`)
    const vehicleResponse = await fetch(`${process.env.TESLA_API_URL}/api/1/vehicles/`, { headers });
    
    const vehicleData = await vehicleResponse.json();
    console.log(vehicleData)

    if (!vehicleData.response || vehicleData.response.length === 0) {
      return res.status(404).json({ error: "No vehicles found" });
    }

    const vehicleId = vehicleData.response[0].id;

    // Step 3: Get the entire car object
    const carDataResponse = await fetch(
      `${process.env.TESLA_API_URL}/api/1/vehicles/${vehicleId}/vehicle_data`,
      { headers }
    );
    const carData = await carDataResponse.json();

    if (!carData.response) {
      return res.status(500).json({ error: "Failed to fetch car data" });
    }

    return res.status(200).json(carData.response);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred", details: error.message });
  }
}
