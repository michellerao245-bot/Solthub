import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Marketing3D = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '50px 20px',
      color: '#fff',
      fontFamily: 'sans-serif',
      background: '#0b1426',
    },
    header: {
      borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
      pb: '20px',
      mb: '40px',
    },
    h1: {
      color: '#ffffff',
      fontSize: '40px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      margin: 0,
    },
    serviceGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
    card: {
      background: 'linear-gradient(145deg, #0f172a, #070c16)',
      border: '1px solid rgba(59, 130, 246, 0.05)',
      borderRadius: '20px',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 40px rgba(6,182,212,0.1)',
      border: '1px solid rgba(34, 211, 238, 0.3)',
    },
    imageWrapper: {
      width: '280px',
      height: '180px',
      borderRadius: '15px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    infoBlock: {
      flex: 1,
    },
    titleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '8px',
    },
    h2: {
      color: '#f59e0b',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0,
    },
    badge: {
      color: '#94a3b8',
      fontSize: '11px',
      fontWeight: 'normal',
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '3px 8px',
      borderRadius: '4px',
    },
    description: {
      color: '#94a3b8',
      fontSize: '14px',
      lineHeight: '1.6',
      fontWeight: 'light',
    },
    tagLine: {
      fontSize: '12px',
      fontWeight: 'mono',
      color: '#22d3ee',
      marginTop: '15px',
    }
  };

  const services = [
    {
      id: 'mint',
      title: 'SoltMint Token Creator',
      badge: 'Zero-Coding',
      description: 'Create standardized BEP-20, burnable, or fee-on-transfer tokens instantly without any solidity logic or coding verification. SoltMint provides secure, pre-audited token contracts ready for immediate deployment and BSC scan verification.',
      graphicStyle: 'linear-gradient(135deg, #0e2752, #063970)',
      // Note for brother: Isme shiny 3D Solt Token medal render hoga BSC logo ke sath
      graphicTitle: '3D TOKEN MEDAL MATRIX', 
    },
    {
      id: 'pinning',
      title: 'Trending & Pinning Sale',
      badge: 'High Analytics ROI',
      description: 'DxSale-style (image_6.png) dynamic 3D red pin functionality allows you to keep your fairlaunch presale locked right at the top of the pool explorer lists. SoltDex analytic graph embedding ensures that your project remains visible to Web3 investors above new entrants.',
      graphicStyle: 'linear-gradient(135deg, #4c0e0e, #730e0e)',
      // Note for brother: Isme stylized 3D red pin render hoga pool charts ke upar
      graphicTitle: 'DYNAMIC 3D RED PIN',
    },
    {
      id: 'lock',
      title: 'SoltLock Utility Locker',
      badge: 'BSC Contract Audited',
      description: 'DxLock premium standard BSC Locker (image_12.png) designed with pre-audited secure utility matrix. Lock team tokens or PancakeSwap liquidity pools (LP) instantly with advanced vestment schedules to build ultimate Web3 community trust.',
      graphicStyle: 'linear-gradient(135deg, #162c5e, #1c4992)',
      // Note for brother: Isme generalized heavy utility lock render hoga chain contracts ke sath
      graphicTitle: '3D UTILITY LOCK',
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Solt <span style={{color: '#f59e0b'}}>Marketing</span> Services</h1>
        <p style={{color: '#94a3b8', fontSize: '15px', margin: '5px 0 0 0'}}>DxSale-Inspired V2 Premium Layout</p>
      </div>

      <div style={styles.serviceGrid}>
        {services.map((service, index) => {
          const [isHovered, setIsHovered] = useState(false);
          
          return (
            <div 
              key={service.id}
              style={{...styles.card, ...(isHovered ? styles.cardHover : {})}}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate('/marketing')}
            >
              {/* Left Side: Premium 3D Render (DxSale Style V2) */}
              <div style={{...styles.imageWrapper, background: service.graphicStyle}}>
                {/* For brother: Real 3D renders will replace these placeholder labels */}
                <span style={{color: '#fff', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase'}}>{service.graphicTitle}</span>
              </div>

              {/* Right Side: Description Logic Matrix */}
              <div style={styles.infoBlock}>
                <div style={styles.titleRow}>
                  <h2 style={styles.h2}>{service.title}</h2>
                  <span style={styles.badge}>{service.badge}</span>
                </div>
                <p style={styles.description}>{service.description}</p>
                <p style={styles.tagLine}>BSC Hub Ecosystem: Targeted DeFi Investors</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marketing3D;