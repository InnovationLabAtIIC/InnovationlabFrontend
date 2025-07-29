import Events from "../../components/section/Events";
import Hero from "../../components/section/Hero";
import NavBar from "../../components/section/NavBar";
import Updates from "../../components/section/Updates";
import FAQs from "../../components/section/FAQS";
import Testimonials from "../../components/section/Testimonials";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Hero />
      <Missions />
      <Events />
      <Updates />
      <Testimonials/>
      <FAQs />
    </div>
  );
}




function Missions() {
  return (
    <div className="w-screen h-screen flex justify-center my-0  pb-16">
      <div className="max-w-[1240px] w-full my-0 h-auto mt-0 flex flex-col md:px-0 px-4">
      </div>
    </div>
  )
}


