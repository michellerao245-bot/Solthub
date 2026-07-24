import React from 'react';  
import { Link } from 'react-router-dom';  
import {  
  FaHome, FaPlusCircle, FaChartLine, FaExchangeAlt, FaShieldAlt,  
  FaFish, FaCrosshairs, FaChartBar, FaCoins, FaCalculator,  
  FaEllipsisH, FaUser, FaGamepad  
} from 'react-icons/fa';  

const Sidebar = ({ isOpen, toggleSidebar }) => {  
  const currentHost = window.location.hostname;  
  const isLocalEnv = currentHost === 'localhost' || currentHost === '127.0.0.1' || currentHost.startsWith('192.168.');  

  // Redirection Functions (Brackets saaf kar diye hain)
  const handleCreateClick = () => {  
    window.location.href = isLocalEnv ? `http://${currentHost}:5173` : 'https://soltcreator.vercel.app'; 
  };  
  
  const handleSwapClick = () => {   
    window.location.href = isLocalEnv ? `http://${currentHost}:5175` : 'https://soltswap.vercel.app'; 
  };  

  const handleLiveClick = () => {   
    window.location.href = isLocalEnv ? `http://${currentHost}:5175` : 'https://soltlive.vercel.app'; 
  };  

  const handleFunClick = () => {   
    window.location.href = isLocalEnv ? `http://${currentHost}:5176` : 'https://soltgame.vercel.app'; 
  };   

  const handleToolsClick = () => {
    window.location.href = 'https://solttools.vercel.app';
  };

  return (   
    <aside className={`fixed top-0 left-0 h-full bg-[#0b1426] border-r border-cyan-500/10 z-[60] transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>   
      <div className="flex items-center justify-between p-5 h-16 border-b border-cyan-500/5">   
        {isOpen && <h2 className="text-yellow-400 font-bold text-xl tracking-tighter uppercase italic">SoltHub</h2>}   
        <button onClick={toggleSidebar} className="bg-yellow-500 hover:bg-yellow-400 text-black p-2 rounded-md transition-all mx-auto">   
          {isOpen ? '✕' : '☰'}   
        </button>   
      </div>  

      <nav className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100%-120px)] scrollbar-hide">   
        <MenuItem to="/" icon={<FaHome />} label="Home" isOpen={isOpen} />   
        
        <div onClick={handleCreateClick} className="cursor-pointer"><MenuItemStatic icon={<FaPlusCircle />} label="Token Creator" isOpen={isOpen} /></div>  
        <MenuItem to="/dashboard" icon={<FaChartLine />} label="Dashboard" isOpen={isOpen} />  
        
        <div onClick={handleSwapClick} className="cursor-pointer"><MenuItemStatic icon={<FaExchangeAlt />} label="SoltSwap" isOpen={isOpen} /></div>  
        <div onClick={handleFunClick} className="cursor-pointer"><MenuItemStatic icon={<FaGamepad />} label="SoltHub Fun" isOpen={isOpen} /></div>   
        
        {/* Updated: Smart Tools to SoltTools */}
        <div onClick={handleToolsClick} className="cursor-pointer"><MenuItemStatic icon={<FaShieldAlt />} label="SoltTools" isOpen={isOpen} /></div>

        <MenuItem to="/whale-tracking" icon={<FaFish />} label="Whale Tracking" isOpen={isOpen} />  
        <MenuItem to="/sniping-signals" icon={<FaCrosshairs />} label="Sniping Signals" isOpen={isOpen} />  
        <div onClick={handleLiveClick} className="cursor-pointer"><MenuItemStatic icon={<FaChartBar />} label="Live Market" isOpen={isOpen} /></div>  
        
        <MenuItem to="/presale" icon={<FaCoins />} label="Presale" isOpen={isOpen} />   
        <MenuItem to="/price-converter" icon={<FaCalculator />} label="SoltRide" isOpen={isOpen} />   
        <MenuItem to="/more" icon={<FaEllipsisH />} label="More" isOpen={isOpen} />   
        <MenuItem to="/profile" icon={<FaUser />} label="Profile" isOpen={isOpen} />   
      </nav>   
    </aside>  
  );   
};  

const MenuItem = ({ to, icon, label, isOpen }) => (   
  <Link to={to} className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-all group">   
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>   
    {isOpen && <span className="text-sm font-medium">{label}</span>}   
  </Link>   
);   

const MenuItemStatic = ({ icon, label, isOpen }) => (   
  <div className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-all group">   
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>   
    {isOpen && <span className="text-sm font-medium">{label}</span>}   
  </div>   
); 

export default Sidebar;