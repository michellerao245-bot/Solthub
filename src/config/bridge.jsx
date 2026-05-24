// ==========================================   
// SOLTCHAIN ECOSYSTEM CENTRAL BRIDGE (JSX)  
// ==========================================   
  
// 🚀 SMART LOCAL DETECTION: Localhost, 127.0.0.1, aur dynamic network IPs sabko track karega
const isLocal =  
  window.location.hostname === "localhost" ||  
  window.location.hostname === "127.0.0.1" ||  
  window.location.hostname.startsWith("192.168.");   
  
// Dynamic IP extraction taaki local testing seamless rahe
const currentIP = window.location.hostname; 
  
export const BRIDGE = {   
    // 1. Backend & Database (Connected securely to your new Vercel Backend) 
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,   
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,   
    backendApi: import.meta.env.VITE_API_BASE_URL || "https://ecobackend-two.vercel.app",   
   
    // 2. BSC Network Settings  
    networks: {   
        chainId: 56,   
        chainName: "BNB Smart Chain",   
        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },   
        rpcUrls: ["https://bsc-dataseed.binance.org/"],   
        blockExplorerUrls: ["https://bscscan.com"],   
    },   
   
    // 3. Smart Contracts  
    contracts: {   
        soltToken: "0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9",   
        feeEngine: "0xC30050aBe984c3B3929822E3BbF33fbBE6b3C423",   
    },   
   
    // 4. Ecosystem Navigation Paths  
    urls: {   
        // Dynamic IP ke sath automatic custom port map honge local dev ke liye
        empire: isLocal? `http://${currentIP}:5173` : "https://soltcoin-empire.netlify.app",   
        dice: isLocal? `http://${currentIP}:5174` : "https://dice.soltcoin.com",   
    }   
};   
   
/** * Helper: BscScan link generate karne ke liye  
 */   
export const getBscScanLink = (data, type = "address") => {   
    const base = BRIDGE.networks.blockExplorerUrls;   
    if (type === "tx") return `${base}/tx/${data}`;   
    return `${base}/address/${data}#tokentxns`;   
};   
   
/** * Session Manager: LocalStorage handles  
 */   
export const bridgeSession = {   
    set: (key, value) => localStorage.setItem(`solt_${key}`, JSON.stringify(value)),   
    get: (key) => JSON.parse(localStorage.getItem(`solt_${key}`)),   
    clear: () => localStorage.clear(),   
};