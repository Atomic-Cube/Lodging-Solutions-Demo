import React from 'react';
import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    // ✅ Full window locked, NO scrolling on layout
    <div className="h-screen flex flex-col bg-slate-900 text-white pl-4 md:pl-[50px] overflow-hidden">

      {/* ✅ FIXED HEADER */}
      <Nav />

      {/* ✅ BODY AREA (SIDEBAR FIXED, CONTENT SCROLLS) */}
      <div className="flex flex-1 overflow-hidden">

        {/* ✅ FIXED SIDEBAR */}
        <Sidebar />

        {/* ✅ ONLY THIS SCROLLS */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

      {/* ✅ FIXED FOOTER */}
      
    </div>
  );
};

export default MainLayout;
