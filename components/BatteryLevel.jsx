import { Battery20Rounded, Battery50Rounded, Battery80Rounded, Battery90Rounded, BatteryFullRounded } from '@mui/icons-material';
import { Card, CardContent} from '@mui/material';

const BatteryStatus = ({ batteryLevel,batteryRange }) => {
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
    <Card className="mx-auto shadow-lg rounded-lg min-h-72">
      <p className='text-center font-futura text-2xl'>Battery Health</p>
      <CardContent className="flex flex-col items-center">
        {getBatteryIcon()}
        <p className="text-xl font-bold">{batteryLevel}%</p>
        <p className="text-xl font-bold">{batteryRange} Miles</p>
      </CardContent>
    </Card>
  );
};

export default BatteryStatus;
