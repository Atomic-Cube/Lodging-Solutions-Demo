import React from 'react';

const NotFound: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">404 — Not Found</h1>
        <p className="text-gray-300">The page you are looking for doesn't exist.</p>
      </div>
    </section>
  );
};

export default NotFound;
