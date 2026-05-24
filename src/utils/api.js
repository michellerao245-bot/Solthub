// src/utils/api.js

const API_BASE = 'https://ecobackend-two.vercel.app';

/**
 * Unified API helper
 * - Always returns parsed JSON
 * - Throws error if response is not ok
 */
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      let errorData = {};

      try {
        errorData = await response.json();
      } catch (_) {}

      throw new Error(
        errorData.error ||
        errorData.message ||
        `HTTP error! status: ${response.status}`
      );
    }

    // ✅ Always return JSON (NO response.json() needed outside)
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('❌ API Fetch Error:', error);
    throw error;
  }
};