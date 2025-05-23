import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AnimatePresence } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
  display: "swap", 
});



export const metadata: Metadata = {
  title: "Volunteer Hub",
  description:
    "Find volunteer opportunities that matter. Connect, contribute, and make an impact with Volunteer Hub!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AnimatePresence mode="wait">{children}</AnimatePresence></body>
    </html>
  );
}
