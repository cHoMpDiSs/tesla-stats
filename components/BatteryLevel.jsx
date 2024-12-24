import {
  Battery20Rounded,
  Battery50Rounded,
  Battery80Rounded,
  Battery90Rounded,
  BatteryFullRounded,
} from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

const BatteryStatus = ({
  batteryLevel,
  currentRange,
  idealRange,
  chargeLimit,
}) => {
  const getBatteryIcon = () => {
    switch (true) {
      case batteryLevel > 90:
        return <BatteryFullRounded sx={{ fontSize: 100 }} />;
      case batteryLevel > 70:
        return <Battery90Rounded sx={{ fontSize: 100 }} />;
      case batteryLevel > 50:
        return <Battery80Rounded sx={{ fontSize: 100 }} />;
      case batteryLevel > 20:
        return <Battery50Rounded sx={{ fontSize: 100 }} />;
      default:
        return <Battery20Rounded sx={{ fontSize: 100 }} />;
    }
  };
  const calculateBatteryDegradation = (currentRange, idealRange) => {
    if (currentRange > idealRange || currentRange <= 0 || idealRange <= 0) {
      return 
    }
    const degradation = (1 - currentRange / idealRange) * 100;
    return degradation.toFixed(2);
  };

  const degradation = calculateBatteryDegradation(currentRange, idealRange);

  return (
    <Card className="mx-auto shadow-lg rounded-lg min-h-72 w-96 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <Typography
      variant="h6"
      className="text-center text-2xl font-bold mt-4 "
    >
     Battery Health
    </Typography>
    <CardContent>
      <div className="flex items-center space-x-6">
        {/* Battery Icon and Level */}
        <div className="flex flex-col items-center">
          <div className="-rotate-90">{getBatteryIcon()}</div>
          <Typography
            variant="h5"
            className=" font-semibold mt-2"
          >
            {batteryLevel}%
          </Typography>
        </div>
        {/* Battery Details */}
        <div className="flex flex-col items-start space-y-2">
          <Typography variant="body1" className="">
            <strong>Current Range:</strong> {currentRange} miles
          </Typography>
          <Typography variant="body1" className="">
            <strong>Ideal Range:</strong> {idealRange} miles
          </Typography>
          <Typography variant="body1" className="">
            <strong>Charge Limit:</strong> {chargeLimit}%
          </Typography>
        </div>
      </div>
    </CardContent>
  </Card>
  
  );
};

export default BatteryStatus;
