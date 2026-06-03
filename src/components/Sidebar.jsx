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
  // 🚀 Token Creator Redirect 
   const handleCreateClick = () => 
    { if (isLocalEnv) { window.location.href = `http://${currentHost}:5173`; 
  } else { 
    window.location.href = 'https://soltcreator.vercel.app'; 
  } 
}; // 🛠️ SoltSwap Redirect 
const handleSwapClick = () => { 
  if (isLocalEnv) { 
    window.location.href = `http://${currentHost}:5175`; 
  } else { 
    window.location.href = 'https://soltswap.vercel.app'; 
  } 
};
  // 🛠️ SoltLive Redirect 
  const handleLiveClick = () => { 
  if (isLocalEnv) { 
    window.location.href = `http://${currentHost}:5175`; 
  } else { 
    window.location.href = 'https://soltlive.vercel.app'; 
  } 
};
// 🎮 SoltHubFun Redirect 
const handleFunClick = () => { 
  if (isLocalEnv) { 
    window.location.href = `http://${currentHost}:5176`; 
  } else { 
    window.location.href = 'https://soltgame.vercel.app'; 
  } 
}; 
return ( 
<aside className={`fixed top-0 left-0 h-full bg-[#0b1426] border-r border-cyan-500/10 z-[60] transition-all duration-300 ease-in-out ${ 
  isOpen ? 'w-64' : 'w-20' 
}`} 
> 
{/* Header */} 
<div className="flex items-center justify-between p-5 h-16 border-b border-cyan-500/5"> 
{isOpen && ( 
  <h2 className="text-yellow-400 font-bold text-xl tracking-tighter uppercase italic"> 
  SoltHub 
  </h2> 
  )} 
  <button 
  onClick={toggleSidebar} 
  className={`bg-yellow-500 hover:bg-yellow-400 text-black p-2 rounded-md transition-all mx-auto ${ 
    isOpen ? '' : 'w-10' 
  }`} 
  > 
  {isOpen ? '✕' : '☰'} 
  </button> 
  </div>
   {/* Navigation */} 
   <nav className="flex flex-col gap-1 p-3 overflow-y-auto h-[calc(100%-120px)] scrollbar-hide"> {/* Main Internal Route */} 
    <MenuItem to="/" icon={<FaHome />} label="Home" isOpen={isOpen} /> 
    {/* Token Creator */} 
    <div onClick={handleCreateClick} className="cursor-pointer"> 
      <MenuItemStatic icon={<FaPlusCircle />} label="Token Creator" isOpen={isOpen} />
       </div> 
       {/* Dashboard */} 
       <MenuItem to="/dashboard" icon={<FaChartLine />} label="Dashboard" isOpen={isOpen} />
        {/* SoltSwap */}
         <div onClick={handleSwapClick} className="cursor-pointer"> 
          <MenuItemStatic icon={<FaExchangeAlt />} label="SoltSwap" isOpen={isOpen} /> 
          </div> {/* SoltHub Fun */} 
          <div onClick={handleFunClick} className="cursor-pointer"> 
            <MenuItemStatic icon={<FaGamepad />} label="SoltHub Fun" isOpen={isOpen} /> 
            </div> 
            {/* External AI Tool */}
             <a
              href="https://smarttools.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-all"
               > 
               <span className="text-xl">
                 <FaShieldAlt />
                  </span>
                   {isOpen && ( <span className="text-sm font-medium"> Smart Tools </span> )} 
                   </a> 
                   {/* Internal Routes */} 
                   <MenuItem to="/whale-tracking" icon={<FaFish />} label="Whale Tracking" isOpen={isOpen} /> 
                   <MenuItem to="/sniping-signals" icon={<FaCrosshairs />} label="Sniping Signals" isOpen={isOpen} /> 
                   <MenuItem to="/token-analytics" icon={<FaChartBar />} label="Live Market" isOpen={isOpen} /> 
                   <MenuItem to="/presale" icon={<FaCoins />} label="Presale" isOpen={isOpen} /> 
                   <MenuItem to="/price-converter" icon={<FaCalculator />} label="Price Converter" isOpen={isOpen} /> 
                   <MenuItem to="/more" icon={<FaEllipsisH />} label="More" isOpen={isOpen} /> 
                   <MenuItem to="/profile" icon={<FaUser />} label="Profile" isOpen={isOpen} /> 
                   </nav> 
                   </aside>
                    ); 
                  };
                   // Internal React Router Links 
                   const MenuItem = ({ to, icon, label, isOpen }) => ( 
                   <Link 
                   to={to} 
                   className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-all group"
                    > 
                    <span className="text-xl group-hover:scale-110 transition-transform"> {icon} </span> 
                    {isOpen && ( <span className="text-sm font-medium"> {label} </span> )} 
                    </Link> 
                    ); 
                    // Static External Click Items 
                    const MenuItemStatic = ({ icon, label, isOpen }) => ( 
                    <div className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-all group"> 
                    <span className="text-xl group-hover:scale-110 transition-transform"> {icon} </span> 
                    {isOpen && ( <span className="text-sm font-medium"> {label} </span> )} 
                    </div> 
                    );
                     export default Sidebar;