


// const NAVIGATION = [
//   // Add the following new item:
//   {
//     segment: 'vehicles',
//     title: 'Vehicles',
//     icon: <TimelineIcon />,
//   },
// ];



export default function Index() {
  return (
   <p className=''>Home</p>
  );
}





// import Head from "next/head";
// import Image from "next/image";
// import Navbar from "../components/NavBar";
// import modelY from "../public/images/y.png";
// import BatteryStatus from "../components/BatteryLevel";
// import TirePressure from "../components/TirePressure";


// export default function Home() {
//   return (
//     <div>
//       <Head>
//         <title>Tesla Stats</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Navbar />
//       <main className="flex flex-col items-center justify-center py-10">
//         <p className="font-poppins font-thin text-7xl text-slate-800 mb-10">
//           Tesla Stats
//         </p>
        
//         <div className="mt-1 grid grid-cols-1 gap-[0.625rem] md:grid-cols-2 md:gap-x-3">
//           <BatteryStatus
//           batteryLevel={20}
//           batteryRange={69}
//           />
//           <div>
//           <TirePressure
//           rl={2.234}
//           fl={2.543}
//           rr={2.234}
//           fr={2.345}
//           />
//           </div>
    
//           <Image src={modelY} alt="Tesla Model Y" className="rounded-lg shadow-lg" />
//         </div>
//       </main>
//       <footer className="text-center py-5 text-gray-600">
//         Powered by Tesla Stats
//       </footer>
//     </div>
//   );
// }
