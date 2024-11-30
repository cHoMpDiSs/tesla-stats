export default async function handler(req, res) {
    const domain = "chili-hazel.vercel.app"; // Set the domain to the desired URL

    const { TESLA_API_URL, TESLA_CLIENT_ID, TESLA_CLIENT_SECRET } = process.env;

    // Construct the URL to fetch the public key using the fixed domain
    const url = `${TESLA_API_URL}/api/1/partner_accounts/public_key?domain=${domain}`;

    try {
        // Fetch the public key from the Tesla API
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${await getToken()}`, // Fetch token using a helper function or from the environment
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        // Check if the response was successful
        if (response.ok) {
            return res.status(200).json(data); // Return the public key
        } else {
            console.error("Error response from Tesla API:", data);
            return res.status(400).json({ error: data.error || "Failed to fetch public key" });
        }
    } catch (error) {
        console.error("Error fetching public key:", error);
        return res.status(500).json({ error: "Server error while fetching public key" });
    }
}

// Helper function to get the access token
async function getToken() {
    const { TESLA_CLIENT_ID, TESLA_CLIENT_SECRET, TESLA_OAUTH_URL } = process.env;
    
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", TESLA_CLIENT_ID);
    params.append("client_secret", TESLA_CLIENT_SECRET);
    params.append("scope", "openid vehicle_device_data vehicle_cmds profile_information offline_access user_data");

    const response = await fetch(TESLA_OAUTH_URL, {
        method: "POST",
        body: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Error fetching token: ${data.error}`);
    }

    return data.access_token;
}
