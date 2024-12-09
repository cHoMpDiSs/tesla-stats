export default async function handler(req, res) {
    const { id } = req.query;
  
    const token = req.cookies.token;
    console.log("TOKEN", token , "--------")
  
    if (!token) {
      return res.status(400).json({ error: "Failed to get token" });
    }
  
    try {
      const fartData = await fetch(
        `${process.env.TESLA_API_URL}/api/1/vehicles/${id}/command/remote_boombox`,
        {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            sound: 0,
          }),
        }
      );
      
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
  