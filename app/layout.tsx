import type { Metadata } from "next";
import {  Geologica } from "next/font/google";
import "./globals.css";

const geologica = Geologica({
  subsets: ['latin'],
  weight:['100','200','300','400','500','600','700','800','900'],
  variable: '--font-geologica',
});


export const metadata: Metadata = {
  title: "Serv-r",
  description: "An Open-Source Cloud Storage as Service Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geologica.variable} font-geologica antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
