import DashboardProvider from "../components/DashboardProvider";

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <DashboardProvider>{page}</DashboardProvider>);
  return getLayout(<Component {...pageProps} />);
}
