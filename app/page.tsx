import Banner from "./components/Banner";
import SwiperInit from "./components/SwiperInit";
import HomeContentGrid from "./components/HomeContentGrid";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <SwiperInit />

      {/* 2. Slider (Banner) */}
      <Banner />

      {/* 3. Content Grid */}
      <HomeContentGrid />

      {/* Kept existing sections commented out in case they're needed back
      <Service />
      <About />
      <Feature />
      <CallToAction />
      <Training />
      <Trainer />
      <Event />
      <Testimonial />
      */}
    </>
  );
}
