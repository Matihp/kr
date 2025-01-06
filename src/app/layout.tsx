import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import {  Footer } from "@/components/Footer/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krovit",
  description: "Generated by Krovit",
  icons: {
    icon: '/favicon.ico' ,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <html lang="en" suppressHydrationWarning>       
        <body className={inter.className} id="bodyScroll">
          <Providers>
            <Header/>
            {children}
            <Footer/>               
          </Providers>   
        </body>     
      </html>    
  );
}
