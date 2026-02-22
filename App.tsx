import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RoleSelection from './components/RoleSelection';
import ManagerDashboard from './components/ManagerDashboard';
import ChefDashboard from './components/ChefDashboard';
import DisplayBoard from './components/DisplayBoard';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/chef" element={<ChefDashboard />} />
        <Route path="/display" element={<DisplayBoard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;