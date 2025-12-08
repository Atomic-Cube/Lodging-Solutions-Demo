import React from 'react';
import headerBtn from '../images/header_btn.png';
import logo from '../images/logo.png';

const Nav: React.FC = () => {
  return (
    <header className="w-full relative z-50 shrink-0">
      {/* ================= Upper Header ================= */}
      <div className="w-full bg-transparent">
        <div className="flex items-center px-6 md:px-[50px] py-4">
          <div className="flex items-center gap-8">
            <img
              src={headerBtn}
              alt="back"
              className="w-[48px] h-[48px] object-contain"
            />
            <img
              src={logo}
              alt="logo"
              className="w-[260px] max-w-full object-contain"
            />
          </div>
        </div>

        {/* Border under upper header */}
        <div
          className="mx-6 md:mx-[50px] border-b border-white"
          style={{ borderBottomWidth: '0.7px' }}
        />
      </div>

      {/* ================= Lower Header ================= */}
      <div className="w-full">
        <div className="flex items-center px-6 md:px-[50px] py-3">
          <p
            className="text-[18px] text-white"
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
          className="mx-6 md:mx-[50px] border-b border-white"
          style={{ borderBottomWidth: '0.7px' }}
        />
      </div>
    </header>
  );
};

export default Nav;
