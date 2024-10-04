import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Rubik_Mono_One } from "next/font/google";

export const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
});
function Promotion() {
  return (
    <div className="w-ful py-20 text-white">
      <h2
        className={`${rubikMonoOne.className} text-4xl font-bold text-center mb-6`}
      >
        Join Our Launch!
      </h2>
      <p
        className={` antialiased text-center text-sm mb-8`}
      >
        Were excited to announce the launch of our new bulk email validation
        feature, soon!
      </p>
      <div className="max-w-md mx-auto">
        <form className="flex flex-col items-center space-y-4">
          <Label
            htmlFor="notify-email"
            className="text-sm font-medium  text-white"
          >
            Get Notified
          </Label>
          <Input
            id="notify-email"
            type="email"
            placeholder="your-email@example.com"
            className="mt-1 h-12 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Button
            type="submit"
            className="w-full py-2 h-12 bg-white text-black rounded-md hover:bg-white/90 shadow transition duration-200"
          >
            Notify Me!
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Promotion;
