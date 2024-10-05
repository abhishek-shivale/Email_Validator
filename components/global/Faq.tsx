"use client";
import { Rubik_Mono_One } from "next/font/google";
import { questions } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
});

function Faq() {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} className=" w-full  py-20">
      <h2
        className={`${rubikMonoOne.className} text-3xl text-white font-bold text-center mb-6`}
      >
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {questions.map((question, index) => (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            key={index}
            className=" rounded-lg shadow-lg shadow-white/50 p-6 flex items-start"
          >
            <div className="ml-4">
              <h3 className="text-lg text-white font-semibold">
                {question.question}
              </h3>
              <p className="text-gray-400">{question.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Faq;
