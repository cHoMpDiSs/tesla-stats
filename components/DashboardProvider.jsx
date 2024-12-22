// components/DashboardLayout.tsx
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Typography } from "@mui/material";
import { extendTheme, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

  return router;
}

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
        <Typography variant="h6" className="!font-bold font-sans">
          Tesla Stats
        </Typography>
      ),
      logo: <img src="/logo.png" alt="logo" />,
    }}
      navigation={NAVIGATION}
      router={customRouter}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout>{props.children}</DashboardLayout>
    </AppProvider>
  );
}
