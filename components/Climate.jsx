import React from "react";
import { Card, CardContent, CardTitle } from "@mui/material";

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
    <Card>
        <p className="text-center text-2xl font-poppins">Climate</p>
      <CardContent>
        <p>is_climate_on {is_climate_on}</p>
        <p> Outside temperature {toFahrenheit(outside_temp).toFixed(2)}</p>
        <p> Inside temperature {toFahrenheit(inside_temp).toFixed(2)}</p>
        <p> Cabin overheat protection: {cabin_overheat_protection}</p>
      </CardContent>
    </Card>
  );
};

export default Climate;
