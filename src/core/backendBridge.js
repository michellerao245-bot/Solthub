const ORIGINAL_FETCH = window.fetch;
const API_BASE = 'https://ecobackend-two.vercel.app';

window.fetch = async (url, options = {}) => {
  let requestUrl = url;

  // Agar request '/api' se shuru hoti hai, toh domain attach karo
  if (typeof requestUrl === 'string' && requestUrl.startsWith('/api')) {
    requestUrl = `${API_BASE}${requestUrl}`;
  }

  try {
    // Headers ko properly merge karo
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const response = await ORIGINAL_FETCH(requestUrl, {
      ...options,
      headers
    });

    return response;
  } catch (error) {
    console.error('❌ Backend Bridge Error:', error);
    
    // Fallback response taaki app crash na ho
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};

console.log('✅ Eco Backend Bridge Connected');