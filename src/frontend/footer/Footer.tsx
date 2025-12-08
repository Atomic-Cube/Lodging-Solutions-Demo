import React from 'react';
import homeIcon from '../images/Home.png';
import downloadIcon from '../images/Download.png';
import shareLinkIcon from '../images/Share_link.png';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t-[0.57px] border-t-[rgba(255,255,255,1)] bg-transparent">
      <div className="mx-auto max-w-[1668px] h-[119px] flex">
        {/* Column 1 - Home */}
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-[7px] bg-transparent rounded-none focus:outline-none"
        >
          <img
            src={homeIcon}
            alt="Home"
            className="w-[30px] h-[30px] object-contain"
          />
          <span
            className="text-[20px] leading-[31.71px] font-normal tracking-[-0.018em] text-white"
            style={{ fontFamily: 'Urbanist' }}
          >
            Home
          </span>
        </button>

        {/* Separator */}
        <div className="w-[0.57px] bg-[rgba(255,255,255,1)]" />

        {/* Column 2 - Download */}
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-[7px] bg-transparent rounded-none focus:outline-none"
        >
          <img
            src={downloadIcon}
            alt="Download"
            className="w-[30px] h-[30px] object-contain"
          />
          <span
            className="text-[20px] leading-[31.71px] font-normal tracking-[-0.018em] text-white"
            style={{ fontFamily: 'Urbanist' }}
          >
            Download
          </span>
        </button>

        {/* Separator */}
        <div className="w-[0.57px] bg-[rgba(255,255,255,1)]" />

        {/* Column 3 - Share Link */}
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-[7px] bg-transparent rounded-none focus:outline-none"
        >
          <img
            src={shareLinkIcon}
            alt="Share link"
            className="w-[30px] h-[30px] object-contain"
          />
          <span
            className="text-[20px] leading-[31.71px] font-normal tracking-[-0.018em] text-white"
            style={{ fontFamily: 'Urbanist' }}
          >
            Share Link
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
