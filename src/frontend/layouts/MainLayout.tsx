import React from 'react';
import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';

type Props = {
  children: React.ReactNode;
};


const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    // Mobile-first: a small left padding on xsmall devices, but desktop uses exact 50px left padding.
    <div className="min-h-screen flex flex-col bg-slate-900 text-white pl-4 md:pl-[50px]">
      <Nav />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
