import React from 'react'; 
import { FaBars, FaWallet, FaSignOutAlt } from 'react-icons/fa'; 
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'; 
import { useDisconnect } from 'wagmi'; 
 
const Navbar = ({ toggleSidebar }) => { 
  // Wallet Modal & State hooks 
  const { open } = useAppKit(); 
  const { address, isConnected } = useAppKitAccount(); 
   
  // Disconnect Hook from Wagmi 
  const { disconnect } = useDisconnect(); 
 
  // Shorten Wallet Address (e.g., 0x1234...abcd) 
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''; 
 
  // Connect Wallet Action (Using pure open() to prevent modal state bugs) 
  const handleConnect = async () => { 
    try { 
      await open(); 
    } catch (error) { 
      console.error('Wallet connection failed:', error); 
    } 
  }; 
 
  // Disconnect Wallet Action (Clearing core Reown/WalletConnect cache) 
  const handleDisconnect = async () => { 
    try { 
      // 1. Trigger core Wagmi disconnect 
      await disconnect(); 
 
      // 2. Clear Reown / WalletConnect lingering session states 
      localStorage.removeItem('wagmi.connected'); 
      localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE'); 
      localStorage.removeItem('walletconnect'); 
 
      console.log('Wallet disconnected and storage cache cleared'); 
    } catch (error) { 
      console.error('Disconnect failed:', error); 
    } 
  }; 
 
  return ( 
    // 🎨 CHANGED: Background ko solid '#0b1426' kiya, aur border/blur saaf kar diya
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0b1426] z-40 flex items-center justify-between px-6"> 
       
      {/* Left Section: Only Hamburger Button */} 
      <div className="flex items-center gap-4"> 
        <button  
          onClick={toggleSidebar}  
          className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"  
          aria-label="Toggle Sidebar" 
        > 
          <FaBars size={20} /> 
        </button> 
         
        {/* 🧹 CLEANED: SOLTHUB h1 tag yahan se completely remove kar diya hai */} 
      </div> 
 
      {/* Right Section: Wallet Actions */} 
      <div className="flex items-center gap-3"> 
         
        {/* Connect / Address Button */} 
        <button  
          type="button"  
          onClick={handleConnect}  
          className="flex items-center gap-2 px-5 py-2 bg-cyan-500 text-black font-bold rounded-full text-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all active:scale-95" 
        > 
          <FaWallet size={16} /> 
          <span> 
            {isConnected ? ( 
              shortAddress 
            ) : ( 
              <> 
                <span className="hidden sm:inline">Connect Wallet</span> 
                <span className="inline sm:hidden">Connect</span> 
              </> 
            )} 
          </span> 
        </button> 
 
        {/* Disconnect Button (Rendered conditionally when wallet is active) */} 
        {isConnected && ( 
          <button  
            type="button"  
            onClick={handleDisconnect}  
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold rounded-full text-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all active:scale-95" 
          > 
            <FaSignOutAlt size={14} /> 
            <span className="hidden sm:inline">Disconnect</span> 
          </button> 
        )} 
 
      </div> 
 
    </nav> 
  ); 
}; 
 
export default Navbar;