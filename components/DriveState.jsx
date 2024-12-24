import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const DriveState = ({ drive_state, locked, odometer }) => {
  return (
    <Card className="mx-auto shadow-lg rounded-lg min-h-72 w-96 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <CardContent className="text-center">
      <Typography variant="h6"className="text-center text-2xl font-bold ">
        {drive_state?.speed == null ? "Parked" : `Speed: ${drive_state.speed} mph`}
      </Typography>
    </CardContent>
    <CardContent className="flex justify-center items-center">
      {locked ? (
        <LockIcon className="text-green-400" />
      ) : (
        <LockOpenIcon className="text-red-400" />
      )}
    </CardContent>
    <Typography variant="body1" className="text-center mt-2">
      Odometer: {parseInt(odometer).toLocaleString()} miles
    </Typography>
  </Card>
  
  );
};

export default DriveState;
