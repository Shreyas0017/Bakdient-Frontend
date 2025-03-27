import { Scale, Sliders, CheckCircle2 } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Flexible Measurements",
    description:
      "Choose your preferred measurement units—cups, spoons, pounds, grams, or kilograms. Our system automatically converts them for accuracy.",
    icon: <Scale className="w-10 h-10 text-[#DC7F9B]" />,
  },
  {
    id: 2,
    title: "Smart Ingredient Adjustment",
    description:
      "Missing an ingredient? Our system suggests alternatives and adjusts the recipe based on what you have.",
    icon: <Sliders className="w-10 h-10 text-[#DC7F9B]" />,
  },
  {
    id: 3,
    title: "Beginner-Friendly Recipes",
    description:
      "Step-by-step instructions with precise measurements make cooking easy for everyone, from beginners to experts.",
    icon: <CheckCircle2 className="w-10 h-10 text-[#DC7F9B]" />,
  },
];

const Features = () => {
  return (
    <section className="bg-gradient-to-br from-[#F9EAE1] to-[#FFE5D9] py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-5xl font-extrabold text-[#2F2F2F] mb-4 tracking-tight">
            Why Choose Bakdient?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Simplify your cooking experience with intelligent features designed
            to make every recipe a success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 p-8 text-center"
            >
              <div className="bg-[#DC7F9B]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#2F2F2F] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
