import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { Battery20Rounded } from '@mui/icons-material';
import BatteryStatus from '../components/BatteryLevel';

const Vehicle = () => {
  const router = useRouter();
  const { id, vin } = router.query;

  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchVehicleData = async () => {
      try {
        const res = await fetch(`/api/vehicleData?id=${id}`);
        const data = await res.json();
        if(data.error){
          setError(data.error)
        }
        setVehicleData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVehicleData();
  }, [id]); 

 const makeStinky = async () =>{
  try {
    const res = await fetch(`/api/fart?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if(data.error){
      setError(data.error || "Failed to make a stinky")
    }
  } catch (err) {
    setError(err.message || "Failed to make a stinky");
  }
 }
 const wakeUp = async () =>{
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
console.log(vin)
  if (error == "Vehicle offline or asleep") {
    return   <Button variant="contained" onClick={() => wakeUp()}>Wake Up</Button> ;
  }

  if (!vehicleData) {
    return <p>Loading...</p>;
  }

  const detailsToShow = [
    'charge_state',
    'climate_state',
    'closures_state',
    'drive_state',
    'gui_settings',
    'location_data',
    'charge_schedule_data',
    'preconditioning_schedule_data',
    'vehicle_config',
    'vehicle_state',
    'vehicle_data_combo',
  ];

  //CHARGE STATE
  //battery_level
  //battery_range


  // CLIMATE STATE
  //inside_temp

  // DRIVE STATE
  //speed

  //VEHICLE STATE
  //locked
  //odometer
  //  "tpms_pressure_fl": 2.7,
  //"tpms_pressure_fr": 2.725,
  //"tpms_pressure_rl": 2.725,
  //"tpms_pressure_rr": 2.725,
  
  
  return (
    <div>
      <p className=' text-4xl'>Vehicle Details</p>
      <Button onClick={() => makeStinky()} variant="contained">
        Fart
      </Button>
      <BatteryStatus
      batteryLevel={vehicleData.charge_state?.battery_level}
      />
    {vehicleData.charge_state?.battery_level + "%"}
      <div>
        <h3>CHARGE STATE</h3>
        <p>Battery Level: {vehicleData.charge_state?.battery_level}</p>
        <p>Battery Range: {vehicleData.charge_state?.battery_range}</p>
      </div>
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
        <p>Locked: {vehicleData.vehicle_state?.locked ? 'Yes' : 'No'}</p>
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
