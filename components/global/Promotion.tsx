'use client'

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Rubik_Mono_One } from "next/font/google"
import { motion } from "framer-motion"
import { addEmailToSheet, ValidateEmail } from "@/lib/api"

const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin"],
})

export default function Promotion() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    const res = await ValidateEmail(email)
    if(res.valid === true){
      addEmailToSheet(email)
      setIsSubmitted(true)
    }else{
      alert("Invalid Email")
    }
  }

  return (
    <div className="w-full py-20 px-4 bg-gradient-to-br text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className={`${rubikMonoOne.className} text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6`}
        >
          Join Our Launch!
        </h2>
        <p className="antialiased text-center text-sm md:text-base mb-8 max-w-2xl mx-auto">
          We&apos;re excited to announce the launch of our new bulk email validation
          feature, coming soon! Be the first to know when it&apos;s available.
        </p>
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <motion.form
              className="flex flex-col items-center space-y-4"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Label
                htmlFor="notify-email"
                className="text-sm font-medium text-white"
              >
                Get Notified
              </Label>
              <Input
                id="notify-email"
                type="email"
                placeholder="your-email@example.com"
                className="mt-1 h-12 text-white block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full py-2 h-12 bg-white text-black rounded-md hover:bg-white/90 shadow transition duration-200"
              >
                Notify Me!
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-4 bg-white text-black rounded-md shadow"
            >
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p>We&apos;ll notify you when the feature is launched.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}