import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const { TESLA_CLIENT_ID, TESLA_CLIENT_SECRET, TESLA_OAUTH_URL, REDIRECT_URI } = process.env;

  // Prepare the request to exchange the authorization code for a token
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', TESLA_CLIENT_ID);
  params.append('client_secret', TESLA_CLIENT_SECRET);
  params.append('redirect_uri', REDIRECT_URI); // This must match the redirect URI in Tesla's app setup
  params.append('code', code);

  try {
    const response = await fetch(`${TESLA_OAUTH_URL}`, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    console.log(data, "DATA IN API")
    if (response.ok) {
      const { access_token, refresh_token, expires_in } = data;

      // Define cookie options
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
      };

      // Set access token cookie
      res.setHeader(
        'Set-Cookie',
        [
          serialize('access_token', access_token, {
            ...cookieOptions,
            maxAge: expires_in, // Access token expiration
          }),
          serialize('refresh_token', refresh_token, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60, // Example: 30 days for refresh token
          }),
        ]
      );

      return res.status(200).json({ success: 'Token Secured' });
    } else {
      console.error('Token exchange failed:', data);
      return res.status(400).json({ error: data.error || 'Error exchanging code for token' });
    }
  } catch (error) {
    console.error('Error exchanging code:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
