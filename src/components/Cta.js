import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as VawSvg } from '../images/vaw.svg'; // Import the SVG as a React component
import ChristineImg from '../images/christine.webp'; // Import the WebP image

const Cta = () => {
    return (
        <div
            className="w-full flex flex-col items-center justify-center text-white p-8 relative"
            style={{
                background: 'linear-gradient(to right, rgb(113, 23, 98), #ff6f91, rgb(167, 5, 153))',
            }}
        >
            {/* ChristineImg: Hidden on mobile */}
            <img
                src={ChristineImg}
                alt="Christine"
                className="absolute top-2 right-20 w-[80%] h-[100%] transform translate-x-1/3 translate-y-[-10rem] hidden md:block"
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)',
                }}
            />

            {/* Main Content */}
            <div className="text-center mb-6 z-10">
                {/* VawSvg: Optimized for responsiveness */}
                <VawSvg className="w-full sm:w-[120%] md:w-[140%] max-w-[1200px] h-auto mx-auto mb-4" />
                <p className="text-3xl md:text-5xl font-extrabold mb-2">About Gender and Development</p>
                <p className="text-lg md:text-2xl">Let’s work together to create a more inclusive world for everyone, regardless of gender.</p>
            </div>

            {/* Call to Action Button */}
            <div className="w-full flex justify-center mb-6 z-10">
                <Link
                    to="/contact"
                    className="bg-pink-700 border border-transparent hover:bg-white-900 text-white text-lg font-medium rounded-lg px-8 py-3 flex items-center group"
                >
                    Reach Out
                    <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-2 transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-8 mb-4 z-10">
                {/* Facebook Icon */}
                <Link to="https://www.facebook.com/gadtanauan" target="_blank" className="transform hover:scale-110 transition duration-300">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png"
                        alt="Facebook"
                        className="w-10 h-10"
                    />
                </Link>

                {/* Instagram Icon */}
                <Link to="https://instagram.com" target="_blank" className="transform hover:scale-110 transition duration-300">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        alt="Instagram"
                        className="w-10 h-10"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Cta;
