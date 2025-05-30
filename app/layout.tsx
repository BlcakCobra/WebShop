import React from "react";
import ReduxProvider from "./ReduxProvider"; 
import Navbar from "./Components/Navbar/Navbar";
import { Metadata } from "next";
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
