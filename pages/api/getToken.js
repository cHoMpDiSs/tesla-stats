import { parse } from "cookie";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");

  const accessToken = cookies.access_token;
  const refreshToken = cookies.refresh_token;

  const {
    TESLA_CLIENT_ID,
    TESLA_CLIENT_SECRET,
    TESLA_OAUTH_URL,
  } = process.env;

  // Ensure required environment variables are set
  if (!TESLA_CLIENT_ID || !TESLA_CLIENT_SECRET || !TESLA_OAUTH_URL) {
    return res
      .status(500)
      .json({ error: "Missing required environment variables" });
  }

 // If no refresh token is present, return an error
  if (!refreshToken) {
    return res.status(400).json({ error: "No refresh token provided" });
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", TESLA_CLIENT_ID);
  params.append("client_secret", TESLA_CLIENT_SECRET);
  params.append("refresh_token", refreshToken);

  try {
    const response = await fetch(TESLA_OAUTH_URL, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Tokens refreshed successfully");

      // Serialize new tokens as cookies
      const newAccessTokenCookie = serialize("access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: data.expires_in, // Set the cookie's expiration based on token lifetime
      });

      const newRefreshTokenCookie = serialize(
        "refresh_token",
        data.refresh_token,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // Refresh token valid for 7 days
        }
      );

      // Set the cookies in the response header
      res.setHeader("Set-Cookie", [newAccessTokenCookie, newRefreshTokenCookie]);

      return res.status(200).json({ message: "Tokens refreshed successfully" });
    } else {
      console.error("Error response from Tesla API:", data);
      return res
        .status(400)
        .json({ error: data.error || "Unknown error during token refresh" });
    }
  } catch (error) {
    console.error("Error fetching Tesla token:", error);
    return res.status(500).json({ error: error});
  }
}
