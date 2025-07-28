import HeroSlider from "../../components/section/HeroSlider";
import NavBar from "../../components/section/NavBar";
import Button from "../../components/ui/Button";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className=" w-full h-auto flex items-center justify-center ">
        <div className="w-full h-full max-w-[1240px] p-4 mt-8">
          <div className="flex flex-col gap-2">
            <h1 className=" text-5xl md:text-[8.2vw] font-bold">INNOVATION LABS</h1>
            <p className=" text-md md:text-xl max-w-[600px]">There are many variations of passages of Lorem Ipsum available, but the  majority have suffered alteration in some form, by injected humour, or  randomised words which don't look even slightly believable.</p>
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <Button>Get Started</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
      <div>
        <HeroSlider/>
      </div>
    </div>
  );
}
