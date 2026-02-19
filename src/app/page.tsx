import Hero from "@/components/Hero";
import About from "@/components/About";
import Slider from "@/components/Slider";
import Article from "@/components/Article";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";
import ContactFAQ from "@/components/ContactFAQ";

const instagramUrls = [
  "https://www.instagram.com/reel/DClVhpONFGd/",
  "https://www.instagram.com/reel/DCOq8wRtgpd/",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Slider />
      <Article />
      <Testimonials />
      <VideoSection urls={instagramUrls} />
      <ContactFAQ />
    </>
  );
}
