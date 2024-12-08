export default async function handler(req, res) {
    const { code } = req.body;

    
    
    
    const { TESLA_CLIENT_ID, TESLA_CLIENT_SECRET, TESLA_OAUTH_URL, TESLA_API_URL } = process.env;

    // Ensure required environment variables are set
    if (!TESLA_CLIENT_ID || !TESLA_CLIENT_SECRET || !TESLA_OAUTH_URL || !TESLA_API_URL) {
        return res.status(500).json({ error: "Missing required environment variables" });
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", TESLA_CLIENT_ID);
    params.append("client_secret", TESLA_CLIENT_SECRET);
    params.append("code", code)
    params.append("redirect_uri", "chili-hazel.vercel.app/auth/callback");
    params.append("audience", "https://fleet-api.prd.na.vn.cloud.tesla.com");
    params.append("scope", "openid vehicle_device_data vehicle_cmds profile_information control_vehicle offline_access user_data");

    try {
        const response = await fetch(TESLA_OAUTH_URL, {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        const data = await response.json();
        
        // Check if response is successful and handle errors
        if (response.ok) {
            console.log("Token retrieved successfully")
            return res.status(200).json(data); // Send the token data as a response
        } else {
            console.error("Error response from Tesla API:", data);
            return res.status(400).json({ error: data.error || "Unknown error" }); // Return the error message from Tesla
        }
    } catch (error) {
        console.error("Error fetching Tesla token:", error);
        return res.status(500).json({ error: "Server error while fetching token" });
    }
}
