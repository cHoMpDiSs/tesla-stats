"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function VehicleData() {
  const router = useRouter();
  const { token } = router.query; // Access the token from the query parameters
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicleData() {
      try {

        const vehicleRes = await fetch("/api/getCar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }), // Send the token to the backend
        }
        );

        const data = await vehicleRes.json();
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
