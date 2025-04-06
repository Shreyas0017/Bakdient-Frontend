import { ArrowRight, Info } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HeroSection = () => {
  return (
    <section className="bg-[#F9EAE1] min-h-screen flex flex-col py-6 px-4 md:flex-row md:items-center md:justify-between md:px-8 lg:px-20 mt-0 md:mt-[-100px]">
      {/* Left Side: Text Content */}
      <div className="w-full md:max-w-xl flex flex-col justify-center order-2 md:order-1 mt-6 md:mt-0">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F2F2F] leading-tight"
          style={{ fontFamily: "Bungee Shade" }}
        >
          Master Every Recipe with Ease
        </h1>
        <p className="text-base md:text-lg text-gray-700 mt-3 md:mt-4">
          Bakdient is your all-in-one recipe companion, making home cooking
          effortless. Whether you're a beginner or an expert, get step-by-step
          instructions and precise ingredient measurements to cook any dish with
          confidence.
        </p>
        {/* Buttons */}
        <div className="mt-5 md:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="px-4 py-2 md:px-5 md:py-3 bg-[#DC7F9B] text-white text-sm md:text-base rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#c96e8a] transition">
            Get Started <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="px-4 py-2 md:px-5 md:py-3 border border-gray-500 text-gray-800 text-sm md:text-base rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-gray-200 transition">
            Learn More <Info className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
      {/* Right Side: Lottie Animation */}
      <div className="flex justify-center items-center w-full order-1 md:order-2 md:w-1/2 h-64 sm:h-72 md:h-auto">
        <DotLottieReact
          src="https://lottie.host/fa570ae8-2d05-45d4-87b9-123c32cf476b/ycnbtAOtKa.lottie"
          loop
          autoplay
          className="w-full max-w-sm md:max-w-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
