import Banner from "./components/Banner";
import SwiperInit from "./components/SwiperInit";
import HomeContentGrid from "./components/HomeContentGrid";
import Calendar from "./components/Calendar";
import Testimonial from "./components/Testimonial";

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
