// src/utils/api.js
// Central API utility — attaches JWT token to every request

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const headers = (extra = {}) => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
  return data;
};

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login: (body) =>
    fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  register: (body) =>
    fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  me: () =>
    fetch(`${BASE_URL}/auth/me`, { headers: headers() }).then(handleResponse),
};

// ── Hotels ────────────────────────────────────────────
export const hotelAPI = {
  search: (params) => {
    const q = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/hotels?${q}`, { headers: headers() }).then(handleResponse);
  },
  getById: (id) =>
    fetch(`${BASE_URL}/hotels/${id}`, { headers: headers() }).then(handleResponse),
  getRooms: (hotelId) =>
    fetch(`${BASE_URL}/hotels/${hotelId}/rooms`, { headers: headers() }).then(handleResponse),
  getReviews: (hotelId) =>
    fetch(`${BASE_URL}/hotels/${hotelId}/reviews`, { headers: headers() }).then(handleResponse),
};

// ── Bookings ──────────────────────────────────────────
export const bookingAPI = {
  create: (body) =>
    fetch(`${BASE_URL}/bookings`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  getMyBookings: () =>
    fetch(`${BASE_URL}/bookings/my`, { headers: headers() }).then(handleResponse),
  getById: (id) =>
    fetch(`${BASE_URL}/bookings/${id}`, { headers: headers() }).then(handleResponse),
  cancel: (id) =>
    fetch(`${BASE_URL}/bookings/${id}/cancel`, { method: 'PUT', headers: headers() }).then(handleResponse),
};

// ── Payment ───────────────────────────────────────────
export const paymentAPI = {
  process: (body) =>
    fetch(`${BASE_URL}/payments`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
};

// ── Promo ─────────────────────────────────────────────
export const promoAPI = {
  validate: (code, bookingTotal) =>
    fetch(`${BASE_URL}/promo/validate`, { method: 'POST', headers: headers(), body: JSON.stringify({ code, bookingTotal }) }).then(handleResponse),
};

// ── Reviews ───────────────────────────────────────────
export const reviewAPI = {
  submit: (hotelId, body) =>
    fetch(`${BASE_URL}/hotels/${hotelId}/reviews`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
};

// ── Loyalty ───────────────────────────────────────────
export const loyaltyAPI = {
  getAccount: () =>
    fetch(`${BASE_URL}/loyalty`, { headers: headers() }).then(handleResponse),
};
