import React from 'react';
import img from '../images/web.svg';
import img2 from '../images/app.svg';
import img3 from '../images/hosting.svg';
import img4 from '../images/consultation.svg';
import womenBg from '../images/human.webp'; // Import the women.svg image

const Services = () => {
  return (
<div
  id="services"
  className="py-12 relative"
  style={{
    background: `url(${womenBg}) no-repeat center center`,
    backgroundSize: 'cover', // Ensures the image covers the full width and height
    backgroundPosition: 'center center', // Centers the background
    backgroundAttachment: 'fixed', // Keeps the background fixed during scrolling
    overflow: 'hidden',
    width: '100%', // Ensures the width is 100% of the parent container
    height: 'auto', // Adjusts the height automatically to maintain aspect ratio
  }}
>
      {/* Overlay to darken the background for better text visibility */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better contrast
          zIndex: 1,
        }}
      />

      <section data-aos="zoom-in-down" style={{ position: 'relative', zIndex: 2 }}>
        <div className="my-4 py-4">
          <h2 className="my-2 text-center text-3xl text-white uppercase font-bold">GAD DATABASE</h2>

          <div className="flex justify-center">
            <div className="w-24 border-b-4 border-transparent"></div>
          </div>
          <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-white">
            Data for Development, Equality for All.
          </h2>
        </div>

        <div className="px-12" data-aos="fade-down" data-aos-delay="600">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <img
                  alt="Laws on GAD"
                  className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
                  src={img3}
                  loading="lazy" // Lazy loading for mobile optimization
                />
                <h2 className="font-semibold my-4 text-2xl text-center">POLICIES</h2>
                <p className="text-md font-medium">
                  Explore the various laws surrounding gender and development to ensure equality in all aspects.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <img
                  alt="GAD Code"
                  className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
                  src={img2}
                  loading="lazy" // Lazy loading for mobile optimization
                />
                <h2 className="font-semibold my-4 text-2xl text-center">PROJECT/PROGRAM</h2>
                <p className="text-md font-medium">
                  Learn about the Gender and Development (GAD) Code, a framework for promoting gender equality.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <img
                  alt="IEC Materials"
                  className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
                  src={img}
                  loading="lazy" // Lazy loading for mobile optimization
                />
                <h2 className="font-semibold my-4 text-2xl text-center">TRAININGS & SEMINARS</h2>
                <p className="text-md font-medium">
                  Access valuable IEC (Information, Education, Communication) materials to promote gender awareness.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <img
                  alt="Articles"
                  className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
                  src={img4}
                  loading="lazy" // Lazy loading for mobile optimization
                />
                <h2 className="font-semibold my-4 text-2xl text-center">ARTICLES</h2>
                <p className="text-md font-medium">
                  Read insightful articles on gender and development to stay informed on the latest trends and policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
