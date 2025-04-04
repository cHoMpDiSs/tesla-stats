"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import {
  Card,
  CircularProgress,
  CardContent,
  Box,
  Typography,
  CardMedia,
} from "@mui/material";
import modelY from "../public/images/y.png";

export default function VehicleData() {
  const [vehicleData, setVehicleData] = useState(null);
  const [polling, setPolling] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  let isMounted = true;

  async function fetchVehicleData() {
    try {
      const vehicleRes = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await vehicleRes.json();
      if (!isMounted) return;

      if (vehicleRes.ok) {
        setVehicleData(data.response);
        setPolling(false)
      } else if (data.error === "Missing access or refresh token") {
        await refreshToken();
        if (isMounted) fetchVehicleData(); // Retry after refreshing token
      } else {
        setError(data.error || "Failed to fetch vehicle data");
      }
    } catch (err) {
      if (isMounted) setError(err.message || "Failed to fetch vehicle data");
    }
  }

  useEffect(() => {
    fetchVehicleData();

    return () => {
      isMounted = false;
    };
  }, [polling]); // Runs on mount and when `polling` changes

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Refresh token successful");
        await fetchVehicleData();
      } else {
        if (data.error == "No refresh token provided") {
          router.push("/auth");
        }
        console.error(data.error || "Failed to refresh token");
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

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




  if (error === "login_required") {
    router.push("/auth");
  } else if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  } else if (polling) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

   else if (vehicleData) {
    return (
      <div className="min-h-screen  py-8 px-4 mb-32">
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
                className="max-w-[30rem] shadow-lg rounded-lg  hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                <Typography variant="h6" className="font-bold text-center ">
                  Model {vehicle.vin[3]}
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image={modelY.src}
                  alt="Model Y"
                />
                <CardContent className="p-6">
                  <Box className="mb-4">
                    <Typography variant="body2" className="">
                      <strong>ID:</strong> {vehicle.id}
                    </Typography>
                    <Typography variant="body2" className="">
                      <strong>VIN:</strong> {vehicle.vin}
                    </Typography>
                    <Typography variant="body2" className="">
                      <strong>Color:</strong>{" "}
                      {vehicle.color || "Midnight Silver"}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={`font-medium ${
                        vehicle.state === "online"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <strong>State:</strong> {vehicle.state}
                    </Typography>
                  </Box>
                </CardContent>
                <Box className="p-4 flex justify-center">
                  {vehicle.state === "offline" || vehicle.state === "asleep" ? (
                    polling ? (
                      <CircularProgress size={40} color="primary" />
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => wakeUpAndPoll(vehicle.vin)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                      >
                        Wake Up
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => goToVehiclePage(vehicle.id, vehicle.vin)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                    >
                      View {vehicle.display_name} Data
                    </Button>
                  )}
                </Box>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
