import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { HashLink } from 'react-router-hash-link';
import clsx from 'clsx';

const NavLinks = lazy(() => import('../Navbar/NavLinks')); // Lazy loading the NavLinks component

const NavBar = () => {
    const [top, setTop] = useState(!window.scrollY);
    const [isOpen, setIsOpen] = useState(false);
    const [useRedGradient, setUseRedGradient] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    const handleClick = () => setIsOpen((prev) => !prev);

    const handleScroll = useCallback(() => {
        setTop(window.pageYOffset <= 10);

        const sections = document.querySelectorAll('section');
        let currentSection = null;
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id;
            }
        });
        setActiveSection(currentSection);
    }, []);

    useEffect(() => {
        const scrollHandler = () => handleScroll();
        window.addEventListener('scroll', scrollHandler);

        const gradientToggle = setInterval(() => {
            setUseRedGradient((prev) => !prev);
        }, 4000);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            clearInterval(gradientToggle);
        };
    }, [handleScroll]);

    return (
        <nav
            className={clsx(
                'fixed top-0 w-full z-30 transition duration-300 ease-in-out mb-16',
                {
                    'shadow-lg bg-white': top,
                    'shadow-lg': !top,
                    'navbar-gradient-red': !top && useRedGradient,
                    'navbar-gradient': !top && !useRedGradient,
                }
            )}
        >
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-row justify-center md:px-12 md:mx-12 items-center text-center font-semibold">
                    <HashLink smooth to="/">
                        <h1 className="font-extrabold text-2xl text-red-900">GAD TANAUAN</h1>
                    </HashLink>
                </div>
                <div className="group flex flex-col items-center">
                    <button
                        className="p-2 rounded-lg lg:hidden text-blue-900"
                        onClick={handleClick}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0-2H4a1 1 0 1 1 0-2z"
                                />
                            )}
                        </svg>
                    </button>
                    <div className="hidden space-x-6 lg:inline-block p-5">
                        <Suspense fallback={<div>Loading menu...</div>}>
                            <NavLinks activeSection={activeSection} />
                        </Suspense>
                    </div>

                    <div
                        id="mobile-menu"
                        className={clsx(
                            'fixed transition-transform duration-300 ease-in-out flex justify-center left-0 w-full h-auto rounded-md p-24 bg-white lg:hidden shadow-xl top-14',
                            { block: isOpen, hidden: !isOpen }
                        )}
                    >
                        <div className="flex flex-col space-y-6">
                            <Suspense fallback={<div>Loading menu...</div>}>
                                <NavLinks activeSection={activeSection} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
