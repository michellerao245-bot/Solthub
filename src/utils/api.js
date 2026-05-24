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

    // Agar server error de (jaise 404, 500), toh throw karo taaki catch block handle kar sake
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ API Fetch Error:', error);
    throw error;
  }
};