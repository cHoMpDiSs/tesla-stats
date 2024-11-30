
export default async function handler(req, res) {
    const sendToken = async () => {
        try {
            const tokenRes = await fetch(`${process.env.BASE_URL}/api/getToken`);
            const tokenData = await tokenRes.json();
            
            if (!tokenRes.ok || !tokenData.access_token) {
                throw new Error("Failed to get token");
            }

            const accessToken = tokenData.access_token; // Corrected variable name
            const apiUrl = 'https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/partner_accounts';
            console.log(accessToken, "TOKEN")
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), // Empty payload if no data required
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data; // Return the API response
        } catch (error) {
            throw new Error(`SendToken Error: ${error.message}`);
        }
    };

    try {
        const data = await sendToken();
        res.status(200).json({ success: true, data }); // Send success response
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message }); // Handle errors
    }
}



