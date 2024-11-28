export default async function handler(req, res) {
    const { TESLA_CLIENT_ID, TESLA_CLIENT_SECRET, TESLA_OAUTH_URL } = process.env;

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", TESLA_CLIENT_ID);
    params.append("client_secret", TESLA_CLIENT_SECRET);
    params.append("scope", "openid vehicle_device_data vehicle_cmds vehicle_charging_cmds");

    try {
        const response = await fetch(TESLA_OAUTH_URL, {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        const data = await response.json();
        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(400).json({ error: data.error });
        }
    } catch (error) {
        console.error("Error fetching Tesla token:", error);
        return res.status(500).json({ error: "Server error" });
    }
}
