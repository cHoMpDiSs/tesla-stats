"use client";
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
        const vehicleRes = await fetch("/api/getCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }), // Send the token to the backend
        });

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

    if (token) {
      fetchVehicleData();
    }
  }, [token]); // Trigger effect when `token` is available

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!vehicleData) {
    return <p>Loading...</p>;
  }
console.log(vehicleData)
  return (
    <div>
      <h1>Vehicle Data</h1>
      <ul>
        <li>
          <p><strong>ID:</strong> {vehicleData.id}</p>
          <p><strong>VIN:</strong> {vehicleData.vin}</p>
          <p><strong>Color:</strong> {vehicleData.color}</p>
          <p><strong>State:</strong> {vehicleData.state}</p>
          {/* Render other fields as needed */}
        </li>
      </ul>
    </div>
  );
}
