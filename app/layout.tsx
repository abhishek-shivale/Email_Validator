import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Rubik_Mono_One, Poppins} from "next/font/google";



export const poppins =  Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const rubikMonoOne = Rubik_Mono_One({
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
