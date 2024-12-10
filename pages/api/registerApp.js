

export default async function handler(req, res) {
    const sendToken = async () => {
        try {
    
            console.log(process.env.TESLA_API_TOKEN, "API TOKENN")
            const domain = 'teslastats.dev';  
            const apiUrl = `https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/partner_accounts`;
            const body = {
                "domain": domain
            }
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFEc3NoM2FTV0cyT05YTTdLMzFWV0VVRW5BNCJ9.eyJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJzdWIiOiI4NDk1NmIzYy03ODQzLTRlNjYtYWY2Mi05MjI5ODZlNzAwMDciLCJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92My9udHMiLCJhenAiOiI3NDkyZWY5Yy1mMmZiLTRjYTItOTg0Yy1mMjc1MWMyNTYyZTciLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnRlc2xhLmNvbS9vYXV0aDIvdjMvY2xpZW50aW5mbyIsImh0dHBzOi8vZmxlZXQtYXBpLnByZC5uYS52bi5jbG91ZC50ZXNsYS5jb20iXSwiZXhwIjoxNzMzODkyMjk3LCJpYXQiOjE3MzM4NjM0OTcsImFjY291bnRfdHlwZSI6InBlcnNvbiIsIm9wZW5fc291cmNlIjpmYWxzZSwic2NwIjpbInZlaGljbGVfZGV2aWNlX2RhdGEiLCJ2ZWhpY2xlX2xvY2F0aW9uIiwidmVoaWNsZV9jbWRzIiwidmVoaWNsZV9jaGFyZ2luZ19jbWRzIiwib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiXX0.bo753U-5SUr8AWQ1KGPXWHBAf-9lVuAwRh3YjJ1aLxhVyWpJZ5rfoNipCDvfXcRhZZN-nCVqjU-N3v7e50NbIOxShXOEwEXCQYFuXzkc5z-NYPSdMzOX5zCc6laPLsFodGB6QOnEuO5qQk6c1so6FyW46UPbeEt3Lh9WhtmEogoj_J9D3VgvLMStqyHvJE6wHbsUzCjxdpx5EiPfNuCVR9OJghsq9nAkbsQyWc3yVS5IO_jcXpXa8OvKZb4yiwAiM-s1kWYXV_0Sf-185xyVFwRouUWwG-1RBWBnDZwT3RXdDBT_nASVCxsVN8zL3JlWUdrVMp_vwM94g3wSbO2Zxg`,
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
