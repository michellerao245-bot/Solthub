// src/components/SoltAdsSection.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { supabase } from './supabaseClient'; // 🌟 Yahan import path fix kar diya hai

const SOLT_CONTRACT_ADDRESS = "0x72d8D91a09cABF8DAf26A9f50B85c40095B370fC";
const ADMIN_WALLET = "0xC30050aBe984c3B3929822E3BbF33fbBE6b3C423";

const SOLT_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() public view returns (uint8)"
];

const PRICE_PER_DAY_SOLT = "1000";

export default function SoltAdsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', bannerUrl: '', targetLink: '', days: 3 });

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
      const userWallet = await signer.getAddress();

      // 1. Payment Logic
      const soltContract = new ethers.Contract(SOLT_CONTRACT_ADDRESS, SOLT_ABI, signer);
      const totalTokens = (parseFloat(PRICE_PER_DAY_SOLT) * formData.days).toString();
      const decimals = await soltContract.decimals();
      const tokenAmountInWei = ethers.parseUnits(totalTokens, decimals);

      const tx = await soltContract.transfer(ADMIN_WALLET, tokenAmountInWei);
      await tx.wait(1);

      // 2. Supabase Integration
      const { error } = await supabase
        .from('advertisements')
        .insert([{
          user_wallet: userWallet,
          ad_title: formData.title,
          ad_image_url: formData.bannerUrl,
          ad_link: formData.targetLink,
          status: 'pending' // Admin approval ke liye default pending
        }]);

      if (error) throw error;

      alert("🎉 Payment Successful! Ad sent to Admin for approval.");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error: " + (error.message || "Transaction failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-6 font-sans">
      <div 
        onClick={() => setIsModalOpen(true)}
        className="w-full h-24 border-2 border-dashed border-pink-500/30 bg-neutral-900/40 hover:bg-neutral-900/70 flex items-center justify-center rounded-xl cursor-pointer transition-all"
      >
        <p className="text-pink-500 font-bold hover:text-pink-400">[Promote Your Token Now]</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-neutral-900 border border-pink-500/30 p-6 rounded-2xl w-full max-w-md relative text-white">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h3 className="text-xl font-bold text-pink-500 mb-4 text-center">PROMOTE WITH SOLT</h3>
            
            <form onSubmit={handleSoltPayment} className="space-y-4">
              <input type="text" name="title" required onChange={handleChange} placeholder="Ad Title" className="w-full bg-black border border-neutral-700 p-2.5 rounded text-sm" />
              <input type="url" name="bannerUrl" required onChange={handleChange} placeholder="Banner Image URL" className="w-full bg-black border border-neutral-700 p-2.5 rounded text-sm" />
              <input type="url" name="targetLink" required onChange={handleChange} placeholder="Target Project Link" className="w-full bg-black border border-neutral-700 p-2.5 rounded text-sm" />
              
              <select name="days" onChange={handleChange} className="w-full bg-black border border-neutral-700 p-2.5 rounded text-sm">
                <option value="3">3 Days (3000 SOLT)</option>
                <option value="7">7 Days (7000 SOLT)</option>
              </select>

              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-700 rounded font-bold text-sm tracking-widest uppercase hover:from-pink-500 hover:to-purple-600">
                {loading ? "PROCESSING..." : "PAY & DEPLOY"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}