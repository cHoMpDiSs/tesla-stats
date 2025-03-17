import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import BatteryStatus from "../components/BatteryLevel";
import TirePressure from "../components/TirePressure";
import Climate from "../components/Climate";
import DriveState from "../components/DriveState";
import CircularProgress from "@mui/material";
const Vehicle = () => {
  const router = useRouter();
  const { id, vin } = router.query;
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingWakeUp, setLoadingWakeUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wakeUpSuccess, setWakeUpSuccess] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchVehicleData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/vehicleData?id=${id}`);
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        }
        setVehicleData(data);
        setLoading(false)
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

  async function wakeUpAndPoll() {
    setLoadingWakeUp(true);
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
        setLoadingWakeUp(false);
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
            setLoadingWakeUp(false);
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
      setLoadingWakeUp(false);
    }
  }
console.log(vehicleData)
  if (error === "Vehicle offline or asleep") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  py-6">
        <h1 className="text-xl font-bold text-red-700 mb-4">
          Vehicle is offline or asleep
        </h1>
        <Button
          variant="contained"
          onClick={wakeUpAndPoll}
          disabled={loadingWakeUp}
          className={`${
            loadingWakeUp ? "cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          {loadingWakeUp ? (
            <CircularProgress size={40} color="primary" />
          ) : (
            "Wake Up"
          )}
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
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading vehicle data...</p>
        </div>
      </div>
    );
  }
  else if (error === "Missing access or refresh token"){
    router.push("/auth")
  }
else if (vehicleData)
  return  (
    <div className=" mb-24 py-8 px-4">
      <h1 className="text-4xl text-center mb-8 font-poppins ">
        Model {vin?.[3]} Details
      </h1>
      {/* <Button onClick={() => makeStinky()} variant="contained">
        Fart
      </Button> */}
      <div className="mt-1 grid grid-cols-1 gap-[0.625rem] md:grid-cols-2 md:gap-x-3">
        <div>
          <BatteryStatus
            batteryLevel={vehicleData?.charge_state.battery_level}
            chargeLimit={vehicleData?.charge_state.charge_limit_soc_std}
            currentRange={vehicleData?.charge_state.battery_range}
            idealRange={vehicleData?.charge_state.ideal_battery_range}
          />
        </div>

        <div>
          <TirePressure
            rl={vehicleData?.vehicle_state.tpms_pressure_rl}
            fl={vehicleData?.vehicle_state.tpms_pressure_fl}
            rr={vehicleData?.vehicle_state.tpms_pressure_rr}
            fr={vehicleData?.vehicle_state.tpms_pressure_fr}
          />
        </div>
      </div>
      <div className="mt-1 grid grid-cols-1 gap-[0.625rem] md:grid-cols-2 md:gap-x-3">
      <div>
        <Climate
          is_climate_on={vehicleData?.climate_state.is_climate_on}
          outside_temp={vehicleData?.climate_state.outside_temp}
          inside_temp={vehicleData?.climate_state.inside_temp}
          cabin_overheat_protection={
            vehicleData?.climate_state.cabin_overheat_protection
          }
        />
      </div>
      <div>
        <DriveState
          drive_state={vehicleData?.drive_state.speed}
          locked={vehicleData?.vehicle_state.locked}
          odometer={vehicleData?.vehicle_state.odometer}
        />
      </div>
      </div>
    </div>
  );
};

Vehicle.propTypes = {};

export default Vehicle;
