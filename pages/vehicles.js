"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function VehicleData() {
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

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
  }, []);

  console.log(vehicleData);

  if (error === "token expired" || error === "failed to get token") {
    router.push("/auth");
    return null;
  } else if (vehicleData == null) {
    return <p>Loading...</p>;
  }

  async function wakeUpAndPoll(vin) {
    try {
      // Send wake-up request
      const wakeUpRes = await fetch(`/api/wakeUp?vin=${vin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!wakeUpRes.ok) {
        const data = await wakeUpRes.json();
        setError(data.error || "Failed to wake vehicle");
        return;
      }

      // Poll for state updates
      let maxAttempts = 10;
      let attempt = 0;
      let updatedVehicleData = null;

      while (attempt < maxAttempts) {
        const vehicleRes = await fetch("/api/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await vehicleRes.json();

        if (vehicleRes.ok) {
          updatedVehicleData = data.find(vehicle => vehicle.vin === vin);
          if (updatedVehicleData && updatedVehicleData.state === "online") {
            setVehicleData(data);
            return;
          }
        }

        attempt++;
        await new Promise(resolve => setTimeout(resolve, 5000)); 
      }

      setError("Vehicle did not wake up within the expected time frame.");
    } catch (err) {
      setError(err.message || "Failed to wake vehicle");
    }
  }

  const goToVehiclePage = (id, vin) => {
    console.log(id, vin);
    router.push(`/vehicle?id=${id}&vin=${vin}`);
  };

  return vehicleData && (
    <div>
      <h1>Vehicle Data</h1>
      <ul>
        {vehicleData.map((vehicle) => (
          <Card  key={vehicle.id} className="w-">
            <CardContent>
            <p><strong>Model:</strong> {vehicle.vin[3]}</p>
            <p><strong>ID:</strong> {vehicle.id}</p>
            <p><strong>VIN:</strong> {vehicle.vin}</p>
            <p><strong>Color:</strong> {vehicle.color}</p>
            <p><strong>State:</strong> {vehicle.state}</p>
            </CardContent>
            {vehicle.state === "offline" || vehicle.state === "asleep" ? 
              <Button variant="contained" onClick={() => wakeUpAndPoll(vehicle.vin)}>Wake Up</Button> :
              <Button variant="contained" onClick={() => goToVehiclePage(vehicle.id, vehicle.vin)}>
                {vehicle.display_name} Data
              </Button>
            }
          </Card>
        ))}
      </ul>
    </div>
  );
}
