import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import PageTransitionEffect from "@/components/PageTransitionEffect";
import Footer from "@/components/Footer";

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
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={poppins.className}>
        <PageTransitionEffect>
          <Header />
          <main className="min-h-screen bg-gray-50 flex flex-col">
            {children}
          </main>
         <Footer />
        </PageTransitionEffect>
      </body>
    </html>
  );
}
