import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card } from "@mui/material";
const TirePressure = ({ rl, rr, fl, fr }) => {
  console.log({ rl, rr, fl, fr });

  return (
    <Card className="mx-auto shadow-lg rounded-lg ">
      <BarChart className="mt-3"
        series={[
          {
            data: [fr, fl, rr, rl],
            label: "Tire Pressure",
            color: "black", 
          },
        ]}
        borderRadius={33}
        height={290}
        xAxis={[
          {
            data: ["Front Right", "Front Left", "Rear Right", "Rear Left"],
            scaleType: "band",
          },
        ]}
        margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
      />
    </Card>
  );
};

TirePressure.propTypes = {};

export default TirePressure;
