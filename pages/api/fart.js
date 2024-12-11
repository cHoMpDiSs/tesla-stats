import { parse } from 'cookie'

export default async function handler(req, res) {
    const { id } = req.query;
  
    const cookies = parse(req.headers.cookie || '');  
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    if (!accessToken || !refreshToken) {
      return res.status(400).json({ error: 'Missing access or refresh token' });
    }

    try {
      const fartData = await fetch(
        `${process.env.TESLA_API_URL}/api/1/vehicles/${id}/command/remote_boombox`,
        {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            sound: 0,
          }),
        }
      );
      console.log(fartData, "FART DATA")
      if (fartData.ok) {
        console.log("Fart noise triggered successfully!");
      } else {
        const error = await fartData.json();
        console.error("Failed to trigger fart noise:", error);
      }
  
      return res.status(200).json(fartData.response);
    } catch (err) {
      console.error("Error farting vehicle:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  