
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';
import {Battery20Rounded, Battery30Rounded, Battery50Rounded,  Battery90Rounded  } from '@mui/icons-material';

const BatteryStatus = ({ batteryLevel }) => {
    return (
      <Card className="w-1/3  mx-auto shadow-lg rounded-lg ">
        <CardContent>
            <Battery90Rounded
            sx={{ fontSize: 80 }}/>
        <Battery20Rounded 
        sx={{ fontSize: 80 }} />
            {batteryLevel + "%"}
        </CardContent>
      </Card>
    );
  };

  export default BatteryStatus;