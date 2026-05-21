// ==========================================  
// SOLTCHAIN ECOSYSTEM CENTRAL BRIDGE (JSX) 
// ==========================================  
 
const isLocal = window.location.hostname === "localhost";  
 
export const BRIDGE = {  
    // 1. Backend & Database (CRITICAL UPDATE: Connected to your new Vercel Backend)
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
        empire: isLocal ? "http://localhost:5173" : "https://soltcoin-empire.netlify.app",  
        dice: isLocal ? "http://localhost:5174" : "https://dice.soltcoin.com",  
    }  
};  
  
/** * Helper: BscScan link generate karne ke liye 
 */  
export const getBscScanLink = (data, type = "address") => {  
    const base = BRIDGE.networks.blockExplorerUrls[0];  
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