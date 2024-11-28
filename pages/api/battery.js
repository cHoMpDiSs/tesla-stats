export default async function handler(req, res) {
    const BASE_URL = "https://owner-api.teslamotors.com/api/1";
    
    // Fetch the token from your getToken API
    const getToken = async () => {
      try {
        const tokenResponse = await fetch(`${process.env.BASE_URL}/api/getToken`);
        const tokenData = await tokenResponse.json();
        console.log(tokenData)
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
    
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Step 2: Get the list of vehicles
      const vehicleResponse = await fetch(`${BASE_URL}/vehicles`, { headers });
      const vehicleData = await vehicleResponse.json();
  
      if (!vehicleData.response || vehicleData.response.length === 0) {
        return res.status(404).json({ error: "No vehicles found" });
      }
  
      const vehicleId = vehicleData.response[0].id;
  
      // Step 3: Get the battery data (charge state)
      const batteryResponse = await fetch(
        `${BASE_URL}/vehicles/${vehicleId}/data_request/charge_state`,
        { headers }
      );
      const batteryData = await batteryResponse.json();
  
      if (!batteryData.response) {
        return res.status(500).json({ error: "Failed to fetch battery data" });
      }
  
      return res.status(200).json(batteryData.response);
    } catch (error) {
      return res.status(500).json({ error: "An error occurred", details: error.message });
    }
  }
  