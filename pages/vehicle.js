import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

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
 async function wakeUp(){
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

  return (
    <div>
      <h1>Vehicle Details</h1>
      <Button onClick={() => {makeStinky()}} variant="contained">
       Fart</Button>
      {detailsToShow.map((field) => (
        vehicleData[field] ? (
          <div key={field}>
            <h3>{field.replace(/_/g, ' ').toUpperCase()}</h3>
            <pre>{JSON.stringify(vehicleData[field], null, 2)}</pre>
          </div>
        ) : null
      ))}
    </div>
  );
};

Vehicle.propTypes = {};

export default Vehicle;
