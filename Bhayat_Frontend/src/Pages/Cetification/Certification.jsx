import React from "react";
import { assets } from '../../myassets.js';

const certificates = [
  {
    title: "Bhayat Registration Certificate",
    description: [
      "Bhayat NGO is registered under Societies Registration Act XXI of 1860.",
      "Registration No: 6810E / 2010",
      "Location: D-322, Phase IV, Aya Nagar Ext, New Delhi – 110047",
      "Date: 11th Jan 2010",
    ],
    image: assets.certificate1,
  },
  {
    title: "Approval Letter for Form CSR1",
    description: [
      "We are pleased to inform you that BHAYAT NGO, a distinguished entity dedicated to the preservation and promotion of cultural heritage, has been approved for Form CSR1.",
    ],
    image: assets.certificate2,
  },
  {
    title: "Bhayat 12-A Income Tax Registration",
    description: [],
    image: assets.certificate3,
  },
  {
    title: "Bhayat 80G Income Tax Registration",
    description: [
      "We are pleased to inform you that BHAYAT NGO, a distinguished entity dedicated to the preservation and promotion of cultural heritage, is certified under 80G income tax exemption.",
    ],
    image: assets.certificate4,
  },
];

const Certification = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      {/* Marquee */}
      <marquee
        className="bg-black text-white py-3 px-4 text-sm sm:text-base font-medium tracking-wide rounded-md shadow mb-10"
        scrollamount="6"
      >
        Bhayat is a nonprofit organization dedicated to uplifting underprivileged
        communities through education, healthcare, and social welfare initiatives.
        Committed to fostering equality and empowerment, Bhayat works tirelessly to
        provide resources, opportunities, and support to create a sustainable and
        inclusive future for all.
      </marquee>

      {/* Certificates */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        Certifications
      </h2>

      <div className="space-y-16">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-10 bg-white shadow-xl rounded-xl p-6 sm:p-10 transition duration-300 hover:shadow-2xl`}
          >
            <div className="flex-1">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto rounded-md object-contain shadow-md"
              />
            </div>
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {cert.title}
              </h3>
              {cert.description.map((desc, i) => (
                <p key={i} className="text-gray-600 text-base leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certification;
