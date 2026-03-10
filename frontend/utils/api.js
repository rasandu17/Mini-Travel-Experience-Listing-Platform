const API_BASE_URL = 'http://localhost:5000/api';

export const getToken = () => {
  if (typeof window !== 'undefined') return localStorage.getItem('token');
  return null;
};

export const saveToken = (token) => {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
};

export const removeToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
};

// ──────────────────────────── AUTH ────────────────────────────

export const register = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const login = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

// ──────────────────────────── LISTINGS ────────────────────────────

/**
 * Fetch all listings with optional search & pagination.
 * @param {{ search?: string, page?: number, limit?: number }} params
 */
export const getListings = async ({ search = '', page = 1, limit = 9 } = {}) => {
  const params = new URLSearchParams({ search, page, limit });
  const res = await fetch(`${API_BASE_URL}/listings?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch listings');
  return data; // { listings, pagination }
};

export const getListingById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/listings/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch listing');
  return data;
};

/** Create listing — supports FormData (image upload) or plain JSON */
export const createListing = async (listingData) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const isFormData = listingData instanceof FormData;

  const res = await fetch(`${API_BASE_URL}/listings`, {
    method: 'POST',
    headers: isFormData
      ? { Authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: isFormData ? listingData : JSON.stringify(listingData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create listing');
  return data;
};

/** Update listing — supports FormData (image upload) or plain JSON */
export const updateListing = async (id, listingData) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const isFormData = listingData instanceof FormData;

  const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
    method: 'PUT',
    headers: isFormData
      ? { Authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: isFormData ? listingData : JSON.stringify(listingData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update listing');
  return data;
};

export const deleteListing = async (id) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete listing');
  return data;
};

export const toggleLike = async (id) => {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');

  const res = await fetch(`${API_BASE_URL}/listings/${id}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle like');
  return data; // { likes: number, liked: boolean }
};
