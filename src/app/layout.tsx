import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ReactNode } from "react";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-indigo-950 bg-indigo-300 dark",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
