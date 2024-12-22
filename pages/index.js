import React from "react";
import Head from "next/head";
import Image from "next/image";
import BatteryStatus from '../components/BatteryLevel'
import TirePressure from '../components/TirePressure'
import modelY from '../public/images/y.png'
import cyber from '../public/images/cyber.png'

export default function Home() {
  return (
    <div className="mx-10">
      <Head>
        <title>Tesla Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center py-10 ">
        <p className="font-poppins font-thin text-8xl mb-10 text-center">
          Tesla Stats
        </p>
        <Image  src={cyber} alt="Cyber Truck" className="rounded-lg shadow-lg w-[45rem] xl:mt-4 lg:mt-2" />
        <div className="mt-1 grid grid-cols-1 gap-[0.625rem] md:grid-cols-2 md:gap-x-3">
          <BatteryStatus
          batteryLevel={20}
          chargeLimit={80}
          currentRange={187}
          idealRange={191}
          />
          <div>
          <TirePressure
          rl={2.234}
          fl={2.543}
          rr={2.234}
          fr={2.345}
          />
          </div>
    

        </div>
      </main>
      <footer className="text-center py-5">
        Powered by Tesla Stats
      </footer>
    </div>
  );
}
