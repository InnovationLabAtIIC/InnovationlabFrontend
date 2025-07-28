'use client'

import Hero from "../../components/section/Hero";
import NavBar from "../../components/section/NavBar";
import { MotionEffect } from "../../components/ui/AnimatedContainer";
import MarqueeText from "../../components/ui/MarqueeText";
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Missions />
      <Events/>
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
  return (
    <div className="w-screen h-screen bg-slate-800">
        <div>
          
        </div>
    </div>
  )
}