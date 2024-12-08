import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const Vehicle = () => {
  const router = useRouter();
  const { id } = router.query; // Extract vehicleId from URL params
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Wait until vehicleId is available

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
    const res = await fetch(`/api/fart?id=${id}`);
    const data = await res.json();
    if(data.error){
      setError(data.error)
    }
  } catch (err) {
    setError(err.message);
  }
 }

  if (error) {
    return <p>Error: {error}</p>;
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
      <Button onClick={() => {makeStinky}} variant="contained">
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
