import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { useAccount } from 'wagmi'; 
import { FaGift, FaUsers, FaChartLine, FaWallet, FaLock, FaRocket } from 'react-icons/fa';

const Dashboard = () => {  
  const { address: userAddress, isConnected } = useAccount(); 
  const navigate = useNavigate();  
  const [copyText, setCopyText] = useState("Copy Link");  

  const handleCopy = () => {  
    if(!userAddress) return; 
    const link = `${window.location.origin}/?ref=${userAddress}`;  
    navigator.clipboard.writeText(link);  
    setCopyText("Copied! ✅");  
    setTimeout(() => setCopyText("Copy Link"), 2000);  
  };  

  return (  
    <div className="dashboard-wrapper" style={{ padding: '60px 40px', width: '100%', minHeight: '100vh', background: '#0b1426', color: '#fff' }}>  
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>  
        <h1 style={{ color: '#d4af37', fontSize: '3.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px' }}>
          User Dashboard
        </h1>  
        <p style={{ color: '#8b949e', fontSize: '1.4rem', marginTop: '15px', fontWeight: '500' }}>
          Track your rewards, manage assets, and grow the SoltHub community.
        </p>  
      </div>  
  
      {/* Main Grid: Referral Box & Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 400px', gap: '40px', marginBottom: '50px' }}>
        
        {/* Left: Referral Program Card */}
        <div style={{   
          background: 'rgba(26, 26, 26, 0.9)',   
          padding: '50px',   
          borderRadius: '24px',   
          border: '2px solid #d4af37',   
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)'
        }}>  
          <h2 style={{ color: '#d4af37', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '800' }}>
            📢 5% Instant Referral Rewards
          </h2>  
          <p style={{ color: '#ccc', fontSize: '1.3rem', marginBottom: '35px', lineHeight: '1.6' }}>
            Your unique link is the key to earning passive income in SOLT tokens. Share it with your network now.
          </p>  
            
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>  
            <input   
              readOnly   
              value={isConnected ? `${window.location.origin}/?ref=${userAddress.substring(0,12)}...` : "Connect Wallet to get link"}   
              style={{   
                background: '#000', border: '2px solid #444', color: '#fff', padding: '20px 25px', 
                borderRadius: '15px', width: '450px', fontSize: '1.1rem', outline: 'none', fontWeight: 'bold'
              }}  
            />  
            <button   
              onClick={handleCopy} disabled={!isConnected}  
              style={{   
                background: isConnected ? 'linear-gradient(45deg, #d4af37, #f9d976)' : '#333', 
                color: '#000', fontWeight: '900', padding: '20px 40px', borderRadius: '15px', 
                cursor: isConnected ? 'pointer' : 'not-allowed', border: 'none', fontSize: '1.2rem',
                textTransform: 'uppercase'
              }}  
            >  
              {copyText}  
            </button>  
          </div>  
        </div>

        {/* Right: Quick Balance Info */}
        <div style={{ background: '#161616', padding: '40px', borderRadius: '24px', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
            <div>
                <p style={{ color: '#d4af37', fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>Available SOLT</p>
                <h3 style={{ fontSize: '2.8rem', color: '#fff', fontWeight: '900' }}>0.00</h3>
            </div>
            <div style={{ borderTop: '1px solid #333', paddingTop: '20px' }}>
                <p style={{ color: '#d4af37', fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>Total Earned</p>
                <h3 style={{ fontSize: '2.8rem', color: '#fff', fontWeight: '900' }}>0.00 <span style={{ color: '#8b949e', fontSize: '1.2rem' }}>BNB</span></h3>
            </div>
        </div>
      </div>

      {/* Benefits Section (Bigger Cards) */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ color: '#d4af37', fontSize: '2.2rem', marginBottom: '35px', textAlign: 'left', borderLeft: '8px solid #d4af37', paddingLeft: '20px', fontWeight: '800' }}>
            Referral Benefits & Utility
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            
            <div style={{ background: '#161616', padding: '40px', borderRadius: '20px', border: '1px solid #333', transition: '0.3s' }}>
                <FaGift style={{ color: '#d4af37', fontSize: '3rem', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.6rem', marginBottom: '15px', fontWeight: '700' }}>Instant 5% Bonus</h4>
                <p style={{ color: '#a0a0a0', fontSize: '1.15rem', lineHeight: '1.8' }}>Receive an immediate 5% commission in SOLT tokens for every purchase made through your link. No withdrawal delays.</p>
            </div>

            <div style={{ background: '#161616', padding: '40px', borderRadius: '20px', border: '1px solid #333' }}>
                <FaUsers style={{ color: '#d4af37', fontSize: '3rem', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.6rem', marginBottom: '15px', fontWeight: '700' }}>Unlimited Growth</h4>
                <p style={{ color: '#a0a0a0', fontSize: '1.15rem', lineHeight: '1.8' }}>Invite an unlimited number of users. The larger your network grows, the higher your potential for massive passive earnings.</p>
            </div>

            <div style={{ background: '#161616', padding: '40px', borderRadius: '20px', border: '1px solid #333' }}>
                <FaChartLine style={{ color: '#d4af37', fontSize: '3rem', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '1.6rem', marginBottom: '15px', fontWeight: '700' }}>VIP Tier Rewards</h4>
                <p style={{ color: '#a0a0a0', fontSize: '1.15rem', lineHeight: '1.8' }}>Top referrers gain access to exclusive VIP tiers, featuring unique NFT drops, higher staking multipliers, and early access.</p>
            </div>

        </div>
      </div>

      {/* Future Roadmap Section */}
      <div style={{ background: 'linear-gradient(95deg, rgba(212,175,55,0.08) 0%, rgba(11,20,38,1) 100%)', padding: '50px', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
        <h3 style={{ color: '#d4af37', fontSize: '2.2rem', marginBottom: '30px', fontWeight: '800' }}>SOLT Token Ecosystem Power</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                <FaRocket style={{ color: '#d4af37', fontSize: '2rem', marginTop: '5px' }} />
                <div>
                    <h5 style={{ fontWeight: '800', fontSize: '1.3rem', marginBottom: '10px' }}>Launchpad Access</h5>
                    <p style={{ color: '#a0a0a0', fontSize: '1.05rem', lineHeight: '1.6' }}>Use your earned tokens to participate in premium RWA and GameFi token launches.</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                <FaLock style={{ color: '#d4af37', fontSize: '2rem', marginTop: '5px' }} />
                <div>
                    <h5 style={{ fontWeight: '800', fontSize: '1.3rem', marginBottom: '10px' }}>Protocol Governance</h5>
                    <p style={{ color: '#a0a0a0', fontSize: '1.05rem', lineHeight: '1.6' }}>Holders will have the right to vote on future SoltDex upgrades and ecosystem proposals.</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'start' }}>
                <FaWallet style={{ color: '#d4af37', fontSize: '2rem', marginTop: '5px' }} />
                <div>
                    <h5 style={{ fontWeight: '800', fontSize: '1.3rem', marginBottom: '10px' }}>Yield Staking</h5>
                    <p style={{ color: '#a0a0a0', fontSize: '1.05rem', lineHeight: '1.6' }}>Earn high-yield rewards by locking your tokens in our upcoming decentralized staking pools.</p>
                </div>
            </div>
        </div>
      </div>

    </div> 
  ); 
}; 

export default Dashboard;