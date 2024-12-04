"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VehicleData() {
  const router = useRouter();

  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const vehicleRes = await fetch("/api/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

  
      fetchVehicleData();
    
  }, []); // Trigger effect when `token` is available

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
      {vehicleData.map((vehicle) => (
        <li key={vehicle.id}>
          <p><strong>Display Name:</strong> {vehicle.display_name}</p>
          <p><strong>ID:</strong> {vehicle.id}</p>
          <p><strong>VIN:</strong> {vehicle.vin}</p>
          <p><strong>Color:</strong> {vehicle.color}</p>
          <p><strong>State:</strong> {vehicle.state}</p>
          <Link href={`/vehicle?vehicleId=${vehicle.id}`}>
          {vehicle.display_name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
}
