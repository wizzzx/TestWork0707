import { Providers } from "@/app/providers";
import { Viewport } from "next";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/shared/styles/globals.scss";
import React from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import cn from "classnames";

const sfpro = localFont({
  variable: "--font-sfpro",
  src: [
    {
      path: "../shared/fonts/SF-Pro-Display/SFProDisplay-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../shared/fonts/SF-Pro-Display/SFProDisplay-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../shared/fonts/SF-Pro-Display/SFProDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../shared/fonts/SF-Pro-Display/SFProDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../shared/fonts//SF-Pro-Display/SFProDisplay-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../shared/fonts/SF-Pro-Display/SFProDisplay-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../shared/fonts/SF-Pro-Display/SFProDisplay-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  style: ["normal"],
});

export const viewport: Viewport = {
  width: "374f px",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={"en"} className={cn(sfpro.variable, inter.variable)}>
      <body className={`${sfpro.className} ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
