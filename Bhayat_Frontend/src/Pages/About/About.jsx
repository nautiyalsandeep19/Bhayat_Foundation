import React from 'react';
import { aboutimg } from '../../About/About.js';
import "./About.css";

const About = () => {
  return (
    <>
      {/* Section: About Bhayat */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">About Bhayat</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                BHAYAT is a non-profit organization established in 2010 by passionate individuals aiming for a healthy and self-reliant India. We focus on education, healthcare, training, awareness, environment, women & child welfare, and relief camps. BHAYAT is dedicated to creating positive, sustainable change in underprivileged communities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-semibold text-lg text-blue-600">🌿 A Million Trees</h4>
                  <p className="text-gray-600 text-sm">For a Greener Future</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-semibold text-lg text-green-600">🍲 Nourishing Lives</h4>
                  <p className="text-gray-600 text-sm">One Meal at a Time</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-semibold text-lg text-cyan-600">🚰 Water Access</h4>
                  <p className="text-gray-600 text-sm">Empowering Every Drop</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-semibold text-lg text-yellow-600">📚 Future Generations</h4>
                  <p className="text-gray-600 text-sm">Investing in Education</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={aboutimg.aboutvision}
                alt="About Bhayat"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Impact</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { count: '2K+', label: 'Volunteers', color: 'text-blue-600' },
              { count: '100+', label: 'Campaigns', color: 'text-green-600' },
              { count: '12+', label: 'Awards', color: 'text-yellow-600' },
              { count: '1500+', label: 'Achievements', color: 'text-purple-600' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <h4 className={`text-4xl font-bold ${stat.color}`}>{stat.count}</h4>
                <p className="text-gray-700 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Legal & Financial */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Legal & Financial Information</h2>
          <div className="space-y-10 text-gray-700 text-base leading-relaxed">
            <div>
              <h5 className="text-xl font-semibold">Givelndia Inc</h5>
              <p><strong>EIN:</strong> 87-4554363</p>
              <p><strong>Address:</strong> 651 N, Broad St., Suite 206, Middletown, Newcastle, Delaware - 19709</p>
            </div>
            <div>
              <h5 className="text-xl font-semibold">SaathiRe Social Impact Solutions Pvt Ltd</h5>
              <p>
                Incorporated under the Companies Act, 2013, limited by shares.
              </p>
              <p><strong>Address:</strong> 2nd floor, Rigel, No. 15-19 Doddanekkundi, Bengaluru, Karnataka - 560037</p>
              <p><strong>Contact:</strong> +91 773 871 4428</p>
              <p><strong>Email:</strong> support@give.do</p>
            </div>
            <div>
              <h5 className="text-xl font-semibold">Give Foundation, Inc.</h5>
              <ul className="list-disc list-inside">
                <li>Conflict of Interest Policy</li>
                <li>Whistleblower Policy</li>
                <li>Document Retention Policy</li>
              </ul>
              <p><strong>Registered Address:</strong> 6901 Syrah Dr, Dublin CA 94568</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p><strong>Correspondence and Checks:</strong></p>
                <p>PO Box 50876</p>
                <p>Palo Alto, 94303</p>
                <p>California, CA</p>
              </div>
              <div>
                <p><strong>GIVING IMPETUS TO VOLUNTARY EFFORT</strong></p>
                <p>04629182</p>
                <p>85 Saxonbury Avenue, Sunbury-On-Thames, England, TW16 5HA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
