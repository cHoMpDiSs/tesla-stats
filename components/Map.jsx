"use client";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Map = ({ center = { lat: 34.052235, lng: -118.243683 } }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [chargingStations, setChargingStations] = useState([]);

  useEffect(() => {
    if (!center?.lat || !center?.lng) return;

    const fetchStations = async () => {
      try {
        const response = await axios.get(
          `/api/getChargers?lat=${center.lat}&lng=${center.lng}`
        );
        console.log(response, "RESONSEE")
        if (response){
            let arr = [];
            for (let i = 0; i <10; i ++){
                console.log(response.data.places[i], i)
                arr.push(response.data.places[i])
            }
            setChargingStations(arr)
        }
        // setChargingStations(response.data.places || []);
      } catch (error) {
        console.error("Error fetching stations:", error)
        return;
        
      }
    };

    if (isLoaded) fetchStations();
  }, [isLoaded]);

  console.log(chargingStations, "Stations")
  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={center}
      zoom={12}
      options={mapOptions}
    >
      {chargingStations.map((station) => (
        <Marker
          key={station.place_id}
          position={{
            lat: station.location.latitude,
            lng: station.location.longitude,
          }}
          title={station.name}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
