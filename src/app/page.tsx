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

function FAQs() {
  const faqItems = [
    {
      title: "What is IVLAB?",
      description: "IVLAB is a platform for innovation and collaboration in various fields.",
      bg: "bg-blue-500",
    },
    {
      title: "How can I join IVLAB?",
      description: "You can join IVLAB by signing up on our website and participating in our events.",
      bg: "bg-green-500",
    },
    {
      title: "Are there any membership fees?",
      description: "No, membership is currently free for all participants.",
      bg: "bg-yellow-500",
    },
    {
      title: "Where are you located?",
      description: "We are based in D:/IVLAB, but our events are open to everyone online.",
      bg: "bg-purple-500",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-screen min-h-screen h-auto flex justify-center pb-16 my-0">
      <div className="max-w-[1240px] w-full h-auto mt-0 flex flex-col px-4 md:px-0 my-0">
        <h2 className="font-bold text-left text-black my-6 md:my-12 text-[8vw] md:text-[5vw]">
          FAQS
        </h2>
        <div>
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className={`w-full rounded-lg cursor-pointer ${item.bg} px-6 py-8 mt-4`}
              onClick={() => handleToggle(idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-3xl text-left text-white font-bold">{item.title}</h3>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 text-white text-2xl"
                >
                  ▶
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-white text-xl mt-4">{item.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
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


