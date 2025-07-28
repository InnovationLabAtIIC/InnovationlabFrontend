'use client'

import Hero from "../../components/section/Hero";
import NavBar from "../../components/section/NavBar";

export default function Home() {

  return (
    <div>
      <NavBar />
      <Hero />
      <Missions />
      <Events />
    </div>
  );
}

function Missions() {
  return (
    <div className="w-screen h-screen flex justify-center my-0 bg-emerald-500 pb-16">
      <div className="max-w-[1240px] w-full my-0 h-auto mt-0 flex flex-col md:px-0 px-4">
        <h2 className=" font-bold text-[8vw] md:text-[5vw] -translate-y-5 md:-translate-y-16 text-white text-center">OUR MISSIONS</h2>
      </div>
    </div>
  )
}

function Events() {
  const events = [
    { id: 1, name: "SUMMER ENRICHMENT" },
    { id: 2, name: "IIC QUEST" },
    { id: 3, name: "CREATIVE CLASH" },
  ];

  if (events.length === 0) return null;

  return (
    <div className="w-screen h-auto bg-black flex items-start justify-center pb-12">
      <div className="max-w-[1240px] w-full h-auto mt-0 flex flex-col md:px-0 p-4">
        <h2 className=" font-bold text-[8vw] md:text-[5vw]  text-white text-left my-6 md:my-12">EVENTS</h2>
        <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-6 h-full w-full p-0">
        </div>
      </div>
    </div>
  );
}
