import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Eager-load images placed into src/frontend/images (Vite)
const imageModules = import.meta.glob('../images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  as: 'url',
}) as Record<string, string>;

function findImageUrl(name: string) {
  if (!name) return undefined;
  const keys = Object.keys(imageModules);
  const lower = name.toLowerCase();
  for (const k of keys) {
    const base = k.split('/').pop() || k;
    if (
      base.toLowerCase().startsWith(lower) ||
      base.toLowerCase().includes(lower)
    ) {
      return imageModules[k];
    }
  }
  return undefined;
}

const buttons = [
  { key: 'videos', label: 'Videos', to: '/videos' },
  { key: 'photos', label: 'Photos', to: '/photos' },
  { key: 'three60', label: '360', to: '/360' },
  { key: 'specsheet', label: 'Specsheets', to: '/specsheet' },
  { key: 'timelapses', label: 'Time lapses', to: '/timelapses' },
  { key: 'sitemap', label: 'Sitemap', to: '/sitemap' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside
        className="
        w-[375px]
        flex-shrink-0
        min-h-screen
        border-r-[0.57px]
        border-[#FFFFFF]
        -mt-[105px]
        pt-[15px]
        z-10
        "

    >
      <div className="pt-[120.7px] pb-[32px] pl-[50px] pr-[73px]">
        <div className="mb-[50px]">
          <h2 className="text-[48px] leading-tight font-semibold">
            Kitchen
            <br />
            Trailer
          </h2>
        </div>

        <nav>
          <ul className="flex flex-col list-none p-0 m-0">
            {buttons.map((b) => {
              const isActive = location.pathname === b.to;
              const imgUrl =
                findImageUrl(b.key) ||
                findImageUrl(b.label) ||
                findImageUrl(b.label.toLowerCase());

              return (
                <li key={b.key} className="mb-[12px] last:mb-0">
                  <Link
                    to={b.to}
                    className={`flex items-center w-full h-[68px] rounded-[27px] border border-[#FFFFFF33] pl-[22px] pr-[16px] text-left transition-colors text-[#FFFFFF] ${
                      isActive ? 'bg-[#262627]' : 'bg-transparent'
                    } hover:bg-[#262627]`}
                  >
                    <div
                      className="flex items-center"
                      style={{ width: 32, height: 32 }}
                    >
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={b.label}
                          style={{ width: 32, height: 32 }}
                          className="object-contain"
                        />
                      ) : (
                        <div
                          className="rounded-full bg-gray-600 flex items-center justify-center"
                          style={{ width: 32, height: 32 }}
                          aria-hidden
                        >
                          <span className="text-sm font-semibold text-white">
                            {b.label.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="ml-3 flex-1">
                      <span className="text-[18px] font-semibold text-[#FFFFFF]">
                        {b.label}
                      </span>
                    </div>

                    <div style={{ width: 40, height: 40 }}>
                      {findImageUrl('right_arrow') ? (
                        <img
                          src={findImageUrl('right_arrow')!}
                          alt="arrow"
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full"
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
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
