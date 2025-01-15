// pages/api/getMe.js

export default async function handler(req, res) {
  const parseCookies = (cookieHeader = '') =>
  Object.fromEntries(
    cookieHeader.split('; ').map((cookie) => cookie.split('='))
  );

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  // Validate token
  if (!token) {
    return res.status(400).json({ error: "Failed to get token" });
  }
  try {
   
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
