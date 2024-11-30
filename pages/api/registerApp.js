

export default async function handler(req, res) {
    const sendToken = async () => {
        try {
            const tokenRes = await fetch(`${process.env.BASE_URL}/api/getToken`);
            const tokenData = await tokenRes.json();

            if (!tokenRes.ok || !tokenData.access_token) {
                throw new Error("Failed to get token");
            }

            const accessToken = tokenData.access_token;
            const apiUrl = 'https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/partner_accounts';
            const domain = 'https://chili-hazel.vercel.app';  // Use the full protocol with domain
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ domain }) // Body with the full URL including protocol
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('SendToken Error:', error.message);
            throw new Error(`SendToken Error: ${error.message}`);
        }
    };

    try {
        const data = await sendToken();
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
}
