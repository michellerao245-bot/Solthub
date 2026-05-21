import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MarketingService from './pages/MarketingService'; // Existing standard marketing engine
import Marketing3D from './pages/Marketing3D'; // 🚀 NAYA INTEGRATION: Premium 3D Marketing Layout
import Documentation from './pages/Documentation'; // 📚 DxSale Style Documentation Page
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoadmapModal from './components/RoadmapModal';
import RoadmapSoltHubModal from './components/RoadmapSoltHubModal';
import WhitepaperModal from './components/WhitepaperModal'; // 🌟 Abstracted BaseModal version import
import Home from './pages/Home';
import Presale from './pages/Presale';
import Dashboard from './pages/Dashboard';
import TermsOfUse from './pages/TermsOfUse';

import PrivatePolicy from './pages/PrivatePolicy'; // 🚀 Privacy Policy Page
import { Web3Provider } from './context/Web3Provider';

// 💡 Future scalability ke liye agar App layer par kahin SoltLogo lagana ho toh import ready hai
import SoltLogo from './components/SoltLogo';

import './pages/Presale.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isSoltHubRoadmapOpen, setIsSoltHubRoadmapOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false); // 🌟 State array initialization for Whitepaper abstraction

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
        {/* dx.app / SoltDex signature dark premium background matrix */}
        <div
          className="text-white min-h-screen overflow-x-hidden flex flex-col font-sans relative"
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #0b1426 35%, #0b1426 100%)',
          }}
        >

          {/* Navbar Wrapper */}
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar toggleSidebar={toggleSidebar} />
          </div>

          {/* Main Layout Layer */}
          <div className="flex pt-16 min-h-screen flex-1">

            {/* Sidebar Component */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Content Area Matrix */}
            <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                isOpen ? 'ml-64' : 'ml-20'
              }`}
            >

              {/* Main Content Viewport */}
              <main className="flex-1 px-4 md:px-8 py-6">
                <Routes>
                  {/* Home component maps triggers directly to handleCardClick layers */}
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
                  <Route path="/presale" element={<Presale />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/terms" element={<TermsOfUse />} />
                  <Route path="/privacy" element={<PrivatePolicy />} />
                  
                  {/* 🚀 `/marketing` path par aapka naya premium 3D view render hoga */}
                  <Route path="/marketing" element={<Marketing3D />} />
                  <Route path="/marketing-legacy" element={<MarketingService />} />
                  <Route path="/marketing" element={<Marketing3D />} />
                  {/* 📚 Documentation ka routing path active kar diya hai */}
                  <Route path="/documentation" element={<Documentation />} />
                </Routes>
              </main>

              {/* Layout Footer */}
              <div className="mt-auto w-full">
                <Footer />
              </div>

            </div>
          </div>
        </div>

        {/* 🌟 Portals are rendered safely outside the deep DOM layout stack hierarchy */}
        <RoadmapModal isOpen={isRoadmapOpen} onClose={closeRoadmap} />
        <RoadmapSoltHubModal isOpen={isSoltHubRoadmapOpen} onClose={closeSoltHubRoadmap} />
        <WhitepaperModal isOpen={isWhitepaperOpen} onClose={closeWhitepaper} />
      </Router>
    </Web3Provider>
  );
}

export default App;