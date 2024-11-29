import { useState, useEffect } from "react";

export default function VehicleData() {
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        // Fetch the token from the backend
        const tokenRes = await fetch("/api/getToken");
        const tokenData = await tokenRes.json();
            console.log(tokenData)
        if (!tokenRes.ok || !tokenData.access_token) {
          setError(tokenData.error || "Failed to get token");
          return;
        }

        const token = tokenData.access_token;

        // Fetch the vehicle data using the token
        const vehicleRes = await fetch("/api/getCar/");

        const data = await vehicleRes.json();
        console.log(data, "here is car data")
        if (vehicleRes.ok) {
          setVehicleData(data);
        } else {
          setError(data.error || "Failed to fetch vehicle data");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch vehicle data");
      }
    }

    fetchVehicleData();
  }, []); // Empty dependency array to run only once after component mounts

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!vehicleData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Vehicle Data</h1>
      <ul>
        <li>
          <h2>{vehicleData.display_name}</h2>
          <p>Battery Level: {vehicleData.charge_state.battery_level}%</p>
          <p>Charging State: {vehicleData.charge_state.charging_state}</p>
        </li>
      </ul>
    </div>
  );
}
