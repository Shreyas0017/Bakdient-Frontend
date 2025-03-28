import { ArrowRight, Info } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HeroSection = () => {
  return (
    <section className="bg-[#F9EAE1] min-h-screen flex flex-col md:flex-row items-center justify-between px-20 pt-10 mt-[-100px]">
      {/* Left Side: Text Content */}
      <div className="max-w-xl flex flex-col justify-center h-full">
        <h1
          className="text-5xl font-bold text-[#2F2F2F] leading-tight"
          style={{ fontFamily: "Bungee Shade" }}
        >
          Master Every Recipe with Ease
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Bakdient is your all-in-one recipe companion, making home cooking
          effortless. Whether you're a beginner or an expert, get step-by-step
          instructions and precise ingredient measurements to cook any dish with
          confidence.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-3 bg-[#DC7F9B] text-white text-lg rounded-full flex items-center gap-2 shadow-md hover:bg-[#c96e8a] transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-6 py-3 border border-gray-500 text-gray-800 text-lg rounded-full flex items-center gap-2 shadow-md hover:bg-gray-200 transition">
            Learn More <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="flex justify-center items-center w-full md:w-1/2 mt-4 md:mt-0">
        <DotLottieReact
          src="https://lottie.host/fa570ae8-2d05-45d4-87b9-123c32cf476b/ycnbtAOtKa.lottie"
          loop
          autoplay
          style={{ width: "615px", height: "615px" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
