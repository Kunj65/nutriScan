// API helpers
// Use VITE_BACKEND_URL to override the backend base URL (default: http://localhost:5001)
export const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

export const apiFetch = (path, options) => fetch(`${API_BASE}${path}`, options);
