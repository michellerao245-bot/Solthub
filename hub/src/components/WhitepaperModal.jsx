import React from 'react';
import BaseModal from './BaseModal';

const WhitepaperModal = ({ isOpen, onClose }) => {
  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      subtitle="Protocol Specifications" 
      title="SOLT ECOSYSTEM WHITEPAPER"
    >
      
      {/* Section 1: Measurable Market Parameters */}
      <section className="mb-8">
        <h3 className="text-base md:text-lg text-cyan-400 font-bold uppercase mb-3 flex items-center gap-2">
          <span>⚡</span> 1. Abstract & Execution Metrics
        </h3>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light">
          SoltHub architecture introduces an open-source decentralized utility wrapper to host multi-token AMM routing alongside custom on-chain iGaming aggregates. Running natively over BNB Smart Chain, the design features a structured architecture maintaining sub-second node validations and explicit routing layers.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-900/40 p-3 rounded-xl border border-white/[0.03]">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Average Confirmation</span>
            <span className="text-white text-sm font-bold font-mono">2.5 Seconds</span>
          </div>
          <div className="bg-slate-900/40 p-3 rounded-xl border border-white/[0.03]">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Target Slippage Floor</span>
            <span className="text-white text-sm font-bold font-mono">Under 0.5%</span>
          </div>
          <div className="bg-slate-900/40 p-3 rounded-xl border border-white/[0.03] col-span-2 md:col-span-1">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Gas Efficiency Rating</span>
            <span className="text-white text-sm font-bold font-mono">18% Optimization</span>
          </div>
        </div>
      </section>

      {/* Section 2: Concrete Infrastructure Block */}
      <section className="mb-8">
        <h3 className="text-base md:text-lg text-cyan-400 font-bold uppercase mb-3 flex items-center gap-2">
          <span>💎</span> 2. Protocol Engine Matrix
        </h3>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light mb-4">
          The processing ecosystem relies on isolated Solidity compiler iterations deploying three modular smart contracts linked seamlessly to reduce gas fees:
        </p>
        
        {/* Fixed arbitrary border utility class inline border-l-[3px] */}
        <div className="bg-slate-900/60 border-l-[3px] border-amber-500 p-4 rounded-r-xl my-4">
          <code className="text-white text-xs md:text-sm block font-mono font-semibold tracking-wide">
            Soltswap Router [V1-Core] ➔ Presale Lock Engine ➔ Risk Intelligence Scanner API
          </code>
        </div>
      </section>

      {/* Section 3: Exact Financial Allocations */}
      <section className="mb-8">
        <h3 className="text-base md:text-lg text-cyan-400 font-bold uppercase mb-3 flex items-center gap-2">
          <span>📊</span> 3. Deflationary Logic & Fee Distribution
        </h3>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light mb-4">
          Every platform transaction incurs an automated standard protocol tax configuration mapped out across specific target operational destinations:
        </p>
        
        <div className="space-y-3.5 pl-1">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold font-mono mt-0.5">0.25%</div>
            <p className="text-slate-400 text-xs md:text-sm leading-normal font-light flex-1">
              <strong>Staking Yield Distribution:</strong> Dispatched natively into the active staking contract to reward system holders proportional to lock times.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-xs font-bold font-mono mt-0.5">0.10%</div>
            <p className="text-slate-400 text-xs md:text-sm leading-normal font-light flex-1">
              <strong>Hard Burn Extraction:</strong> Programmatically executed buyback metrics route collected tokens to the dead burner address (<code>0x000...dead</code>), creating permanent linear token scarcity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Cryptographic Controls */}
      <section className="mb-2">
        <h3 className="text-base md:text-lg text-cyan-400 font-bold uppercase mb-3 flex items-center gap-2">
          <span>🔒</span> 4. Security Enforcement & Timelocks
        </h3>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light mb-3">
          To build investor trust and prevent flash exploits, deployment variables utilize non-custodial multi-signature keys bound to explicit time delays:
        </p>
        <ul className="space-y-2.5 pl-1">
          <li className="text-slate-400 text-xs md:text-sm font-light flex items-center gap-2">
            <span className="text-amber-500 font-bold text-sm">✓</span>
            <span>Initial DEX Liquidity Lock Layer: <strong>Minimum 12 Months</strong></span>
          </li>
          <li className="text-slate-400 text-xs md:text-sm font-light flex items-center gap-2">
            <span className="text-amber-500 font-bold text-sm">✓</span>
            <span>Administrative Modification Window: <strong>48-Hour Multi-Sig Timelock</strong></span>
          </li>
        </ul>
      </section>

    </BaseModal>
  );
};

export default WhitepaperModal;