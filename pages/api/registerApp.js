

export default async function handler(req, res) {
    const sendToken = async () => {
        console.log(process.env.NEXT_PUBLIC_API_KEY)
        try {
    
            const domain = 'teslastats.dev';  
            const apiUrl = `https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/partner_accounts`;
            const body = {
                "domain": domain
            }
          
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${process.env.TESLA_PARTNER_TOKEN}`,
                    'Content-Type': 'application/json',
                },
          
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
