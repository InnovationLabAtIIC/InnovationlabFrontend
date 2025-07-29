'use client'

import { Accordion, AccordionItem } from "@heroui/react";
import { AnimatedList } from "../../components/section/AnimatedFAQ";
import Events from "../../components/section/Events";
import Hero from "../../components/section/Hero";
import NavBar from "../../components/section/NavBar";
import Updates from "../../components/section/Updates";
import Button from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Icon, IconArrowRight } from "@tabler/icons-react";
import FAQs from "../../components/section/FAQS";
//import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Missions />
      <Events />
      <Updates />
      <FAQs />
    </div>
  );
}




function Missions() {
  return (
    <div className="w-screen h-screen flex justify-center my-0  pb-16">
      <div className="max-w-[1240px] w-full my-0 h-auto mt-0 flex flex-col md:px-0 px-4">
      </div>
    </div>
  )
}


