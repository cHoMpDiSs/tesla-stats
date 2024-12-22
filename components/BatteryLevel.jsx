import {
  Battery20Rounded,
  Battery50Rounded,
  Battery80Rounded,
  Battery90Rounded,
  BatteryFullRounded,
} from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";


const BatteryStatus = ({ batteryLevel, currentRange, idealRange, chargeLimit }) => {
  const getBatteryIcon = () => {
    switch (true) {
      case batteryLevel > 90:
        return <BatteryFullRounded sx={{ fontSize: 100 }} />;
      case batteryLevel > 70:
        return <Battery90Rounded sx={{ fontSize:  100 }} />;
      case batteryLevel > 50:
        return <Battery80Rounded sx={{ fontSize:  100 }} />;
      case batteryLevel > 20:
        return <Battery50Rounded sx={{ fontSize:  100 }} />;
      default:
        return <Battery20Rounded sx={{ fontSize:  100 }} />;
    }
  };
  const calculateBatteryDegradation =(currentRange, idealRange) => {
    if (currentRange > idealRange || currentRange <= 0 || idealRange <= 0) {
      throw new Error("Invalid range values provided.");
    }
    const degradation = (1 - currentRange / idealRange) * 100;
    return degradation.toFixed(2); // Return the result with 2 decimal places
  }
  

  const degradation = calculateBatteryDegradation(currentRange, idealRange);
  
  

  return (
    <Card className="mx-auto shadow-lg rounded-lg min-h-72 w-96">
      <p className="text-center font-futura text-2xl mt-2">Battery Health</p>
      <CardContent>
        <div className="flex items-center">
          {getBatteryIcon()}
          <div className="grid">
            <p className="text-xl ">{batteryLevel}%</p>
            <p className="text-xl ">{currentRange} Current Range</p>
            <p className="text-xl ">{idealRange} Ideal Range</p>
            <p className="text-xl ">Charge Limit: {chargeLimit}</p>
            <p className="text-xl">Battery Degradation: {degradation}%</p>
          </div>
         
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryStatus;
