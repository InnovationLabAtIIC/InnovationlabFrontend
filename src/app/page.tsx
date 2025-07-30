import Events from "../../components/section/Events";
import Hero from "../../components/section/Hero";
import NavBar from "../../components/section/NavBar";
import Updates from "../../components/section/Updates";
import FAQs from "../../components/section/FAQS";
import Testimonials from "../../components/section/Testimonials";
import Footer from "../../components/section/Footer";
import MarqueeText from "../../components/ui/MarqueeText";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <AboutUs />
      <Events />
      <Updates />
      <Testimonials/>
      <FAQs />
    </div>
  );
}

function AboutUs() {
  return (
    <section className="w-screen min-h-screen flex justify-center bg-white py-0 md:py-16 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full opacity-30 pointer-events-none z-0 hidden md:block">
      </div>
    </section>
  );
}


