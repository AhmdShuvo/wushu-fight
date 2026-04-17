import Banner from "./components/Banner";
import SwiperInit from "./components/SwiperInit";
import HomeContentGrid from "./components/HomeContentGrid";
import Calendar from "./components/Calendar";
import Testimonial from "./components/Testimonial";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Bangladesh Wushu Federation - Mastering Martials Arts",
  description: "Welcome to the official homepage of the Bangladesh Wushu Federation (Wushubd). Explore our history, upcoming events, and martial arts training programs in Bangladesh.",
  alternates: {
    canonical: "https://wushubd.com",
  },
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <SwiperInit />

      {/* 2. Slider (Banner) */}
      <Banner />

      {/* 3. Content Grid */}
      <HomeContentGrid />

      {/* 4. Calendar Section */}
      <Calendar />

      {/* 5. Testimonial Section */}
      <Testimonial />
    </>
  );
}
