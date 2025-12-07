import React from 'react';

// Load images from images folder (eager)
const images = import.meta.glob(
  '../../frontend/images/*.{png,jpg,jpeg,svg}',
  { eager: true, as: 'url' }
) as Record<string, string>;

function findImage(name: string) {
  const keys = Object.keys(images);
  const lower = name.toLowerCase();
  for (const k of keys) {
    const base = k.split('/').pop() || k;
    if (base.toLowerCase().includes(lower)) return images[k];
  }
  return undefined;
}

const Card: React.FC = () => {
  const img = findImage('Specsheets_card') || findImage('Specsheet_card');
  const arrow = findImage('right_arrow');

  return (
    <div className="w-[282px] rounded-[14px] border border-[0.5px] border-white/40 p-[18px] flex flex-col justify-between bg-transparent">
      <div>
        <div className="w-full">
          {img ? (
            <img
              src={img}
              alt="Specsheets_card"
              className="w-full h-auto object-contain rounded-sm"
            />
          ) : (
            <div
              className="w-full bg-gray-700 rounded-sm"
              style={{ aspectRatio: '243 / 270' }}
            />
          )}
        </div>

        <div className="mt-[9px] flex items-center justify-between">
          <span
            className="text-[22px] font-semibold leading-[30.49px]"
            style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
          >
            Specsheets
          </span>

          <span
            className="text-[14px] font-semibold leading-[30.49px]"
            style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
          >
            Document
          </span>
        </div>
      </div>

      <div className="mt-[11px]">
        <button
          className="w-full h-[68px] rounded-[27px] flex items-center justify-between pl-[22px] pr-[16px] bg-[#2f2f33] text-[#FFFFFF]"
          style={{
            backdropFilter: 'blur(7.281541347503662px)',
            WebkitBackdropFilter: 'blur(7.281541347503662px)',
          }}
        >
          <span
            className="text-[12.23px] font-semibold"
            style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
          >
            View Online
          </span>

          {arrow ? (
            <img
              src={arrow}
              alt="arrow"
              style={{ width: 42, height: 42 }}
              className="object-contain"
            />
          ) : (
            <svg
              viewBox="0 0 42 42"
              className="w-6 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="#FFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const Specsheet: React.FC = () => {
  const cards = Array.from({ length: 4 }).map((_, i) => <Card key={i} />);

  return (
    <section className="pt-[23px] pl-[62px] pr-[70px] pb-[100px]">
      {/* ✅ 100px bottom padding added */}

      <div className="w-full text-center">
        <h1
          style={{
            fontFamily: 'Urbanist, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '55px',
            lineHeight: '57.83px',
            textTransform: 'capitalize',
          }}
        >
          Specsheet
        </h1>
      </div>

      <div className="mt-[97px]">
        <div className="flex flex-wrap gap-[18px] justify-start">
          {cards}
        </div>
      </div>
    </section>
  );
};

export default Specsheet;
