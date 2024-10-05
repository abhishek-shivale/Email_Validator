"use client";
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
 import clsx from "clsx";
import Result from "./Result";
import { motion } from "framer-motion";
import { Rubik_Mono_One } from "next/font/google";
import { ValidateEmail } from "@/lib/api";
import { responseType } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
});

const initsialState = {
  email: "",
  isPending: false,
};
function Email_Card() {
  const [state, setState] = React.useState(initsialState);
  const [result, setResult] = React.useState<responseType | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ ...state, isPending: true });
    const res = await ValidateEmail(state.email);
    if (res) {
      setResult(res as responseType);
    }
    setState({ ...state, isPending: false });
  };
  console.log(result);

  return (
    <motion.div
    className="z-50"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} >
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
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={state?.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              placeholder="example@email.com"
              className="mt-1 block h-12 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={state.isPending}
                type="submit"
                className="w-full py-2  h-12   text-white rounded-md shadow    "
              >
                {" "}
                Validate Email
              </Button>
            </DialogTrigger>
            <DialogContent className={clsx("sm:max-w-[425px]", {hidden: state.isPending })}>
              <Result result={result as responseType} email={state.email} />
            </DialogContent>
          </Dialog>
        </form>
      </CardContent>
    </Card>
    </motion.div>
  );
}

export default Email_Card;
