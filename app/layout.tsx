import type { Metadata } from "next";
import "./globals.css";
import {  Poppins} from "next/font/google";



const poppins =  Poppins({
  weight: "400",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Free Email Validation Tool",
  description: "Try our free email validation tool to quickly clean and verify your email lists. Improve deliverability and boost engagement with accurate email addresses. Get started now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
