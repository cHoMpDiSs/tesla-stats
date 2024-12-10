import { parse } from 'cookie';

export default async function handler(req, res) {

  const cookies = parse(req.headers.cookie || '');  


  const accessToken = cookies.access_token;
  const refreshToken = cookies.refresh_token;


  if (!accessToken || !refreshToken) {
    return res.status(400).json({ error: 'Missing access or refresh token' });
  }

  try {
   
    const vehicleRes = await fetch(`${process.env.TESLA_API_URL}/api/1/vehicles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const vehicleData = await vehicleRes.json();

    if (vehicleRes.ok) {
      return res.status(200).json(vehicleData);
    } else {
      return res.status(400).json({ error: 'Error fetching vehicle data' });
    }
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
