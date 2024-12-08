"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function VehicleData() {

  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);


  const router = useRouter()
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
  console.log(vehicleData)

  if (error == "token expired"){
    router.push("/auth")
  }
 
  if (vehicleData == null) {
    return <p>Loading...</p>;
  }
  else if (error) {
    return <p>Error: {error}</p>;
  }
async function wakeUp(vin){
  try {
    const vehicleRes = await fetch(`/api/wakeUp?vin=${vin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await vehicleRes.json();
    if (vehicleRes.ok) {
      router.reload()
    } else {
      setError(data.error || "Failed to  wake vehicle");
    }
  } catch (err) {
    setError(err.message || "Failed to wake vehicle");
  }
}

const goToVehiclePage = (id) =>{
  router.push(`/vehicle?id=${id}`)
}
  

return (
  <div>
    <h1>Vehicle Data</h1>
    <ul>
      {vehicleData.map((vehicle) => (
        <li key={vehicle.id}>
           {vehicle.display_name}
          <p><strong>Display Name:</strong> {vehicle.display_name}</p>
          <p><strong>ID:</strong> {vehicle.id}</p>
          <p><strong>VIN:</strong> {vehicle.vin}</p>
          <p><strong>Color:</strong> {vehicle.color}</p>
          <p><strong>State:</strong> {vehicle.state}</p>
          {vehicle.state == "offline" || vehicle.state == "asleep" ? 
          <Button variant="contained" onClick={() => wakeUp(vehicle.vin)}>Wake Up</Button> :
              <Button variant="contained" onClick={() =>{goToVehiclePage(vehicle.id)}}>
                    {vehicle.display_name} data
              </Button>
          }
      
        </li>
      ))}
    </ul>
  </div>
);
}
