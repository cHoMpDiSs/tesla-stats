
import {cookies} from 'next/headers'

export default async function handler(req, res) {
  const { code, state } = req.body;
  const cookieStore = cookies();
  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const { TESLA_CLIENT_ID, TESLA_CLIENT_SECRET, TESLA_OAUTH_URL } = process.env;

  // Prepare the request to exchange the authorization code for a token
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', TESLA_CLIENT_ID);
  params.append('client_secret', TESLA_CLIENT_SECRET);
  params.append('redirect_uri', 'https://chili-hazel.vercel.app/auth/callback'); // This must match the redirect URI in Tesla's app setup
  params.append('code', code);

  try {
    const response = await fetch(`${TESLA_OAUTH_URL}/token`, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
  
    
    if (response.ok) {
      cookieStore.set('token', data, {
        httpOnly: true, // Prevent client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        path: '/', // Make the cookie available across the app
        sameSite: 'strict', // Prevent CSRF
      });
      return res.status(200).json({success: "Token Secured"}); // Return the token response
    } else {
      return res.status(400).json({ error: data.error || 'Error exchanging code for token' });
    }
  } catch (error) {
    console.error('Error exchanging code:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
