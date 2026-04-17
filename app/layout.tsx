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
  metadataBase: new URL("https://wushubd.com"),
  title: {
    default: "Wushu - Bangladesh Wushu Federation | Wushubd",
    template: "%s | Bangladesh Wushu Federation",
  },
  description: "Official portal of the Bangladesh Wushu Federation. Master the art of Wushu and Kung Fu. Join us for traditional and modern martial arts training in Bangladesh.",
  keywords: [
    "wushu",
    "wushu federation",
    "wushubd",
    "bangladesh wushu",
    "wushu bangladesh",
    "martial arts bangladesh",
    "kung fu bangladesh",
    "wushu training",
    "wushu competition",
  ],
  authors: [{ name: "Bangladesh Wushu Federation" }],
  creator: "Bangladesh Wushu Federation",
  publisher: "Bangladesh Wushu Federation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://wushubd.com",
    siteName: "Bangladesh Wushu Federation",
    title: "Bangladesh Wushu Federation - Mastering Martials Arts",
    description: "The official home of Wushu in Bangladesh. Promoting excellence in traditional and contemporary martial arts.",
    images: [
      {
        url: "/assets/images/wushu_logo.png",
        width: 1200,
        height: 630,
        alt: "Bangladesh Wushu Federation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladesh Wushu Federation",
    description: "Official portal of the Bangladesh Wushu Federation. Join our martial arts community.",
    images: ["/assets/images/wushu_logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/assets/images/fav.png",
    apple: "/assets/images/fav.png",
  },
  verification: {
    google: "google-site-verification-id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bangladesh Wushu Federation",
  "url": "https://wushubd.com",
  "logo": "https://wushubd.com/assets/images/wushu_logo.png",
  "sameAs": [
    "https://facebook.com/wushubangladesh",
    "https://twitter.com/wushubd",
    "https://instagram.com/wushubd"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+880-2-9565503",
    "contactType": "customer service",
    "areaServed": "BD",
    "availableLanguage": ["Bengali", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Room 32, 2nd Floor, Bangabandhu National Stadium, Puraana Paltan",
    "addressLocality": "Dhaka",
    "postalCode": "1000",
    "addressCountry": "BD"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
          <Toaster position="bottom-center" reverseOrder={false} />
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
