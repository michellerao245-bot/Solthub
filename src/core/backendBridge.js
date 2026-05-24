if (typeof window !== 'undefined') {
  const ORIGINAL_FETCH = window.fetch;
  const API_BASE = 'https://ecobackend-two.vercel.app';

  window.fetch = async (url, options = {}) => {
    let finalUrl = url;

    if (typeof finalUrl === 'string' && finalUrl.startsWith('/api')) {
      finalUrl = `${API_BASE}${finalUrl}`;
    }

    try {
      const config = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      };

      return await ORIGINAL_FETCH(finalUrl, config);
    } catch (error) {
      console.error('❌ Backend Bridge Error:', error);
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
}