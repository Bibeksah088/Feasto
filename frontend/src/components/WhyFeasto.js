import React from "react";

const features = [
  {
    emoji: "🚀",
    title: "Fast Delivery",
    description: "Get your food delivered hot and fresh in 30 minutes or less",
    bgColor: "bg-orange-50",
  },
  {
    emoji: "🍳",
    title: "Fresh & Hygienic",
    description: "Prepared with the finest ingredients and strict hygiene standards",
    bgColor: "bg-green-50",
  },
  {
    emoji: "💰",
    title: "Best Prices",
    description: "Affordable meals without compromising on quality or taste",
    bgColor: "bg-blue-50",
  },
  {
    emoji: "🤖",
    title: "AI Assistant",
    description: "Get personalized food recommendations from our smart chatbot",
    bgColor: "bg-purple-50",
  },
];

const WhyFeasto = () => {
  return (
    <div className="px-4 md:px-[30px] py-10">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Why Choose Feasto?
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-[500px] mx-auto">
          We're not just a food delivery app — we're your personal dining experience
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${feature.bgColor} rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
          >
            <span className="text-4xl">{feature.emoji}</span>
            <h3 className="font-bold text-gray-800 text-sm md:text-base">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyFeasto;
