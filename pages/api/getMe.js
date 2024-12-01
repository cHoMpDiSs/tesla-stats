// pages/api/getMe.js

export default async function handler(req, res) {
  const { token } = req.body;

  // Validate the incoming data
  if (!token) {
    console.error("Missing code or state in request body.");
    return res.status(400).json({ error: "Missing code or state" });
  }

  try {
    // Exchange the code for a token directly with the Tesla API
      // const tokenResponse = await fetch(`${process.env.TESLA_API_URL}/oauth2/v3/token`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     grant_type: "authorization_code",
      //     client_id: process.env.TESLA_CLIENT_ID,
      //     client_secret: process.env.TESLA_CLIENT_SECRET,
      //     code,
      //     redirect_uri: process.env.REDIRECT_URI,
      //   }),
      // });

      // if (!tokenResponse.ok) {
      //   const errorText = await tokenResponse.text();
      //   console.error("Failed to retrieve token:", errorText);
      //   return res.status(400).json({ error: "Failed to retrieve token" });
      // }

      // const tokenData = await tokenResponse.json();

      // // Check for access token
      // const token = tokenData.access_token;
      // if (!token) {
      //   console.error("Access token not found in response:", tokenData);
      //   return res.status(400).json({ error: "Access token missing in response" });
      // }

    // Use the token to fetch user data from the Tesla API
    const userResponse = await fetch(`${process.env.TESLA_API_URL}/api/1/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch user data:", errorText);
      return res.status(400).json({ error: "Failed to fetch user data" });
    }

    const userData = await userResponse.json();

    // Return the user data as a JSON response
    return res.status(200).json(userData);

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
