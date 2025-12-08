<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import usePortalWindow from './usePortalWindow';

const App = () => {
  const { openPortalWindow } = usePortalWindow();
=======
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import { MainLayout, Home, About, Photos, Videos, ThreeSixty, Specsheet, TimeLapses, Sitemap, NotFound } from './frontend';
>>>>>>> origin/Frontend

const App: React.FC = () => {
  return (
<<<<<<< HEAD
    <Routes>
      <Route
        path="/"
        element={<Login openPortal={openPortalWindow} />}
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
=======
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/photos" element={<MainLayout><Photos /></MainLayout>} />
        <Route path="/videos" element={<MainLayout><Videos /></MainLayout>} />
        <Route path="/360" element={<MainLayout><ThreeSixty /></MainLayout>} />
        <Route path="/specsheet" element={<MainLayout><Specsheet /></MainLayout>} />
        <Route path="/timelapses" element={<MainLayout><TimeLapses /></MainLayout>} />
        <Route path="/sitemap" element={<MainLayout><Sitemap /></MainLayout>} />
        <Route path="/404" element={<MainLayout><NotFound /></MainLayout>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
>>>>>>> origin/Frontend
  );
};

export default App;
