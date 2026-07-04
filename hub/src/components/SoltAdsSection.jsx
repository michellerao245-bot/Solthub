// src/components/SoltAdsSection.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';

const SOLT_CONTRACT_ADDRESS = "0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9"; 
const ADMIN_WALLET = "0xC30050aBe984c3B3929822E3BbF33fbBE6b3C423"; 

const SOLT_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() public view returns (uint8)"
];

const PRICE_PER_DAY_SOLT = "1000";

export default function SoltAdsSection() {
  // 🌟 MOCK MODE: Active Banner toggle logic
  // Agar aapko real banner dikhana ho toh isey state mein rakhein, abhi placeholder border test karne ke liye ise default active banaya hai.
  const [activeAd, setActiveAd] = useState({
    targetLink: "https://pancakeswap.finance",
    bannerUrl: "https://placehold.co/1200x200/131e35/22d3ee?text=SOLT+ECOSYSTEM+RUNNING+AD+PREVIEW" 
  });

  // 🌟 FIXED CONTROL STATE: Isko default false hona chahiye taaki form chup rahe jab tak trigger na dabayein
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ tokenAddress: '', bannerUrl: '', targetLink: '', days: 3 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSoltPayment = async (e) => {
    e.preventDefault();
    if (!window.ethereum) return alert("Please connect your wallet!");

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const soltContract = new ethers.Contract(SOLT_CONTRACT_ADDRESS, SOLT_ABI, signer);
      const totalTokens = (parseFloat(PRICE_PER_DAY_SOLT) * formData.days).toString();
      
      const decimals = await soltContract.decimals();
      const tokenAmountInWei = ethers.parseUnits(totalTokens, decimals);

      alert(`Wallet alert: Confirm transfer of ${totalTokens} SOLT to promote token.`);

      const tx = await soltContract.transfer(ADMIN_WALLET, tokenAmountInWei);
      await tx.wait(1);

      alert("🎉 Payment Successful! Integration Complete.");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Transaction failed or declined.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-6 font-sans">
      {/* --- BANNER DISPLAY AREA --- */}
      {!activeAd ? (
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-full h-24 border-2 border-dashed border-pink-500/30 bg-neutral-900/40 hover:bg-neutral-900/70 flex items-center justify-center rounded-xl group hover:border-pink-500/80 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.02)]"
        >
          <p className="text-gray-400 font-mono text-sm tracking-wide group-hover:text-pink-400 transition">
            🚀 <span className="text-pink-500 font-bold">YOUR TOKEN HERE!</span> Maximize Volume instantly with SOLT. <span className="underline font-bold ml-1">[Promote Now]</span>
          </p>
        </div>
      ) : (
        <div className="relative w-full h-24 rounded-xl overflow-hidden border border-cyan-500/30 bg-[#131e35]/30 shadow-[0_0_20px_rgba(34,211,238,0.05)] flex items-center justify-between px-6 group transition-all duration-300 hover:border-cyan-500/60">
          <div className="text-left max-w-xl">
            <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded tracking-widest border border-cyan-500/20 mr-3 inline-block">
              SPONSORED AD SLOT
            </span>
            <p className="text-sm text-gray-300 inline-block font-medium">Want your token featured on our premium home dashboard matrices?</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold font-mono rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all transform active:scale-95"
          >
            📢 Promote Token
          </button>
        </div>
      )}

      {/* --- AUTOMATED MODAL POPUP LAYER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-neutral-900 border border-pink-500/30 p-6 rounded-2xl shadow-[0_0_35px_rgba(236,72,153,0.2)] text-white w-full max-w-md relative text-left">
            
            {/* Close Trigger Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 font-bold text-lg font-mono transition"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-mono text-pink-500 mb-1 tracking-wider text-center">PROMOTE WITH SOLT</h3>
            <p className="text-gray-400 font-mono text-[11px] text-center mb-5">Automated Web3 Ad Deployment Engine</p>

            <form onSubmit={handleSoltPayment} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Token Contract Address</label>
                <input type="text" name="tokenAddress" required onChange={handleChange} className="w-full bg-black/60 border border-neutral-800 rounded-lg p-2.5 focus:border-pink-500 outline-none text-sm font-mono text-pink-300" placeholder="0x..." />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Banner Image Link</label>
                <input type="url" name="bannerUrl" required onChange={handleChange} className="w-full bg-black/60 border border-neutral-800 rounded-lg p-2.5 focus:border-pink-500 outline-none text-sm text-gray-300" placeholder="https://imgur.com/your-banner.png" />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Target Project Link</label>
                <input type="url" name="targetLink" required onChange={handleChange} className="w-full bg-black/60 border border-neutral-800 rounded-lg p-2.5 focus:border-pink-500 outline-none text-sm text-gray-300" placeholder="https://soltdex.app" />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Select Schedule (Days)</label>
                <select name="days" onChange={handleChange} className="w-full bg-black/60 border border-neutral-800 rounded-lg p-2.5 focus:border-pink-500 outline-none text-sm font-mono text-gray-300">
                  <option value="3">3 Days ({1000 * 3} SOLT)</option>
                  <option value="7">7 Days ({1000 * 7} SOLT)</option>
                  <option value="30">30 Days ({1000 * 30} SOLT)</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 mt-2 bg-gradient-to-r from-pink-500 to-purple-600 font-bold font-mono rounded-lg hover:from-pink-400 hover:to-purple-500 transition tracking-wider text-sm shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                {loading ? "PROCESSING..." : "PAY SOLT & LAUNCH"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}