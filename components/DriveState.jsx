import React from "react";
import { Card, CardContent } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const DriveState = ({ drive_state, locked, odometer }) => {
  return (
    <Card>
      <CardContent>
        {drive_state?.speed == null && "Parked"}
    
      </CardContent>
      <CardContent>
      {locked == true ? <LockIcon/> : <LockOpenIcon/>}
 
      </CardContent>
      <p>Odometer: {parseInt(odometer)}</p>
    </Card>
  );
};

export default DriveState;
