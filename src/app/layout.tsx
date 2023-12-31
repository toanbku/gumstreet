import { Metadata } from "next";
import { Inter } from "next/font/google";
import SolanaProvider from "@/utils/SolanaProvider";
import QueryProvider from "@/utils/QueryProvider";

import Sidebar from "./components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GumStreet",
  description: "Selling digital asset and crypto payment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <SolanaProvider>
            <div className="flex relative">
              <Sidebar />
              <div className="flex-1 max-w-screen-xl mx-auto px-10 pb-10 lg:pt-10 pt-16 min-h-screen overflow-y-auto">
                {children}
              </div>
            </div>
          </SolanaProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
