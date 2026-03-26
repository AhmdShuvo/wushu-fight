import type { Metadata } from "next";
import { Kanit, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AosInit from "./components/AosInit";
import { Providers } from "./components/Providers";

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Wushu - Wushu & Kung Fu Fighting Federation",
  description: "Master the art of Wushu and Kung Fu at Wushu Fighting Federation. Join us for traditional and modern martial arts training.",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/lightcase.css" />
        <link rel="stylesheet" href="/assets/css/odometer.css" />
        <link rel="stylesheet" href="/assets/css/icomoon.css" />
        <link rel="stylesheet" href="/assets/css/line-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/aos.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/flipclock.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className={`${kanit.variable} ${roboto.variable}`}>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <AosInit />
          <Header />

          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
        <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/lightcase.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/odometer.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/viewport.jquery.js" strategy="afterInteractive" />
        <Script src="/assets/js/circle-progress.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/aos.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.nice-select.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.paroller.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/flipclock.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.countdown.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.easypiechart.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/preloader.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
