// components/DashboardLayout.tsx
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import { extendTheme, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { BatteryFullRounded } from "@mui/icons-material";


const NAVIGATION = [
  {
    segment: "",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "vehicles",
    title: "Vehicles",
    icon: <TimelineIcon />,
  },
  {
    segment: "charging",
    title: "Super Chargers",
    icon: <BatteryFullRounded />,
  },
];
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardProvider(props) {
  const { window } = props;
  const router = useRouter();

  const customRouter = {
    pathname: router.pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => router.push(path),
  };

  return (
    <AppProvider
      branding={{
        title: (
       
          
             "Tesla Stats"
          
        
        ),

        logo: <BatteryFullRounded className="mt-2 rotate-45" />,
      }}
      navigation={NAVIGATION}
      router={customRouter}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout 
      
      >{props.children}</DashboardLayout>
    </AppProvider>
  );
}
