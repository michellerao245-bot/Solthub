const API_BASE = 'https://ecobackend-two.vercel.app';

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    // Handle server errors
    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (_) {}
      throw new Error(
        errorData.error || errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('❌ API Fetch Error:', error);
    throw error;
  }
};