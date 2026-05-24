import { apiFetch } from '../utils/api';
import React, { useEffect } from 'react';
import { FaBars, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useDisconnect } from 'wagmi';

const Navbar = ({ toggleSidebar }) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const saveUserToBackend = async (walletAddress) => { 
    try {

const result = await apiFetch('/api/users/create', { 
  method: 'POST', 
  headers: { 
    'Content-Type': 'application/json', 
  }, 
  body: JSON.stringify({ 
    wallet: walletAddress, 
    username: 'Guest', 
  }), 
}); 
console.log("Backend Response:", result); 

} catch (error) {

console.error("Error:", error); 

} 
};
  
useEffect(() => {
    if (isConnected && address) {
      saveUserToBackend(address);
    }
  }, [isConnected, address]);

  const handleConnect = async () => await open();

  const handleDisconnect = async () => {
    await disconnect();
    localStorage.clear();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0b1426] z-40 flex items-center justify-between px-6">
      <button onClick={toggleSidebar} className="p-2 text-cyan-400">
        <FaBars size={20} />
      </button>
      <div className="flex items-center gap-3">
        <button onClick={handleConnect} className="px-5 py-2 bg-cyan-500 text-black font-bold rounded-full text-sm">
          {isConnected ? shortAddress : 'Connect Wallet'}
        </button>
        {isConnected && (
          <button onClick={handleDisconnect} className="px-4 py-2 bg-red-500 text-white font-bold rounded-full text-sm">
            <FaSignOutAlt size={14} /> Disconnect
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;