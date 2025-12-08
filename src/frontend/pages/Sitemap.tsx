import React from 'react';

// eager import any Sitemap_x images if present
const imageModules = import.meta.glob('../images/Sitemap_*.*', { eager: true, as: 'url' }) as Record<string, string>;
const fallback = import.meta.glob('../images/Sitemap.*', { eager: true, as: 'url' }) as Record<string, string>;

function findImage(name: string) {
  const keys = Object.keys(imageModules);
  for (const k of keys) {
    const base = k.split('/').pop() || k;
    if (base.toLowerCase().startsWith(name.toLowerCase())) return imageModules[k];
  }
  // fallback to generic Sitemap.png if present
  const fbKeys = Object.keys(fallback);
  if (fbKeys.length) return fallback[fbKeys[0]];
  return undefined;
}

const Sitemap: React.FC = () => {
  const imgs = [
    findImage('Sitemap_1'),
    findImage('Sitemap_2'),
    findImage('Sitemap_3'),
    findImage('Sitemap_4'),
  ];

  return (
    <section className="py-8 px-4">
      <div className="w-[992px] mx-auto">
        <h1 className="text-3xl font-semibold">Sitemap</h1>

        <div style={{ height: 33 }} />

        <div className="grid grid-cols-2 gap-[6px] place-items-center">
          {imgs.map((src, idx) => (
            <div key={idx}>
              {src ? (
                <img
                  src={src}
                  alt={`Sitemap_${idx + 1}`}
                  className="w-[493px] h-[281px] object-cover block"
                  width={493}
                  height={281}
                  draggable={false} // ✅ make image undraggable
                />
              ) : (
                <div className="w-[493px] h-[281px] bg-gray-800 flex items-center justify-center text-gray-400">
                  Missing image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default Sitemap;
