'use client'

import { IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react';

export default function FAQs() {
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
      title: "What do we do?",
      description: "No, membership is currently free for all participants.",
      bg: "bg-red-500",
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
    <div className="w-screen h-auto flex justify-center pb-24 my-0">
      <div className="max-w-[1240px] w-full h-auto mt-0 flex flex-col px-4 md:px-0 my-0">
        <h2 className="font-bold text-left text-black my-6 md:my-12 text-[8vw] md:text-[5vw]">
          FAQS
        </h2>
        <div className='-my-8'>
          {faqItems.map((item, idx) => (
            <div key={idx} className='w-[97%] h-auto relative'>
              <div className={`absolute w-full h-full left-0 -bottom-4 md:bottom-0 ${item.bg}`}>
              </div>
              <div

                className={`w-full cursor-pointer bg-${item.bg.split("-")[1]}-200 px-4 py-4 md:px-6 md:py-8 mt-8 translate-x-2 translate-y-2  md:translate-x-4 md:-translate-y-4`}
                onClick={() => handleToggle(idx)}
              >
                <div className="flex justify-between items-center ">
                  <h3 className=" text-xl md:text-3xl text-left text-black font-medium">{item.title}</h3>
                  <motion.span
                    animate={{ rotate: openIndex === idx ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 text-white text-2xl"
                  >
                    <IconArrowRight size={32} color='black' />
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
                        <p className="text-black text-sm md:text-xl mt-4">{item.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}