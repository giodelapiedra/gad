import React from 'react';
import { HashLink } from 'react-router-hash-link';

const NavLinks = ({ activeSection }) => {
    return (
        <>
            <HashLink
                className={`px-4 font-extrabold ${activeSection === 'about' ? 'text-blue-900' : 'text-gray-500'} hover:text-blue-900`}
                smooth
                to="/#Home"
            >
                Home
            </HashLink>
            <HashLink
                className={`px-4 font-extrabold ${activeSection === 'services' ? 'text-blue-900' : 'text-gray-500'} hover:text-blue-900`}
                smooth
                to="/#services"
            >
                Services
            </HashLink>
            <HashLink
                className={`px-4 font-extrabold ${activeSection === 'portfolio' ? 'text-blue-900' : 'text-gray-500'} hover:text-blue-900`}
                to="/#portfolio"
            >
                Program
            </HashLink>
            <HashLink
                className={`px-4 font-extrabold ${activeSection === 'Articales' ? 'text-blue-900' : 'text-gray-500'} hover:text-blue-900`}
                to="/Articales"
            >
              Articles
            </HashLink>
         
            <HashLink
                className={`text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl ${activeSection === 'gadDatabase' ? 'text-blue-800' : ''}`}
                smooth
                to="/Database"
            >
                GAD DATABASE
            </HashLink>
        </>
    );
};

export default NavLinks;
