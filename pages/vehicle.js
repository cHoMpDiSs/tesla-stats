import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import BatteryStatus from "../components/BatteryLevel";

const Vehicle = () => {
  const router = useRouter();
  const { id, vin } = router.query;

  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingWakeUp, setLoadingWakeUp] = useState(false);
  const [wakeUpSuccess, setWakeUpSuccess] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchVehicleData = async () => {
      try {
        const res = await fetch(`/api/vehicleData?id=${id}`);
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        }
        setVehicleData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVehicleData();
  }, [id]);

  const makeStinky = async () => {
    try {
      const res = await fetch(`/api/fart?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error || "Failed to make a stinky");
      }
    } catch (err) {
      setError(err.message || "Failed to make a stinky");
    }
  };

  const wakeUp = async () => {
    setLoadingWakeUp(true);
    setWakeUpSuccess(null);
    setError(null);

    try {
      const vehicleRes = await fetch(`/api/wakeUp?vin=${vin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await vehicleRes.json();
      if (vehicleRes.ok) {
        setWakeUpSuccess("Vehicle is now awake!");
      } else {
        setError(data.error || "Failed to wake vehicle");
      }
    } catch (err) {
      setError(err.message || "Failed to wake vehicle");
    } finally {
      setLoadingWakeUp(false);
    }
  };

  if (error === "Vehicle offline or asleep") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
        <h1 className="text-xl font-bold text-red-700 mb-4">
          Vehicle is offline or asleep
        </h1>
        <Button
          variant="contained"
          onClick={wakeUp}
          disabled={loadingWakeUp}
          className={`${
            loadingWakeUp ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          {loadingWakeUp ? "Waking Up..." : "Wake Up"}
        </Button>
        {wakeUpSuccess && (
          <p className="mt-4 text-green-600">{wakeUpSuccess}</p>
        )}
        {error && error !== "Vehicle offline or asleep" && (
          <p className="mt-4 text-red-600">{error}</p>
        )}
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading vehicle data...</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl text-center mb-8 text-gray-800">
        Model {vin?.[3]} Details
      </h1>

      <BatteryStatus
        batteryLevel={vehicleData.charge_state?.battery_level}
        batteryRange={vehicleData.charge_state?.battery_range}
      />
      <Button onClick={() => makeStinky()} variant="contained">
        Fart
      </Button>

      <div>
        <h3>CLIMATE STATE</h3>
        <p>Inside Temp: {vehicleData.climate_state?.inside_temp}</p>
      </div>
      <div>
        <h3>DRIVE STATE</h3>
        <p>Speed: {vehicleData.drive_state?.speed == null && "Parked"}</p>
      </div>
      <div>
        <h3>VEHICLE STATE</h3>
        <p>Locked: {vehicleData.vehicle_state?.locked ? "Yes" : "No"}</p>
        <p>Odometer: {parseInt(vehicleData.vehicle_state?.odometer)}</p>
        <p>TPMS Pressure (Front Left): {vehicleData.vehicle_state?.tpms_pressure_fl}</p>
        <p>TPMS Pressure (Front Right): {vehicleData.vehicle_state?.tpms_pressure_fr}</p>
        <p>TPMS Pressure (Rear Left): {vehicleData.vehicle_state?.tpms_pressure_rl}</p>
        <p>TPMS Pressure (Rear Right): {vehicleData.vehicle_state?.tpms_pressure_rr}</p>
      </div>
    </div>
  );
};

Vehicle.propTypes = {};

export default Vehicle;
