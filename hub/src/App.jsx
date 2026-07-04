import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarketingService from './pages/MarketingService';
import Marketing3D from './pages/Marketing3D';
import Documentation from './pages/Documentation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoadmapModal from './components/RoadmapModal';
import RoadmapSoltHubModal from './components/RoadmapSoltHubModal';
import WhitepaperModal from './components/WhitepaperModal';
import Home from './pages/Home';
import Presale from './pages/Presale';
import Dashboard from './pages/Dashboard';
import TermsOfUse from './pages/TermsOfUse';
import PrivatePolicy from './pages/PrivatePolicy';
import { Web3Provider } from './context/Web3Provider';
import SoltLogo from './components/SoltLogo';
import './pages/Presale.css';

function App() {
  // Sidebar State
  const [isOpen, setIsOpen] = useState(false);

 // Modal States
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isSoltHubRoadmapOpen, setIsSoltHubRoadmapOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);

  // Sidebar Toggle
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Core Soltcoin Modal Handlers
  const openRoadmap = () => setIsRoadmapOpen(true);
  const closeRoadmap = () => setIsRoadmapOpen(false);

  // SoltHub Macro Modal Handlers
  const openSoltHubRoadmap = () => setIsSoltHubRoadmapOpen(true);
  const closeSoltHubRoadmap = () => setIsSoltHubRoadmapOpen(false);

  // Whitepaper Modal Handlers
  const openWhitepaper = () => setIsWhitepaperOpen(true);
  const closeWhitepaper = () => setIsWhitepaperOpen(false);

  return (
    <Web3Provider>
      <Router>
        {/* Main Background Layout */}
        <div
          className="text-white min-h-screen overflow-x-hidden flex flex-col font-sans relative"
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #0b1426 35%, #0b1426 100%)',
          }}
        >
          {/* Navbar */}
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar toggleSidebar={toggleSidebar} />
          </div>

          {/* Main Layout */}
          <div className="flex pt-16 min-h-screen flex-1">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                isOpen? 'ml-64' : 'ml-20'
              }`}
            >
              {/* Page Content */}
              <main className="flex-1 px-4 md:px-8 py-6">
                <Routes>
                  {/* Home */}
                  <Route
                    path="/"
                    element={
                      <Home
                        openRoadmap={openRoadmap}
                        openSoltHubRoadmap={openSoltHubRoadmap}
                        openWhitepaper={openWhitepaper}
                      />
                    }
                  />
                  {/* Core Pages */}
                  <Route path="/presale" element={<Presale />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/terms" element={<TermsOfUse />} />
                  <Route path="/privacy" element={<PrivatePolicy />} />
                  {/* Marketing */}
                  <Route path="/marketing" element={<Marketing3D />} />
                  <Route path="/marketing-legacy" element={<MarketingService />} />
                  {/* Documentation */}
                  <Route path="/documentation" element={<Documentation />} />
                </Routes>
              </main>

              {/* Footer */}
              <div className="mt-auto w-full">
                <Footer />
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <RoadmapModal isOpen={isRoadmapOpen} onClose={closeRoadmap} />
        <RoadmapSoltHubModal isOpen={isSoltHubRoadmapOpen} onClose={closeSoltHubRoadmap} />
        <WhitepaperModal isOpen={isWhitepaperOpen} onClose={closeWhitepaper} />
      </Router>
    </Web3Provider>
  );
}

export default App;