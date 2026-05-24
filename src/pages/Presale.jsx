import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Presale.css";
import { FaShieldAlt, FaRocket, FaChartLine, FaGem } from 'react-icons/fa';

const PRESALE_ADDRESS = "0xD4Ca789015c7C5fe19E1cF947C09dbA2b0520b3E";

const Presale = () => {
  const [bnbAmount, setBnbAmount] = useState("");
  const [soltReceived, setSoltReceived] = useState(0);
  const RATE = 50000;

  useEffect(() => {
    if (bnbAmount > 0) {
      setSoltReceived(bnbAmount * RATE);
    } else {
      setSoltReceived(0);
    }
  }, [bnbAmount]);

  const handleBuy = async () => {
    if (!bnbAmount || bnbAmount <= 0) {
        alert("Please enter a valid BNB amount");
        return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: PRESALE_ADDRESS,
        value: ethers.parseEther(bnbAmount),
      });
      alert("Transaction Submitted!");
    } catch (err) {
      alert("Transaction Failed!");
    }
  };

  return (
    <div className="presale-container">
      {/* 1. HERO SECTION */}
      <div className="presale-hero">
        <h1 className="hero-title">SOLTCOIN <span className="gold-text">(SOLT)</span> PRESALE</h1>
        <p className="hero-subtitle text-balance">
          The heart of the SoltHub Ecosystem. Secure your spot in the future of decentralized finance, 
          Web3 gaming, and real-world asset tokenization.
        </p>
      </div>

      <div className="presale-content-grid">
        {/* LEFT COLUMN: INFO & MATTER */}
        <div className="info-column">
          
          {/* Project Stats Card */}
          <div className="details-card mb-6">
            <h3 className="card-heading">Project Information</h3>
            <div className="info-list">
              <div className="info-item"><span>Token Name:</span> <span className="info-val">SoltCoin</span></div>
              <div className="info-item"><span>Symbol:</span> <span className="info-val">SOLT</span></div>
              <div className="info-item"><span>Network:</span> <span className="info-val text-yellow-500">BNB Smart Chain</span></div>
              <div className="info-item"><span>Total Supply:</span> <span className="info-val">100,000,000 SOLT</span></div>
            </div>
            <div className="trust-badges mt-4">
              <span className="badge"><FaShieldAlt /> Audit Verified</span>
              <span className="badge">🔒 Liquidity Locked</span>
            </div>
          </div>

          {/* Why SoltHub Section */}
          <div className="matter-card mb-6">
            <h3 className="card-heading">What is SoltHub?</h3>
            <p className="matter-text">
              SoltHub is a comprehensive Web3 infrastructure designed for the modern crypto era. 
              Our ecosystem integrates <strong>SoltDex</strong> for seamless trading, 
              <strong>SoltScanner</strong> for security, and high-stakes <strong>SoltHubFun</strong> 
              gaming—all powered by the SOLT token.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="benefits-section">
            <h3 className="card-heading">Presale Benefits</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <FaGem className="benefit-icon" />
                <h4>Early Entry</h4>
                <p>Buy at the lowest possible price before public listing.</p>
              </div>
              <div className="benefit-item">
                <FaRocket className="benefit-icon" />
                <h4>Ecosystem Utility</h4>
                <p>Use SOLT for staking, fee discounts, and exclusive gaming access.</p>
              </div>
              <div className="benefit-item">
                <FaChartLine className="benefit-icon" />
                <h4>Future Growth</h4>
                <p>Be part of a project focused on RWA tokenization and DeFi innovation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BUY CARD */}
        <div className="buy-column">
          <div className="presale-card sticky-card">
            <div className="stage-badge">LIVE: STAGE 1</div>
            
            <div className="price-box">
              <p className="label">Listing Price: 1 BNB = 40,000 SOLT</p>
              <h2 className="current-price">1 BNB = 50,000 SOLT</h2>
              <span className="inr-text">Get 25% More Tokens Now!</span>
            </div>

            <div className="input-group">
              <label>Amount in BNB</label>
              <input 
                type="number" 
                placeholder="0.0" 
                value={bnbAmount}
                onChange={(e) => setBnbAmount(e.target.value)}
              />
            </div>

            <div className="receive-box">
              <p>You will receive:</p>
              <h3 className="solt-amount">{soltReceived.toLocaleString()} SOLT</h3>
            </div>

            <button className="buy-btn" onClick={handleBuy}>BUY SOLT TOKEN</button>
            
            <div className="progress-container mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress: 45%</span>
                <span>Softcap: 50 BNB</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '45%'}}></div>
              </div>
            </div>

            <p className="presale-info mt-4 text-center">
              *Tokens You will be Recieved After Presale Closed in your wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presale;