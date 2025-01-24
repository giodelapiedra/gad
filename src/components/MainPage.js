import React, { Suspense, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import heroImg from '../images/web-dev.svg';  
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Chatbox from './Chatbox'; // Import the Chatbox component
const LazyNavBar = React.lazy(() => import('./Navbar/NavBar'));

const SocialMediaIcons = memo(() => (
    <div className="flex justify-center items-center mt-4 mb-8 space-x-6">
        <a href="https://www.facebook.com/gadtanauan" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="text-white text-3xl hover:text-gray-300 transition duration-300 ease-in-out" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-white text-3xl hover:text-gray-300 transition duration-300 ease-in-out" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-white text-3xl hover:text-gray-300 transition duration-300 ease-in-out" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube className="text-white text-3xl hover:text-gray-300 transition duration-300 ease-in-out" />
        </a>
    </div>
));

const MainPage = () => {
    const learnMoreIcon = useMemo(() => (
        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
    ), []);

    return (
        <div className="relative bg-gradient-to-t from-[#ff385c] to-[#6b1f79] min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <LazyNavBar />
            </Suspense>

            <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-full flex items-center justify-center relative z-10">
                <div id="hero" className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left space-y-6 lg:space-y-0">
                    <div className="lg:w-1/2 flex flex-col justify-center text-white" data-aos="fade-up" data-aos-delay="200">
                        <h1 className="mb-5 md:text-5xl text-3xl font-extrabold text-white pb-2 relative">
                            Gender <span className="text-white">and Development</span>
                            <div className="absolute bottom-0 left-0 w-24 h-1 bg-gray-300"></div>
                        </h1>
                        <div className="text-xl font-semibold tracking-tight mb-5">
                            Gender and Development (GAD) focuses on creating inclusive solutions that promote equality and support diverse needs within organizations and communities.
                        </div>
                        <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                            <Link to="/contact" className="text-white bg-[#ff385c] hover:bg-[#e2003c] inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 transition-all duration-300 ease-in-out transform hover:scale-105">
                                Learn More {learnMoreIcon}
                            </Link>
                        </div>
                    </div>
                    <div className="flex lg:justify-end w-full lg:w-1/2" data-aos="fade-up" data-aos-delay="700">
                        <img alt="hero" className="rounded-t float-right duration-1000 w-full transform hover:scale-105 transition-all" src={heroImg} loading="lazy" />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center mt-8 mb-4">
                <div className="w-full max-w-sm border-t border-gray-300"></div>
            </div>

            <SocialMediaIcons />

            <Chatbox />
        </div>
    );
}

export default MainPage;
