import Image from 'next/image';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[rgba(0, 0, 0, .1)] shadow-md text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex w-full items-center justify-between relative">
            <div className="absolute left-0 right-0">
              <h1 className="text-2xl font-bold text-center text-blue-900">Axie Treasury Chart</h1>
            </div>
            <Image src='/shiny-logo.png' width={220/7} height={288/7} alt="Ronin" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
