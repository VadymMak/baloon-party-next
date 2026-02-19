import Hero from "@/components/Hero";
import About from "@/components/About";
import Slider from "@/components/Slider";
import Article from "@/components/Article";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import ContactFAQ from "@/components/ContactFAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Slider />
      <Article />
      <Testimonials />
      <BlogPreview />
      <ContactFAQ />
    </>
  );
}
