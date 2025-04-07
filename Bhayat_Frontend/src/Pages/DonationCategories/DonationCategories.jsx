import React from "react";

const donationCategories = [
  {
    id: 1,
    icon: "📊",
    title: "Food Donation",
    description:
      "Food donation combats hunger, reduces waste, and ensures nutritious meals reach those in need, fostering community support.",
  },
  {
    id: 2,
    icon: "🩺",
    title: "Medical Care",
    description:
      "Medical care donations improve access to essential services, promote health equity, and support vulnerable communities in need.",
  },
  {
    id: 3,
    icon: "🎓",
    title: "Child Education",
    description:
      "Child education donations provide learning opportunities, empower future generations, and help break the cycle of poverty.",
  },
  {
    id: 4,
    icon: "🌪️",
    title: "Disaster Relief",
    description:
      "Support disaster relief efforts to help communities recover from natural calamities by providing food, shelter, and medical aid.",
  },
  {
    id: 5,
    icon: "🐾",
    title: "Animal Welfare",
    description:
      "Animal welfare donations help rescue, shelter, and provide medical care to animals in need, ensuring their safety and well-being.",
  },
  {
    id: 6,
    icon: "👴",
    title: "Elderly Care",
    description:
      "Contribute to elderly care programs that provide medical aid, shelter, and social support to senior citizens in need.",
  },
];

const DonationCategories = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Support a Cause</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {donationCategories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            <span className="text-5xl text-blue-500 mb-4">{category.icon}</span>
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCategories;
