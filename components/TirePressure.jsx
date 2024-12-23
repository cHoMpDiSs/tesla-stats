import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card } from "@mui/material";
const TirePressure = ({ rl, rr, fl, fr }) => {
  console.log({ rl, rr, fl, fr });

  return (
    <Card className="mx-auto shadow-lg rounded-lg ">
      <p className="mt-2 relative font-futura text-center">Tire Pressure</p>
      <BarChart
  
        className="mt-2"
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
        height={290}
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
