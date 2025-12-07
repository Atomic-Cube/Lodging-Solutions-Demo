import React, { useState } from 'react';
import headerBtn from '../images/header_btn.png';
import logo from '../images/logo.png';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          <div className="flex items-center justify-between h-[68px] py-[18px] px-[50px]">
            <p
              className="text-[20px] text-white"
              style={{
                fontFamily: 'Urbanist, system-ui, sans-serif',
                fontWeight: 400,
              }}
            >
              safer, faster and better.
            </p>

            <div className="flex items-center gap-6">
              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-6 items-center">
                <a href="/" className="text-sm text-white hover:text-indigo-400">Home</a>
                <a href="/about" className="text-sm text-white hover:text-indigo-400">About</a>
                <a href="/photos" className="text-sm text-white hover:text-indigo-400">Photos</a>
                <a href="/videos" className="text-sm text-white hover:text-indigo-400">Videos</a>
              </nav>

              {/* Mobile Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setOpen(o => !o)}
                  className="p-2 rounded-md text-gray-200 hover:bg-white/5"
                  aria-label="Toggle menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Border under lower header */}
          <div
            className="mx-[50px] border-b border-white"
            style={{ borderBottomWidth: '0.7px' }}
          />
        </div>
      </header>

      {/* ================= Mobile Menu (FULL HEIGHT, TOP-ALIGNED) ================= */}
      {open && (
        <div className="fixed inset-0 top-[188px] md:hidden z-40 bg-[#0f0f10]">
          <div className="h-full px-[50px] pt-6 overflow-y-auto">
            <nav className="flex flex-col gap-3 items-start">
              <a href="/" className="px-4 py-3 text-white rounded-md hover:bg-white/5 w-full">
                Home
              </a>
              <a href="/about" className="px-4 py-3 text-white rounded-md hover:bg-white/5 w-full">
                About
              </a>
              <a href="/photos" className="px-4 py-3 text-white rounded-md hover:bg-white/5 w-full">
                Photos
              </a>
              <a href="/videos" className="px-4 py-3 text-white rounded-md hover:bg-white/5 w-full">
                Videos
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
