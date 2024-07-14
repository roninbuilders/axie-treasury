"use client";

import Image from "next/image";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <nav
      className={`${isDarkMode ? "bg-[#100f21f2] text-blue-50" : "bg-white text-gray-800"
        } shadow-md`}
    >
      <div className="max-w-6xl mb-4 mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex w-full items-center justify-start relative">
            <Image className="mr-2" src='/shiny-logo.png' width={220 / 7} height={288 / 7} alt="Ronin" />
            <h1 className="text-2xl font-bold text-center text-blue-50">Axie Treasury Chart</h1>

            {/* Dark/Light Mode Switch */}
            {/* <div className="hidden flex items-center space-x-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
