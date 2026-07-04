import React, { useEffect, useRef } from 'react';

const RoadmapModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Background Scroll Lock Implementation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Native Focus Trap & Keydown Event Handler
    const handleKeyDown = (e) => {
      // ESC click to close modal
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // TAB Key Trap Logic
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [tabindex="0"], a, input, select, textarea'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab (Backward cycling)
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab (Forward cycling)
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Initial focus on modal load for smooth accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow; // Revert scroll on unmount
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(4, 9, 20, 0.85)",
      backdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999,
      padding: "20px",
      boxSizing: "border-box",
      animation: "modalFadeIn 0.25s ease-out"
    },
    modalContent: {
      background: "#0b1426",
      border: "1px solid rgba(34, 211, 238, 0.3)",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "1150px",
      maxHeight: "calc(100vh - 40px)", // Desktop & mobile safe adaptive heights
      overflowY: "auto",
      padding: "40px 24px",
      position: "relative",
      boxShadow: "0 0 50px rgba(34, 211, 238, 0.15)",
      boxSizing: "border-box",
      scrollbarWidth: "thin", 
      scrollbarColor: "#22d3ee #0f172a",
      animation: "modalScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      outline: "none"
    },
    closeBtn: {
      position: "absolute",
      top: "16px",
      right: "20px",
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      color: "#94a3b8",
      fontSize: "24px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    modalHeader: {
      textAlign: "center",
      marginBottom: "40px"
    },
    modalSub: {
      color: "#f59e0b",
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "3px"
    },
    modalTitle: {
      fontSize: "32px",
      color: "#22d3ee",
      fontWeight: "900",
      margin: "6px 0 0 0",
      textShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
      fontFamily: "sans-serif",
      letterSpacing: "1px"
    },
    grid: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "stretch" 
    },
    cardBase: {
      borderRadius: "16px",
      padding: "24px",
      flex: "1 1 240px", 
      width: "100%",
      maxWidth: "260px",
      boxSizing: "border-box",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    livePhaseCard: {
      background: "rgba(15, 23, 42, 0.95)",
      border: "1px solid #22d3ee",
      boxShadow: "0 4px 20px rgba(34, 211, 238, 0.12)"
    },
    upcomingPhaseCard: {
      background: "rgba(13, 20, 35, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
    },
    badgeLive: {
      background: "#22d3ee",
      color: "#0b1426",
      fontSize: "10px",
      fontWeight: "bold",
      padding: "3px 9px",
      borderRadius: "12px",
      float: "right",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    badgeUpcoming: {
      background: "rgba(148, 163, 184, 0.12)",
      color: "#94a3b8",
      fontSize: "10px",
      fontWeight: "bold",
      padding: "3px 9px",
      borderRadius: "12px",
      float: "right",
      textTransform: "uppercase"
    },
    pName: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#fff",
      margin: "0",
      fontFamily: "sans-serif"
    },
    pTarget: {
      color: "#f59e0b",
      fontSize: "12px",
      fontWeight: "600",
      margin: "5px 0 16px 0",
      textTransform: "uppercase"
    },
    ul: { listStyle: "none", padding: 0, margin: "0 0 8px 0" },
    li: { color: "#94a3b8", fontSize: "13px", marginBottom: "12px", display: "flex", alignItems: "flex-start", lineHeight: "1.4" },
    bullet: { color: "#22d3ee", marginRight: "8px", fontWeight: "bold" }
  };

  // 🔥 Visual Upgrade: Added subtle scale(1.01) along with translation upward
  const handleMouseEnter = (e, isLive) => {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
    if (isLive) {
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(34, 211, 238, 0.25)";
    } else {
      e.currentTarget.style.border = "1px solid rgba(245, 158, 11, 0.35)";
      e.currentTarget.style.boxShadow = "0 12px 25px rgba(245, 158, 11, 0.06)";
    }
  };

  const handleMouseLeave = (e, isLive) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    if (isLive) {
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(34, 211, 238, 0.12)";
    } else {
      e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.05)";
      e.currentTarget.style.boxShadow = "none";
    }
  };
  return (
    <div style={styles.overlay} onClick={onClose}>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .soltdex-roadmap-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .soltdex-roadmap-scroll::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 10px;
        }
        .soltdex-roadmap-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 10px;
        }
        .soltdex-roadmap-scroll::-webkit-scrollbar-thumb:hover {
          background: #22d3ee;
        }

        .soltdex-focusable:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 2px #22d3ee, 0 0 12px rgba(34, 211, 238, 0.4) !important;
        }
      `}</style>

      <div 
        ref={modalRef}
        className="soltdex-roadmap-scroll soltdex-focusable"
        style={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="soltchain-roadmap-title"
        tabIndex={0}
      >
        
        <button 
          className="soltdex-focusable"
          style={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close Roadmap"
          onMouseEnter={(e) => { 
            e.currentTarget.style.color = '#fff'; 
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.color = '#94a3b8'; 
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          &times;
        </button>
        
        <div style={styles.modalHeader}>
          <span style={styles.modalSub}>Strategic Execution Plan</span>
          <h2 id="soltchain-roadmap-title" style={styles.modalTitle}>SOLTCOIN ROADMAP</h2>
        </div>

        <div style={styles.grid}>
          
          {/* Phase 1 - FOUNDATION (LIVE) */}
          <div 
            className="soltdex-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.livePhaseCard}}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true)}
          >
            <div>
              <span style={styles.badgeLive}>● Live</span>
              <div style={styles.pName}>Phase 01</div>
              <div style={styles.pTarget}>Foundation Launch</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Smart Contract Deployment</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Comprehensive Whitepaper Release</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Dashboard & Hub Integration</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Presale Stage 1 Activation</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Global Community Architecture</li>
            </ul>
          </div>

          {/* Phase 2 - GROWTH */}
          <div 
            className="soltdex-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.upcomingPhaseCard}}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <div>
              <span style={styles.badgeUpcoming}>Upcoming</span>
              <div style={styles.pName}>Phase 02</div>
              <div style={styles.pTarget}>Growth & Security</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.bullet}>•</span> Marketing & Viral Expansion</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Third-Party Security Audit</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Strategic Web3 Influencer Push</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Presale Stage 2 & 3 Funding</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Holder Loyalty Rewards Setup</li>
            </ul>
          </div>

          {/* Phase 3 - LAUNCH */}
          <div 
            className="soltdex-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.upcomingPhaseCard}}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <div>
              <span style={styles.badgeUpcoming}>Upcoming</span>
              <div style={styles.pName}>Phase 03</div>
              <div style={styles.pTarget}>Public DEX Listing</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.bullet}>•</span> PancakeSwap Official Listing</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Liquidity Lock via Trusted Protocols</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> CoinMarketCap & CoinGecko Push</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Strategic Token Deflationary Burn</li>
            </ul>
          </div>

          {/* Phase 4 - ECOSYSTEM DEVELOPMENTS */}
          <div 
            className="soltdex-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.upcomingPhaseCard}}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <div>
              <span style={styles.badgeUpcoming}>Upcoming</span>
              <div style={styles.pName}>Phase 04</div>
              <div style={styles.pTarget}>Ecosystem Utilities</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.bullet}>•</span> Advanced Passive Staking Hub</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> SoltMint Autonomous Launchpad</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Blockchain Gaming Ecosystem</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Tier-2 Centralized Exchange Listing</li>
              <li style={styles.li}><span style={styles.bullet}>•</span> Decentralized DAO Governance System</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoadmapModal;