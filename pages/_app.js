import DashboardProvider from "../components/DashboardProvider";
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <DashboardProvider>{page}</DashboardProvider>);
  return getLayout(<Component {...pageProps} />);
}

// pages/_app.js

