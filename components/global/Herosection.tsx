import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Header from "@/components/global/Header";
import { rubikMonoOne } from "@/app/layout";

function HeroSection() {
  return (
    <div className="w-full h-screen relative">
      <Header />
      <div className="absolute inset-x-0 top-[5px] z-10 h-full overflow-hidden text-white opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
              patternTransform="translate(0 -1)"
            >
              <circle cx="7" cy="7" r="4" fill="currentColor"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"></rect>
        </svg>
      </div>
      <div className="h-screen relative w-full flex items-center justify-center">
        <Card className="max-w-lg mx-auto  shadow-lg shadow-white/70 rounded-lg p-8 z-50 bg-white/90">
          <CardHeader>
            <CardTitle
              className={`${rubikMonoOne.className} text-center scale-120 text-3xl font-semibold text-primary mb-4`}
            >
              Validate Email For Free
            </CardTitle>
            <CardDescription className="text-center text-xs text-gray-600 mt-2">
              Boost your deliverability and protect your sender reputation with
              fast, accurate email verification.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <form className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="mt-1 block h-12 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2  h-12   text-white rounded-md shadow    "
              >
                Validate Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HeroSection;
