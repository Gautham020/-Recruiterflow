import React from "react";

const Header = () => {
  return (
    <header className="bg-[#77CDFF] text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold ml-120">
          <a href="/" className="hover:text-gray-300">
            Recruiterflow
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
