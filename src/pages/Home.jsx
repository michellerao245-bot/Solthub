import React from 'react';
import SoltLogo from '../components/SoltLogo';
import SoltAdsSection from '../components/SoltAdsSection'; // Purana component jise chhedna nahi hai
import TopHeaderAd from '../components/TopHeaderAd'; // 🌟 Naya file component jo top par ad chalayega

const Home = ({ openRoadmap, openSoltHubRoadmap, openWhitepaper }) => {
  const tokenStats = [
    { label: "Token Name", value: "SOLTCOIN", color: "#f59e0b" },
    { label: "Token Symbol", value: "$SOLT", color: "#22d3ee" },
    { label: "Total Supply", value: "5,000,000,000", color: "#10b981" },
    { label: "Network", value: "BSC (BEP-20)", color: "#a855f7" }
  ];

  const analyticsPlatforms = [
    {
      name: "DexScreener",
      icon: "📊",
      desc: "Track SOLTCOIN Live. View the latest price chart, 24h volume, liquidity depth, recent trades, and holder insights directly on DexScreener. Transparency first—all data pulled straight from the blockchain.",
      link: "https://dexscreener.com/bsc/YOUR_TOKEN_ADDRESS"
    },
    {
      name: "Apespace",
      icon: "🦍",
      desc: "Real-Time Token Stats on ApeSpace. Dive into SOLTCOIN current price, 24h changes, liquidity depth, trades, and more on ApeSpace, a trusted BSC analytics platform.",
      link: "https://apespace.io/bsc/YOUR_TOKEN_ADDRESS"
    }
  ];

  const utilityPlatforms = [
    {
      name: "Roadmap (Soltcoin)",
      icon: "🚀",
      desc: "Explore the development path of Soltcoin ($SOLT). Tracking public decentralized DEX listings, targeted marketing pushes, verified liquidity locks, and strategic community growth milestones.",
      link: "#",
      modalType: "soltcoin"
    },
    {
      name: "Roadmap of SoltHub",
      icon: "🛠️",
      desc: "The future macro vision for SoltHub ecosystem. Highlighting upcoming cross-chain dApps, autonomous launchpad upgrades, rigorous smart contract audits, and future Web3 tooling infrastructure.",
      link: "#",
      modalType: "solthub"
    },
    {
      name: "Whitepaper",
      icon: "📄",
      desc: "Read our technical documentation. Verified metrics: 2.5s avg confirmation, 0.25% swapping fee routing, minimum 12-month initial DEX liquidity lock, and 48-hour Multi-Sig Timelock parameters.",
      link: "#",
      modalType: "whitepaper"
    }
  ];

  const handleCardClick = (box) => {
    if (box.modalType === "soltcoin") {
      openRoadmap();
    } else if (box.modalType === "solthub") {
      openSoltHubRoadmap();
    } else if (box.modalType === "whitepaper") {
      openWhitepaper();
    } else {
      window.open(box.link, '_self');
    }
  };

  return (
    // Is wrapper layout ko full width structure diya taaki top ad screen ke kinaron tak stretch ho sake
    <div className="w-full flex flex-col items-center">
      
      {/* 🚀 1. APESPACE STYLE TOP HEADER AD BANNER (Sabse top par fix) */}
      <div className="w-full">
        <TopHeaderAd />
      </div>

      {/* Baaki ka saara content main container ke andar scroll hoga */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-10 flex flex-col items-center text-center">
        
        {/* --- 2. HERO SECTION --- */}
        <div className="flex flex-col items-center max-w-3xl">
          <SoltLogo size="md" />

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-4">
            Soltcoin – A Secure & <br className="hidden md:inline"/> Community-Driven Crypto Asset
          </h1>
          
          <p className="mt-4 text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-2xl">
            A decentralized BEP-20 token on BSC with a fixed total supply of 5,000,000,000 SOLTCOIN,
            built for transparency, security, and long-term value.
          </p>

          {/* Buy Button */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <button
              className="px-8 py-3 bg-[#ffcc00] hover:bg-[#e6b800] text-black font-extrabold rounded-full text-xs md:text-sm tracking-wide uppercase transition-all shadow-[0_4px_15px_rgba(255,204,0,0.2)] active:scale-95"
              onClick={() => window.open('https://pancakeswap.finance', '_blank')}
            >
              Buy Soltcoin
            </button>
            <span className="text-[11px] text-gray-500 font-medium tracking-wide mt-1">
              Leading Decentralized Launchpad and Token Services Protocol
            </span>
          </div>
        </div>

        {/* --- 3. TOKEN STATS GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-14">
          {tokenStats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#131e35]/30 border border-gray-800/40 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center justify-center min-h-[110px] transition-all hover:border-gray-700/60"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1">
                {stat.label}
              </span>
              <h2
                className="text-base md:text-lg font-bold tracking-wide"
                style={{ color: stat.color }}
              >
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* --- 4. SECTION TITLE --- */}
        <div className="mt-24 w-full max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-snug">
            All the dApps You Need to <span className="text-cyan-400 font-extrabold">Launch</span> a Successful Project
          </h2>
          <p className="mt-3 text-xs md:text-sm text-gray-500 font-light max-w-xl mx-auto">
            No coding required! Launch your project with the most secure and advanced project tools in the DeFi Space!
          </p>
        </div>

        {/* --- CONTAINER FOR PLATFORMS & UTILITIES --- */}
        <div className="w-full flex flex-col gap-6 mt-12">
          
          {/* --- ROW 1: ANALYTICS HUB (DexScreener & ApeSpace) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {analyticsPlatforms.map((platform, index) => (
              <div
                key={index}
                onClick={() => window.open(platform.link, '_blank')}
                className="group bg-[#131e35]/30 border border-gray-800/40 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between min-h-[220px] cursor-pointer transition-all duration-300 hover:border-cyan-500/30 hover:bg-[#131e35]/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.05)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl bg-slate-800/50 p-2 rounded-xl block">{platform.icon}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {platform.name}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                    {platform.desc}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-medium rounded-lg text-xs tracking-wide transition-colors border border-cyan-500/10">
                    View Chart →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* --- ROW 2: UTILITIES GRID (Roadmaps & Whitepaper) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            {utilityPlatforms.map((box, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(box)}
                className="group bg-[#131e35]/30 border border-gray-800/40 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between min-h-[240px] cursor-pointer transition-all duration-300 hover:border-amber-500/30 hover:bg-[#131e35]/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.03)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl bg-slate-800/50 p-2 rounded-xl block">{box.icon}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">
                      {box.name}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                    {box.desc}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-500 font-medium rounded-lg text-xs tracking-wide transition-colors border border-amber-500/10">
                    {index === 2 ? 'View Document →' : index === 1 ? 'Company Vision →' : 'Read Roadmap →'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* --- 🌟 5. AUTOMATED ADVERTISING HUB (Purana wala untouched apni jagah par safe hai) 🌟 --- */}
        <div className="w-full mt-12">
          <SoltAdsSection />
        </div>

      </div>
    </div>
  );
};

export default Home;