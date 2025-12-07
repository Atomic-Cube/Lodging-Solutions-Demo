import React from 'react';
import headerBtn from '../images/header_btn.png';
import logo from '../images/logo.png';

const Nav: React.FC = () => {
  return (
    <header className="w-full relative z-50">
      {/* ================= Upper Header ================= */}
      <div className="w-full bg-transparent">
        <div className="flex items-center h-[120px] px-[50px]">
          <div className="flex items-center gap-[40px]">
            <img
              src={headerBtn}
              alt="back"
              className="w-[67.624px] h-[67.624px] object-contain"
            />
            <img
              src={logo}
              alt="logo"
              className="w-[315.705px] h-[62.563px] object-contain"
            />
          </div>
        </div>

        {/* Border under upper header */}
        <div
          className="mx-[50px] border-b border-white"
          style={{ borderBottomWidth: '0.7px' }}
        />
      </div>

      {/* ================= Lower Header ================= */}
      <div className="w-full">
        <div className="flex items-center h-[68px] py-[18px] px-[50px]">
          <p
            className="text-[20px] text-white"
            style={{
              fontFamily: 'Urbanist, system-ui, sans-serif',
              fontWeight: 400,
            }}
          >
            safer, faster and better.
          </p>
        </div>

        {/* Border under lower header */}
        <div
          className="mx-[50px] border-b border-white"
          style={{ borderBottomWidth: '0.7px' }}
        />
      </div>
    </header>
  );
};

export default Nav;
