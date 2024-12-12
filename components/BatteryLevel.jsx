import { Battery20Rounded, Battery50Rounded, Battery80Rounded, Battery90Rounded, BatteryFullRounded } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';

const BatteryStatus = ({ batteryLevel }) => {
  const getBatteryIcon = () => {
    switch (true) {
      case batteryLevel > 90:
        return <BatteryFullRounded sx={{ fontSize: 80 }} />;
      case batteryLevel > 70:
        return <Battery90Rounded sx={{ fontSize: 80 }} />;
      case batteryLevel > 50:
        return <Battery80Rounded sx={{ fontSize: 80 }} />;
      case batteryLevel > 20:
        return <Battery50Rounded sx={{ fontSize: 80 }} />;
      default:
        return <Battery20Rounded sx={{ fontSize: 80 }} />;
    }
  };

  return (
    <Card className="w-1/3 mx-auto shadow-lg rounded-lg">
      <CardContent className="flex flex-col items-center">
        {getBatteryIcon()}
        <p className="text-xl font-bold">{batteryLevel}%</p>
      </CardContent>
    </Card>
  );
};

export default BatteryStatus;
