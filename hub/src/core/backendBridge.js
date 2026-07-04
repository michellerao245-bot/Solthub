if (typeof window !== 'undefined') {

const ORIGINAL_FETCH = window.fetch; 
const API_BASE = 'https://ecobackend-two.vercel.app';

window.fetch = async (url, options = {}) => {

let finalUrl = url; 
//Only convert local /api calls 
if ( typeof finalUrl === 'string' && finalUrl.startsWith('/api') ) { 
  finalUrl = `${API_BASE}${finalUrl}`; 
  // ONLY backend requests get JSON headers 
  options.headers = {
     ...(options.headers || {}), 
     'Content-Type': 'application/json' 
    };
   } 
   try { 
    return await ORIGINAL_FETCH(finalUrl, options); 
  } catch (error) { 
    console.error('❌ Backend Bridge Error:', error); 
    return new Response( 
      JSON.stringify({ success: false, error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } } 
    ); 
  } 

};

console.log('✅ Eco Backend Bridge Connected'); 
}