import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, Typography } from "@mui/material";
const TirePressure = ({ rl, rr, fl, fr }) => {
  console.log({ rl, rr, fl, fr });

  return (
    <Card className="mx-auto shadow-lg rounded-lg min-h-72 w-96 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <Typography
        variant="h6"
        className="text-center text-2xl font-bold mt-4 "
      >
        Tire Pressure
      </Typography>
      <BarChart
        className=""
        series={[
          {
            data: [
              (fr * 14.5038).toFixed(2),
              (fl * 14.5038).toFixed(2),
              (rr * 14.5038).toFixed(2),
              (rl * 14.5038).toFixed(2),
            ],
            // label: "Tire Pressure",
            color: "black",
          },
        ]}
        borderRadius={33}
        height={238}
        barLabel={"value"}
        xAxis={[
          {
            data: ["Front Right", "Front Left", "Rear Right", "Rear Left"],
            scaleType: "band",
            tickPlacement: "middle",
          },
        ]}
        margin={{ top: 20, bottom: 40, left: 30, right: 10 }}
      />
    </Card>
  );
};

TirePressure.propTypes = {};

export default TirePressure;
