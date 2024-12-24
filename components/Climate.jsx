import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit"; 
import WhatshotIcon from "@mui/icons-material/Whatshot"; 
const Climate = ({
  is_climate_on,
  outside_temp,
  inside_temp,
  cabin_overheat_protection,
}) => {
  const toFahrenheit = (celcius) => {
    return (celcius * 9) / 5 + 32;
  };

  return (
    <Card className="mx-auto shadow-lg rounded-lg min-h-72 w-96 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <Typography
      variant="h6"
      className="text-center text-2xl font-bold mt-4 mb-2"
    >
     <AcUnitIcon/>{" "} Climate {" "}   
    <WhatshotIcon/>
    </Typography>

    <CardContent className="e">
      <Typography variant="body1" className="mb-2">
        <strong>Is Climate On:</strong> {is_climate_on ? "Yes" : "No"}
      </Typography>
      <Typography variant="body1" className="mb-2">
        <strong>Outside Temperature:</strong> {toFahrenheit(outside_temp).toFixed(2)}°F
      </Typography>
      <Typography variant="body1" className="mb-2">
        <strong>Inside Temperature:</strong> {toFahrenheit(inside_temp).toFixed(2)}°F
      </Typography>
      <Typography variant="body1" className="mb-2">
        <strong>Cabin Overheat Protection:</strong> {cabin_overheat_protection}
      </Typography>
    </CardContent>
  </Card>
  
  );
};

export default Climate;
