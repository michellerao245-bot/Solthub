// src/components/TopHeaderAd.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';

const SOLT_CONTRACT_ADDRESS = "0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9"; 
const ADMIN_WALLET = "0xC30050aBe984c3B3929822E3BbF33fbBE6b3C423"; 

const SOLT_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() public view returns (uint8)"
];

export default function TopHeaderAd() {
  // 🌟 Testing ke liye ise null kar sakte ho jab blank screen check karni ho
  const [activeAd, setActiveAd] = useState({
    targetLink: "https://pancakeswap.finance",
    bannerUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1400&auto=format&fit=crop",
    isFileTypeVideo: false 
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ targetLink: '', days: 3 });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileVideo, setIsFileVideo] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      alert("❌ File size 5MB se zyada hai! Koshish karein ki file 2MB-5MB ke andar ho.");
      e.target.value = null; 
      return;
    }

    setSelectedFile(file);
    if (file.type.startsWith('video/')) {
      setIsFileVideo(true);
    } else {
      setIsFileVideo(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSoltAmountByDays = (days) => {
    switch (parseInt(days)) {
      case 3: return "300";
      case 7: return "500";
      case 30: return "2000";
      default: return "300";
    }
  };

  const handleSoltPayment = async (e) => {
    e.preventDefault();
    if (!window.ethereum) return alert("Please connect your wallet!");
    if (!selectedFile) return alert("Please upload an Image or Video file first!");

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const soltContract = new ethers.Contract(SOLT_CONTRACT_ADDRESS, SOLT_ABI, signer);
      
      const totalTokens = getSoltAmountByDays(formData.days);
      const decimals = await soltContract.decimals();
      const tokenAmountInWei = ethers.parseUnits(totalTokens, decimals);

      const tx = await soltContract.transfer(ADMIN_WALLET, tokenAmountInWei);
      await tx.wait(1);

      const localMediaUrl = URL.createObjectURL(selectedFile);
      
      setActiveAd({
        targetLink: formData.targetLink || "https://",
        bannerUrl: localMediaUrl,
        isFileTypeVideo: isFileVideo
      });

      alert("🎉 Top Header Ad Uploaded & Booked successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Transaction declined.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0b1220]/60 border-b border-cyan-500/10 py-5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {!activeAd ? (
          /* 🚀 BLANK SCREEN STATE (Height Increased by 50%) */
          <div 
            onClick={() => setIsModalOpen(true)}
            className="w-full h-[188px] sm:h-[240px] md:h-[292px] rounded-xl border border-dashed border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5 hover:bg-cyan-500/10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 tracking-wider transition group-hover:scale-[1.02]">
              ADVERTISE WITH US
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm font-mono text-gray-400 tracking-widest uppercase mt-1">
              & increase your reach <span className="text-pink-500 group-hover:animate-pulse">[PROMOTE NOW]</span>
            </p>
          </div>
        ) : (
          /* 🌟 ACTIVE AD SCREEN STATE (Height Increased by 50% to match exactly) */
          <div className="relative w-full h-[188px] sm:h-[240px] md:h-[292px] rounded-xl overflow-hidden border border-cyan-500/20 group shadow-2xl bg-black">
            
            <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-cyan-500/20 text-[10px] font-bold font-mono px-2 py-0.5 rounded text-cyan-400 z-10 tracking-widest">
              SPONSORED
            </span>

            <button 
              onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
              className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-100 bg-black/90 border border-neutral-700 text-[10px] font-mono px-3 py-1 rounded text-gray-400 hover:text-white z-10 transition duration-300"
            >
              ⚙️ Book Slot / Upload
            </button>

            <a href={activeAd.targetLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              {activeAd.isFileTypeVideo ? (
                <video 
                  src={activeAd.bannerUrl}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover object-center group-hover:scale-[1.006] transition duration-700"
                />
              ) : (
                <img 
                  src={activeAd.bannerUrl} 
                  alt="Global Header Ad" 
                  className="w-full h-full object-cover object-center group-hover:scale-[1.006] transition duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
            </a>
          </div>
        )}
      </div>

      {/* --- POPUP SETUP FORM (30% BIGGER MODAL UPGRADED) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[9999] p-4 text-left">
          <div className="bg-[#0f172a] border border-pink-500/30 p-10 rounded-2xl text-white w-full max-w-[680px] relative shadow-[0_0_60px_rgba(236,72,153,0.2)] transition-all">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 font-bold text-2xl font-mono transition">✕</button>
            
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-wider">
                ADVERTISE WITH US
              </h3>
              <p className="text-sm font-mono text-cyan-400 tracking-widest uppercase mt-1.5">
                & increase your reach
              </p>
            </div>

            <form onSubmit={handleSoltPayment} className="space-y-5">
              
              {/* 📂 FILE UPLOADER */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-mono text-gray-300">Upload Ad File (Image/Video)</label>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                    💡 Max Size: 5MB
                  </span>
                </div>
                
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4, video/webm, video/quicktime"
                  required 
                  onChange={handleFileChange} 
                  className="w-full bg-black/40 border border-neutral-800 rounded-lg p-3 focus:border-pink-500 outline-none text-sm text-gray-300 font-mono file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-pink-500/20 file:text-pink-400 hover:file:bg-pink-500/30 file:cursor-pointer" 
                />
                
                <div className="mt-2 p-2.5 rounded bg-cyan-500/5 border border-cyan-500/10 space-y-0.5">
                  <p className="text-xs font-mono text-cyan-400/90">
                    📐 <strong>Best Ratio:</strong> Horizontal Wide (e.g., 728x90 or 1200x300)
                  </p>
                  <p className="text-[11px] font-mono text-gray-500">
                    Supports: .mp4, .webm, .png, .jpg, .gif (Auto-loops seamlessly)
                  </p>
                </div>
              </div>

              {/* TARGET URL */}
              <div>
                <label className="text-sm font-mono text-gray-300 block mb-2">Target Project URL</label>
                <input type="url" name="targetLink" required onChange={handleInputChange} className="w-full bg-black/40 border border-neutral-800 rounded-lg p-3 focus:border-pink-500 outline-none text-sm text-gray-300" placeholder="https://yourtoken.com" />
              </div>
              
              {/* SCHEDULE PACKAGES */}
              <div>
                <label className="text-sm font-mono text-gray-300 block mb-2">Schedule Package</label>
                <select name="days" onChange={handleInputChange} className="w-full bg-black/40 border border-neutral-800 rounded-lg p-3 focus:border-pink-500 outline-none text-sm font-mono text-cyan-300 cursor-pointer">
                  <option value="3">3 Days (300 SOLT) — 100/day</option>
                  <option value="7">7 Days (500 SOLT) — Discount Saved!</option>
                  <option value="30">30 Days (2000 SOLT) — Mega Saver Package</option>
                </select>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 font-black font-mono rounded-lg text-sm tracking-widest hover:brightness-110 active:scale-[0.99] transition duration-200 shadow-lg">
                  {loading ? "PROCESSING PAYMENT..." : "PAY SOLT & DEPLOY TOP AD"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}