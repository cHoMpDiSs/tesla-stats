"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CircularProgress } from "@mui/material";

export default function VehicleData() {
  const [vehicleData, setVehicleData] = useState(null);
  const [polling, setPolling] = useState(false);
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
        console.log(data, "THIS IS THAT DATA");
        if (vehicleRes.ok) {
          setVehicleData(data.response);
        } else {
          setError(data.error || "Failed to fetch vehicle data");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch vehicle data");
      }
    }

    fetchVehicleData();
  }, []);

  console.log(vehicleData, "VEHICLE DATA");

  if (
    error === "token expired" ||
    error === "failed to get token" ||
    error === "Missing access or refresh token"
  ) {
    router.push("/auth");
    return null;
  } else if (error) {
    return <>{error}</>;
  } else if (vehicleData == null) {
    return <p>Loading...</p>;
  }

  async function wakeUpAndPoll(vin) {
    setPolling(true); // Start polling
    try {
      const wakeUpRes = await fetch(`/api/wakeUp?vin=${vin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!wakeUpRes.ok) {
        const data = await wakeUpRes.json();
        setError(data.error || "Failed to wake vehicle");
        setPolling(false); // End polling
        return;
      }

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

        if (vehicleRes.ok && data!== null) {
          updatedVehicleData = data.find((vehicle) => vehicle.vin === vin);
          if (updatedVehicleData && updatedVehicleData.state === "online") {
            setVehicleData(data);
            setPolling(false); // End polling
            return;
          }
        }

        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      setError("Vehicle did not wake up within the expected time frame.");
    } catch (err) {
      setError(err.message || "Failed to wake vehicle");
    } finally {
      setPolling(false); // Ensure polling ends in all cases
    }
  }

  const goToVehiclePage = (id, vin) => {
    console.log(id, vin);
    router.push(`/vehicle?id=${id}&vin=${vin}`);
  };

  return (
    vehicleData && (
      <div className="mx-4">
        <p className="text-3xl">Vehicle Data</p>
        <ul>
          {vehicleData.map((vehicle) => (
            <Card key={vehicle.id} className="w-1/2 p-4 mx-auto ">
              <CardContent>
                <p>
                  <strong>Model:</strong> {vehicle.vin[3]}
                </p>
                <p>
                  <strong>ID:</strong> {vehicle.id}
                </p>
                <p>
                  <strong>VIN:</strong> {vehicle.vin}
                </p>
                <p>
                  <strong>Color:</strong> {vehicle.color}
                </p>
                <p>
                  <strong>State:</strong> {vehicle.state}
                </p>
              </CardContent>
              {vehicle.state === "offline" || vehicle.state === "asleep" ? (
                polling ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress size={40} color="primary" />
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => wakeUpAndPoll(vehicle.vin)}
                  >
                    Wake Up
                  </Button>
                )
              ) : (
                <Button
                  variant="contained"
                  onClick={() => goToVehiclePage(vehicle.id, vehicle.vin)}
                >
                  {vehicle.display_name} Data
                </Button>
              )}
            </Card>
          ))}
        </ul>
      </div>
    )
  );
}
