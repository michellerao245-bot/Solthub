import React, { useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';

const RoadmapSoltHubModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Accessibility State Persistence: Capture trigger button blueprint
    triggerElementRef.current = document.activeElement;

    // 2. Multi-Device Viewport Layer Control (Scroll Locking)
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. High-Fidelity Keyboard Focus Trap Manager
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        // Core Selector: Extracts all active inputs while dodging programmatic markers (-1)
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Auto-focus container entry point mapping
    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      
      // Focus Restitution Logic
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Performance Lock: Freezing heavy styles objects across rapid re-renders
  const styles = useMemo(() => ({
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100dvh",
      background: "rgba(4, 9, 20, 0.92)",
      backdropFilter: "blur(14px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999999, // Max threshold allocation to block overlay overlapping
      padding: "20px",
      boxSizing: "border-box"
    },
    modalContent: {
      background: "#070d19",
      border: "1px solid rgba(245, 158, 11, 0.25)",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "1180px",
      maxHeight: "calc(100dvh - 40px)",
      overflowY: "auto",
      padding: "40px 24px",
      position: "relative",
      boxShadow: "0 0 60px rgba(245, 158, 11, 0.08)",
      boxSizing: "border-box",
      scrollbarWidth: "thin", 
      scrollbarColor: "#f59e0b #070d19",
      outline: "none"
    },
    closeBtn: {
      position: "absolute",
      top: "16px",
      right: "20px",
      background: "rgba(255, 255, 255, 0.02)",
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
    modalHeader: { textAlign: "center", marginBottom: "40px" },
    modalSub: { color: "#22d3ee", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "3px" },
    modalTitle: { fontSize: "32px", color: "#f59e0b", fontWeight: "900", margin: "6px 0 0 0", textShadow: "0 0 25px rgba(245, 158, 11, 0.35)", fontFamily: "sans-serif", letterSpacing: "1px" },
    grid: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", alignItems: "stretch" },
    cardBase: { borderRadius: "16px", padding: "24px", flex: "1 1 250px", width: "100%", maxWidth: "270px", boxSizing: "border-box", transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" },
    liveCard: { background: "rgba(15, 23, 42, 0.95)", border: "1px solid #f59e0b", boxShadow: "0 4px 20px rgba(245, 158, 11, 0.08)" },
    upcomingCard: { background: "rgba(11, 18, 32, 0.7)", border: "1px solid rgba(255, 255, 255, 0.05)" },
    badgeLive: { background: "#f59e0b", color: "#070d19", fontSize: "10px", fontWeight: "bold", padding: "3px 9px", borderRadius: "12px", float: "right", textTransform: "uppercase", letterSpacing: "0.5px" },
    badgeStandard: { background: "rgba(34, 211, 238, 0.1)", color: "#22d3ee", fontSize: "10px", fontWeight: "bold", padding: "3px 9px", borderRadius: "12px", float: "right", textTransform: "uppercase" },
    pName: { fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0", fontFamily: "sans-serif" },
    pTarget: { color: "#22d3ee", fontSize: "12px", fontWeight: "600", margin: "5px 0 16px 0", textTransform: "uppercase" },
    ul: { listStyle: "none", padding: 0, margin: "0 0 8px 0" },
    li: { color: "#94a3b8", fontSize: "13px", marginBottom: "12px", display: "flex", alignItems: "flex-start", lineHeight: "1.4" },
    bullet: { color: "#f59e0b", marginRight: "8px", fontWeight: "bold" },
    futureBullet: { color: "#22d3ee", marginRight: "8px", fontWeight: "bold" }
  }), []);

  // Performance-oriented Lightweight Handlers (No state-overhead cascading)
  const handleMouseEnter = (e, isLive) => {
    e.currentTarget.classList.add('solthub-card-hovered');
    if (isLive) {
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(245, 158, 11, 0.2)";
    } else {
      e.currentTarget.style.border = "1px solid rgba(34, 211, 238, 0.4)";
      e.currentTarget.style.boxShadow = "0 12px 25px rgba(34, 211, 238, 0.08)";
    }
  };

  const handleMouseLeave = (e, isLive) => {
    e.currentTarget.classList.remove('solthub-card-hovered');
    if (isLive) {
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(245, 158, 11, 0.08)";
    } else {
      e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.05)";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div style={styles.overlay} onClick={onClose}>
      {/* AAA Level Accessibility Style Sheet Integration */}
      <style>{`
        .solthub-portal-modal-root {
          animation: solthubFadeIn 0.25s ease-out;
        }
        
        /* Device Hardware Capability Filtering */
        @media (hover: hover) {
          .solthub-card-hovered {
            transform: translateY(-6px) scale(1.01) !important;
          }
        }
        
        /* OS System Level Motion Minimizer */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .solthub-portal-modal-root, .solthub-roadmap-scroll {
            animation: none !important;
          }
        }

        @keyframes solthubFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes solthubScaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .solthub-roadmap-scroll {
          animation: solthubScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .solthub-roadmap-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .solthub-roadmap-scroll::-webkit-scrollbar-track {
          background: #070d19;
          border-radius: 10px;
        }
        .solthub-roadmap-scroll::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.25);
          border-radius: 10px;
        }
        .solthub-roadmap-scroll::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
        .solthub-focusable:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 2px #f59e0b, 0 0 14px rgba(245, 158, 11, 0.4) !important;
        }
      `}</style>

      <div 
        ref={modalRef}
        className="solthub-roadmap-scroll solthub-focusable"
        style={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="solthub-macro-title"
        tabIndex={0}
      >
        
        <button 
          className="solthub-focusable"
          style={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close SoltHub Vision"
          onMouseEnter={(e) => { 
            e.currentTarget.style.color = '#fff'; 
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.color = '#94a3b8'; 
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          &times;
        </button>
        
        <div style={styles.modalHeader}>
          <span style={styles.modalSub}>Ecosystem Macro Vision</span>
          <h2 id="solthub-macro-title" style={styles.modalTitle}>ROADMAP OF SOLTHUB</h2>
        </div>

        <div style={styles.grid}>
          
          {/* Phase 1 - DEPLOYED INFRASTRUCTURE */}
          <div 
            className="solthub-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.liveCard}}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true)}
          >
            <div>
              <span style={styles.badgeLive}>● Active</span>
              <div style={styles.pName}>Phase 01</div>
              <div style={styles.pTarget}>Core Utilities</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Professional Soltswap Protocol</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Presale Smart Engines</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Integrated Referral Rewards</li>
              <li style={styles.li}><span style={styles.bullet}>✓</span> Autonomous Token Creator</li>
            </ul>
          </div>

          {/* Phase 2 - BETA RELEASES */}
          <div 
            className="solthub-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.upcomingCard}}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <div>
              <span style={styles.badgeStandard}>Beta Stage</span>
              <div style={styles.pName}>Phase 02</div>
              <div style={styles.pTarget}>Entertainment Hub</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Solthub Fun Games Aggregator</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Web3 Wallet Session Syncing</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Game Yield & Fee Distributions</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Strategic Platform Alpha Tests</li>
            </ul>
          </div>

          {/* Phase 3 - INTELLIGENCE DATA */}
          <div 
            className="solthub-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.upcomingCard}}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <div>
              <span style={styles.badgeStandard}>In Dev</span>
              <div style={styles.pName}>Phase 03</div>
              <div style={styles.pTarget}>Advanced Analytics</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> AI Scam Detection Scanner</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Deep Whale Tracking Dashboard</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Real-time Token Analytics Engine</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Alpha Sniping Signals Panel</li>
            </ul>
          </div>

          {/* Phase 4 - GAMING ECOSYSTEM */}
          <div 
            className="solthub-focusable"
            tabIndex={0}
            style={{...styles.cardBase, ...styles.upcomingCard}}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <div>
              <span style={styles.badgeStandard}>Future Vision</span>
              <div style={styles.pName}>Phase 04</div>
              <div style={styles.pTarget}>Premium iGaming</div>
            </div>
            <ul style={styles.ul}>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> ThinkMy11 Web3 Cricket Game</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Decentralized Poker Web3 Game</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Multi-Token Betting Pools</li>
              <li style={styles.li}><span style={styles.futureBullet}>•</span> Cross-Game Ecosystem Rewards</li>
            </ul>
          </div>

        </div>
      </div>
    </div>,
    document.body // Ultimate layer mount mapping targets execution completely
  );
};

export default RoadmapSoltHubModal;
