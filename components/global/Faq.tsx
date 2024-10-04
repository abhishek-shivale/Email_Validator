import { Rubik_Mono_One } from "next/font/google";
import { questions } from "@/lib/utils";
import React from "react";

export const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
});

function Faq() {
  return (
    <div className=" w-full  py-20">
      <h2 className={`${rubikMonoOne.className} text-3xl text-white font-bold text-center mb-6`}>
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {
          questions.map((question, index) => (
            <div key={index} className=" rounded-lg shadow-lg shadow-white/50 p-6 flex items-start">
          <div className="ml-4">
            <h3 className="text-lg text-white font-semibold">
              {question.question}
            </h3>
            <p className="text-gray-400">
          {question.answer}
            </p>
          </div>
        </div>
          ))
        }

      </div>
    </div>
  );
}


export default Faq;
