import React from 'react';
import { HashLink } from 'react-router-hash-link';
import pcwLogo from '../images/pcw.svg';  // Import the PCW logo image

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer max-w-full mx-auto px-4 sm:px-6 py-12">

                    {/* Top Area: City Government of Tanauan with Solid Background */}
                    <div className="grid sm:grid-cols-12 gap-5 py-8 border-t border-gray-200 lg:ml-11">

                        {/* City Government of Tanauan Block */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="p-6 bg-red-900 text-white text-center rounded-lg">
                                <h3 className="font-bold text-2xl sm:text-3xl mb-4">City Government of Tanauan</h3>
                                <p className="text-md font-medium">Tanauan City, Batangas, Philippines</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col items-center mt-8">
                        <p className="text-md font-medium mb-4">Follow us on social media:</p>
                        <ul className="flex justify-center space-x-4">
                            <li>
                                <HashLink
                                    to="#"
                                    className="flex items-center justify-center w-10 h-10 text-blue-900 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-150"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                                    </svg>
                                </HashLink>
                            </li>
                        </ul>
                    </div>

                    {/* Highlighted PCW link with logo */}
                    <div className="mt-4 text-center flex items-center justify-center">
                        <img src={pcwLogo} alt="PCW Logo" className="h-8 mr-2" /> {/* PCW logo */}
                        <p className="text-md font-medium">
                            Visit the <a href="https://pcw.gov.ph" className="text-blue-500 hover:text-blue-700 font-semibold">Philippine Commission on Women (PCW)</a> website for more information.
                        </p>
                    </div>

                    {/* Copyright Area */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Copyright &copy; {new Date().getFullYear()}{" "}
                            <HashLink to="#" className="hover:text-gray-700 transition">
                                City Government of Tanauan
                            </HashLink>
                            . All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
