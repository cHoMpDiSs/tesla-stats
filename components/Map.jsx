"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const Map = ({ center = { lat: 34.0522, lng: -118.2437 } }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [chargers, setChargers] = useState([]);

  useEffect(() => {
  

    const fetchChargers = async () => {
      try {
        console.log("Fetching Tesla Chargers near:", center);
        const response = await axios.get(`/api/getChargers`, {
          params: { lat: center.lat, lng: center.lng },
        });

        setChargers(response.data.results || []);
      } catch (error) {
        console.error("Error fetching Tesla chargers:", error);
      }
    };

    fetchChargers();
  }, []); // Only runs when `isLoaded` or `center` changes

  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);
console.log(chargers)
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={center}
      zoom={12}
      options={options}
    >
      {chargers.map((charger) => (
        <Marker
          key={charger.place_id}
          position={{
            lat: charger.geometry.location.lat,
            lng: charger.geometry.location.lng,
          }}
          title={charger.name}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
