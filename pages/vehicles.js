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

  if (
    error === "token expired" ||
    error === "failed to get token" ||
    error === "Missing access or refresh token"
  ) {
    router.push("/auth");
    return null;
  } else if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  } else if (vehicleData == null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

  async function wakeUpAndPoll(vin) {
    setPolling(true);
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
        setPolling(false);
        return;
      }

      let maxAttempts = 5;
      let attempt = 0;

      while (attempt < maxAttempts) {
        const vehicleRes = await fetch("/api/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await vehicleRes.json();

        if (vehicleRes.ok) {
          const updatedVehicleData = data.response.find(
            (vehicle) => vehicle.vin === vin
          );
          if (updatedVehicleData && updatedVehicleData.state === "online") {
            setVehicleData(data.response);
            setPolling(false);
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
      setPolling(false);
    }
  }

  const goToVehiclePage = (id, vin) => {
    router.push(`/vehicle?id=${id}&vin=${vin}`);
  };

  return (
    <div className="min-h-screen  py-8 px-4 ">
      <h1 className="text-4xl  text-center mb-8 ">Fleet</h1>
      <div className="flex flex-col items-center">
        <div
          className={`grid gap-6 ${
            vehicleData.length === 1
              ? "grid-cols-1"
              : vehicleData.length === 2
              ? "grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {vehicleData.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 "
            >
              <CardContent className="p-4">
                <p className="text-lg mb-2">
                  <strong>Model:</strong> {vehicle.vin[3]}
                </p>
                <p className="text-sm mb-1">
                  <strong>ID:</strong> {vehicle.id}
                </p>
                <p className="text-sm mb-1">
                  <strong>VIN:</strong> {vehicle.vin}
                </p>
                <p className="text-sm mb-1">
                  <strong>Color:</strong> {vehicle.color || "Midnight Silver"}
                </p>
                <p className="text-sm mb-1">
                  <strong>State:</strong>{" "}
                  <span
                    className={`${
                      vehicle.state === "online"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {vehicle.state}
                  </span>
                </p>
              </CardContent>
              <div className="p-4 flex justify-center">
                {vehicle.state === "offline" || vehicle.state === "asleep" ? (
                  polling ? (
                    <CircularProgress size={40} color="primary" />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => wakeUpAndPoll(vehicle.vin)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Wake Up
                    </Button>
                  )
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => goToVehiclePage(vehicle.id, vehicle.vin)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {vehicle.display_name} Data
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
